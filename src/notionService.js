// ============================================
// NOTION API SERVICE
// ============================================
// Этот файл отвечает за получение данных из Notion

import { CONFIG, NOTION_PROXY_URL } from './config';

// Базовый URL для API запросов
const getApiUrl = (endpoint) => {
  if (NOTION_PROXY_URL && NOTION_PROXY_URL !== 'YOUR_CLOUDFLARE_WORKER_URL') {
    return `${NOTION_PROXY_URL}${endpoint}`;
  }
  // Fallback на прямой API (не будет работать из браузера)
  return `https://api.notion.com/v1${endpoint}`;
};

// Заголовки для запросов
const getHeaders = () => ({
  'Authorization': `Bearer ${CONFIG.NOTION_TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
});

// ============================================
// ПОЛУЧЕНИЕ ДАННЫХ ИЗ БАЗ ДАННЫХ
// ============================================

/**
 * Запрос к базе данных Notion
 */
async function queryDatabase(databaseId, filter = null, sorts = null) {
  try {
    const body = {};
    if (filter) body.filter = filter;
    if (sorts) body.sorts = sorts;

    const response = await fetch(getApiUrl(`/databases/${databaseId}/query`), {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

/**
 * Получить статусы систем
 */
export async function fetchSystemsStatus() {
  try {
    const data = await queryDatabase(CONFIG.SYSTEMS_DB_ID);
    
    return data.results.map(page => {
      const props = page.properties;
      return {
        id: page.id,
        name: getTitle(props['Система']),
        value: getFormulaValue(props['Показатель']),
        norm: getRichText(props['Норма']),
        status: getFormulaValue(props['Status']),
      };
    });
  } catch (error) {
    console.error('Error fetching systems:', error);
    return null;
  }
}

/**
 * Получить достижения
 */
export async function fetchAchievements() {
  try {
    const data = await queryDatabase(CONFIG.ACHIEVEMENTS_DB_ID);
    
    return data.results.map(page => {
      const props = page.properties;
      const status = getSelectValue(props['Статус']);
      
      return {
        id: page.id,
        name: getTitle(props['Название']),
        category: getSelectValue(props['Категория']),
        level: getSelectValue(props['Уровень'])?.replace(/[🔥💎🏆⚔️\s]/g, '').trim(),
        description: getRichText(props['Описание']),
        emoji: getRichText(props['Эмодзи']),
        requiredDays: props['Требование (дни)']?.number || 0,
        timesEarned: props['Количество раз']?.rollup?.number || 0,
        isUnlocked: status?.includes('Получено') || false,
        isInProgress: status?.includes('В процессе') || false,
        firstEarned: props['Первое получение']?.rollup?.date?.start || null,
        lastEarned: props['Последнее получение']?.rollup?.date?.start || null,
      };
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return null;
  }
}

/**
 * Получить данные Daily Tracker для стриков
 */
export async function fetchDailyTracker() {
  try {
    // Получаем последние 7 дней для расчета стриков
    const data = await queryDatabase(
      CONFIG.DAILY_TRACKER_DB_ID,
      null,
      [{ property: 'Дата', direction: 'descending' }]
    );
    
    return data.results.slice(0, 30).map(page => {
      const props = page.properties;
      return {
        id: page.id,
        date: props['Дата']?.date?.start || null,
        deepWorkDone: props['Deep Work Done']?.checkbox || false,
        cleanEatingScore: props['Nutrition Quality']?.number || 0,
        bedtimeCompliant: props['Bedtime Compliant']?.checkbox || false,
        morningMovement: props['Morning Movement']?.checkbox || false,
      };
    });
  } catch (error) {
    console.error('Error fetching daily tracker:', error);
    return null;
  }
}

/**
 * Рассчитать текущие стрики на основе данных трекера
 */
export function calculateStreaks(trackerData) {
  if (!trackerData || trackerData.length === 0) {
    return {
      deepWork: 0,
      cleanEating: 0,
      bedtime: 0,
      movement: 0,
    };
  }

  // Сортируем по дате (новые первые)
  const sorted = [...trackerData].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const calculateStreak = (checkFn) => {
    let streak = 0;
    for (const day of sorted) {
      if (checkFn(day)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  return {
    deepWork: calculateStreak(d => d.deepWorkDone),
    cleanEating: calculateStreak(d => d.cleanEatingScore >= 7),
    bedtime: calculateStreak(d => d.bedtimeCompliant),
    movement: calculateStreak(d => d.morningMovement),
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getTitle(prop) {
  return prop?.title?.[0]?.plain_text || '';
}

function getRichText(prop) {
  return prop?.rich_text?.[0]?.plain_text || '';
}

function getSelectValue(prop) {
  return prop?.select?.name || '';
}

function getFormulaValue(prop) {
  if (!prop?.formula) return '';
  const formula = prop.formula;
  if (formula.type === 'string') return formula.string || '';
  if (formula.type === 'number') return formula.number ?? '';
  return '';
}

// ============================================
// COMBINED DATA FETCH
// ============================================

/**
 * Получить все данные для дашборда
 */
export async function fetchAllDashboardData() {
  try {
    const [systems, achievements, tracker] = await Promise.all([
      fetchSystemsStatus(),
      fetchAchievements(),
      fetchDailyTracker(),
    ]);

    const streaks = tracker ? calculateStreaks(tracker) : null;

    return {
      systems,
      achievements,
      streaks,
      lastUpdated: new Date().toISOString(),
      error: null,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      systems: null,
      achievements: null,
      streaks: null,
      lastUpdated: null,
      error: error.message,
    };
  }
}
