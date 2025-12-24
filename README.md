# Your Reader

Документация для GitHub-репозитория приложения «Your Reader»: веб‑клиент на React + Vite и сервер на NestJS для загрузки, чтения и аннотирования файлов.

## Обзор

- Веб‑клиент: аутентификация, загрузка PDF/TXT до 5 МБ, просмотр содержимого по страницам, закладки/выделения, автообновление access‑токена.
- API: NestJS + Prisma + PostgreSQL; JWT + refresh cookies; управление файлами и закладками, валидация и CORS.
- UI/UX: MUI, Tailwind utility‑классы, React Query для данных, Zustand для стора.

## Архитектура

- `client/` — SPA (React 19, Vite). Основные страницы: лендинг, вход/регистрация, верификация, список файлов, просмотр файла, загрузка, заготовка профиля. Общая разметка в `AppLayout`, маршрутизация в `routeConfig`.
- `server/` — NestJS 11, модули `auth`, `file`, `bookmark`, `token`, `user`, `prisma`. Глобальный guard `JwtAuthGuard`, префикс `api`, CORS из конфигов.
- База данных — PostgreSQL, схема в `server/prisma/schema.prisma`.

## Возможности

- Регистрация и вход по userName/password, генерация JWT access/refresh; refresh хранится в cookie.
- Верификация email через токен (маршрут `/api/auth/verify`).
- CRUD файлов: загрузка (`multipart/form-data`, поле `file`), список пользователя, постраничное чтение содержимого, удаление.
- Закладки в тексте файла: создание, чтение, удаление.

## Требования

- Node.js 20+
- npm 10+
- PostgreSQL 14+ (локально или в контейнере)

## Настройка окружения

(создайте `server/.env`):

```
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/your_reader
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=5m
TOKEN_EXPIRATION_VALUE=30
TOKEN_EXPIRATION_UNIT=day
REFRESH_TOKEN=refresh_token
FRONTEND_URL=http://localhost:5173
```

- Клиент использует `API_BASE_URL` из `client/src/shared/constants/api.constants.ts` (по умолчанию `http://localhost:3000/api`). При необходимости замените на свой URL.

## Установка и запуск (локально)

```bash
# в корне
npm install

# клиент
cd client
npm install
npm run dev

# сервер (в другом терминале)
cd server
npm install
npx prisma migrate dev   # применить миграции
npm run start:dev
```

## Скрипты

- Клиент: `npm run dev` — старт; `npm run build`; `npm run lint`; `npm run preview`.
- Сервер: `npm run start:dev`; `npm run build`; `npm run lint`; `npm run test`; `npm run test:e2e`; `npm run format`.

## API (кратко)

- `POST /api/auth/signup` — регистрация.
- `POST /api/auth/signin` — вход, сеттинг refresh cookie, возврат accessToken.
- `GET /api/auth/signout` — очистка refresh cookie.
- `POST /api/auth/verify` — подтверждение email.
- `GET /api/token/refresh-tokens` — выдать новые токены по refresh cookie.
- `POST /api/files/upload` — загрузка файла (PDF/TXT, ≤5 МБ).
- `GET /api/files/all` — список файлов пользователя.
- `GET /api/files/:fileId/content?page=1&pageSize=10000` — постраничное содержимое.
- `DELETE /api/files/:fileId` — удалить файл.
- `POST /api/bookmarks` — создать закладку.
- `GET /api/bookmarks/file/:fileId` — закладки файла.
- `DELETE /api/bookmarks/:bookmarkId` — удалить закладку.

## Данные и миграции

- Prisma с PostgreSQL. Перед запуском примените `npx prisma migrate dev`. Кастомные миграции добавляйте в `server/prisma/migrations`.
- Загруженные файлы сохраняются в `server/uploads`.

## Структура (ключевое)

- `client/src/app/routes/routeConfig.tsx` — карта маршрутов.
- `client/src/shared/constants/api.constants.ts` — URL API, эндпоинты.
- `server/src` — модули NestJS; `config/` для JWT/CORS; `constants/file.constants.ts` — ограничения загрузки.
- `server/prisma/schema.prisma` — модель данных (User, File, Bookmark, Token).

## Тесты и качество

- Клиент: Vitest/Jest DOM (команда `npm run test` — при добавлении тестов).
- Сервер: Jest юнит/е2е (`npm run test`, `npm run test:e2e`).
- Линт: `npm run lint` в обеих частях; форматирование сервера `npm run format`.

## Развертывание

- Соберите клиент (`npm run build`), отдавайте статику любым CDN/хостингом.
- Сервер: соберите `npm run build`, запустите `node dist/main`. Не забудьте задать переменные окружения и подключить PostgreSQL.

## Полезные ссылки

- NestJS: https://docs.nestjs.com
- Prisma: https://www.prisma.io/docs
- Vite: https://vitejs.dev/guide









