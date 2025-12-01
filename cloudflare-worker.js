// ============================================
// CLOUDFLARE WORKER - NOTION API PROXY
// ============================================
// Этот файл нужно развернуть на Cloudflare Workers
// для обхода CORS ограничений Notion API
//
// Инструкция по развертыванию в README.md

// Замени на свой токен Notion Integration
const NOTION_TOKEN = 'YOUR_NOTION_INTEGRATION_TOKEN';

// Разрешенные origins (добавь свой GitHub Pages URL)
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://YOUR_USERNAME.github.io',
];

export default {
  async fetch(request, env) {
    // Обработка preflight запросов
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    const url = new URL(request.url);
    const notionPath = url.pathname;

    // Проверка origin
    const origin = request.headers.get('Origin') || '';
    const isAllowed = ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
    
    if (!isAllowed && origin !== '') {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      // Формируем запрос к Notion API
      const notionUrl = `https://api.notion.com/v1${notionPath}`;
      
      const notionHeaders = {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      };

      let body = null;
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        body = await request.text();
      }

      // Запрос к Notion
      const notionResponse = await fetch(notionUrl, {
        method: request.method,
        headers: notionHeaders,
        body: body,
      });

      // Получаем ответ
      const responseData = await notionResponse.text();

      // Возвращаем с CORS заголовками
      return new Response(responseData, {
        status: notionResponse.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin || '*',
        },
      });
    }
  },
};

function handleCORS(request) {
  const origin = request.headers.get('Origin') || '*';
  
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
