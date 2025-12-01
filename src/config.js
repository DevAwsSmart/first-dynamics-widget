// ============================================
// 🔧 НАСТРОЙКИ ВИДЖЕТА FIRST DYNAMICS
// ============================================
// Замени значения ниже на свои данные из Notion

export const CONFIG = {
  // ============================================
  // NOTION API НАСТРОЙКИ
  // ============================================
  
  // Твой Notion Integration Token (начинается с "secret_")
  // Получить: https://www.notion.so/my-integrations
  NOTION_TOKEN: 'ntn_o22493137458FlOOmm97wTA797ZJ9J1dFp48LD7bMEX1dW',
  
  // ============================================
  // ID ТВОИХ БАЗ ДАННЫХ
  // ============================================
  // Как найти ID: открой базу в Notion → скопируй URL
  // URL выглядит так: notion.so/workspace/DATABASE_ID?v=...
  // DATABASE_ID - это то что тебе нужно (32 символа)
  
  // 📊 Статусы Систем 1Д
  SYSTEMS_DB_ID: '2b208611-cdd1-81bc-b978-dbc8a6ad2e52',
  
  // 🏅 Streak Achievements
  ACHIEVEMENTS_DB_ID: '2bb08611-cdd1-8139-b3f0-e33cd7023160',
  
  // 🏆 Ежедневный Трекер 1Д (для streak данных)
  DAILY_TRACKER_DB_ID: '2b108611-cdd1-8137-a362-f3fd3a8898be',
  
  // ============================================
  // НАСТРОЙКИ ОТОБРАЖЕНИЯ
  // ============================================
  
  // Интервал обновления данных (в миллисекундах)
  // 60000 = 1 минута, 300000 = 5 минут
  REFRESH_INTERVAL: 60000,
  
  // Показывать демо-данные если нет подключения
  SHOW_DEMO_ON_ERROR: true,
  
  // Анимации
  ENABLE_ANIMATIONS: true,
  ENABLE_PARTICLES: true,
  ENABLE_SOUND: false, // Звуковые эффекты (в разработке)
  
  // Тема
  THEME: 'dark', // 'dark' или 'light' (light в разработке)
  
  // Язык
  LANGUAGE: 'ru', // 'ru' или 'en'
};

// ============================================
// CLOUDFLARE WORKER PROXY URL
// ============================================
// Notion API не работает напрямую из браузера (CORS)
// Поэтому нужен прокси-сервер. Есть 2 варианта:
//
// Вариант 1: Публичный прокси (не для продакшена!)
// export const NOTION_PROXY_URL = 'https://notion-api-proxy.example.workers.dev';
//
// Вариант 2: Свой Cloudflare Worker (рекомендуется)
// Инструкция по созданию в README.md

export const NOTION_PROXY_URL = 'https://notion-proxy.3462606.workers.dev';

// ============================================
// МАППИНГ КАТЕГОРИЙ СТРИКОВ
// ============================================
export const STREAK_CATEGORIES = {
  'Deep Work': {
    icon: '🧠',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 to-cyan-500/10',
    neonClass: 'neon-blue',
  },
  'Clean Eating': {
    icon: '🍽️',
    color: 'green', 
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/20 to-emerald-500/10',
    neonClass: 'neon-green',
  },
  'Bedtime': {
    icon: '🌙',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    bgGradient: 'from-purple-500/20 to-violet-500/10',
    neonClass: 'neon-purple',
  },
  'Movement': {
    icon: '🏃',
    color: 'orange',
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/20 to-amber-500/10',
    neonClass: 'neon-orange',
  },
};

// ============================================
// УРОВНИ ДОСТИЖЕНИЙ
// ============================================
export const ACHIEVEMENT_LEVELS = {
  'Bronze': {
    gradient: 'from-orange-600 to-orange-800',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    icon: '🔥',
  },
  'Silver': {
    gradient: 'from-gray-300 to-gray-500',
    glowColor: 'rgba(156, 163, 175, 0.5)',
    icon: '⚔️',
  },
  'Gold': {
    gradient: 'from-yellow-400 to-amber-500',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    icon: '🔥🔥🔥',
  },
  'Platinum': {
    gradient: 'from-cyan-400 to-blue-500',
    glowColor: 'rgba(34, 211, 238, 0.5)',
    icon: '🏆',
  },
  'Diamond': {
    gradient: 'from-purple-400 to-indigo-500',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    icon: '💎',
  },
};
