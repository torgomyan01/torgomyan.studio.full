# SWAPPE - Платформа бартерных сделок и коллабораций

> **Веб-платформа для обмена товарами и услугами между бизнесами с AI-поддержкой**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.9.0-green)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://www.mysql.com/)

---

## 🎯 Что это?

**SWAPPE** — это платформа, где бизнесы находят партнёров для обмена товарами, услугами и коллабораций. С AI-поддержкой от DonatAI.

### Основные возможности

- 🏢 **Профили компаний** - ИНН, верификация, портфолио
- 📋 **Предложения (Offers)** - создание предложений обмена с фото/видео
- 🤝 **Сделки (Deals)** - система бартерных сделок между компаниями
- 💬 **Real-time чаты** - WebSocket чаты по сделкам и поддержка
- 💳 **Тарифные планы** - free/base/pro/premium с автопродлением
- 💰 **Платежи** - интеграция с Yookassa
- ⭐ **Отзывы** - система отзывов о компаниях
- 🤖 **AI-ассистент** - DonatAI для поиска партнёров и генерации предложений
- 👥 **Реферальная система** - бонусы за приглашения

---

## 🚀 Быстрый старт

### Требования

- Node.js >= 20.13.1
- MySQL 8.0+
- Docker (опционально)

### Установка

```bash
# 1. Клонировать репозиторий
git clone <repo-url>
cd swappe

# 2. Установить зависимости
npm install

# 3. Настроить .env.prod
cp .env.prod.example .env.prod
# Заполнить: DATABASE_URL, NEXTAUTH_SECRET, OPENAI_API_KEY

# 4. База данных
npx prisma generate
npx prisma db push

# 5. Запуск (2 терминала)
npm run dev     # Next.js на порту 3000
npm run socket  # WebSocket на порту 3004
```

### Production

```bash
npm run build
npm start       # порт 3003
```

### Docker (с DonatAI)

```bash
# Запуск всех сервисов (SWAPPE + DonatAI + DB + Redis)
make run

# Открыть в браузере
make open

# Полный список команд
make help
```

**[→ Подробная инструкция](./docs/getting-started/quickstart.md)**

---

## 📖 Документация

### 🎓 Для начинающих

- [📘 Быстрый старт](./docs/getting-started/quickstart.md) - Установка за 5 минут
- [📄 Обзор проекта](./docs/getting-started/project-overview.md) - Что такое SWAPPE
- [⚙️ Make команды](./docs/getting-started/make-commands.md) - Все команды разработки

### 🏗️ Архитектура

- [🌐 Обзор системы](./docs/architecture/overview.md) - Архитектура всего проекта
- [🗄️ База данных](./docs/architecture/database.md) - MySQL схема и Prisma
- [💬 WebSocket](./docs/architecture/websocket.md) - Real-time чаты
- [🔐 Аутентификация](./docs/architecture/authentication.md) - NextAuth и защита роутов
- [📁 Структура файлов](./docs/architecture/file-structure.md) - Организация кода

### 🎯 Функциональность

- [🤝 Сделки (Deals)](./docs/features/deals.md) - Система бартерных сделок
- [💳 Подписки](./docs/features/subscriptions.md) - Тарифы и автопродление

### 📚 Справочник

- [⚙️ Переменные окружения](./docs/reference/environment.md) - Все .env переменные
- [🩺 Troubleshooting](./docs/reference/troubleshooting.md) - Решение проблем

### 📑 Полная документация

**[→ Перейти к оглавлению](./docs/index.md)**

---

## 🔗 Важные ссылки

### Production
- **Dev Server**: https://dev.swappe.ru/
- **Database Admin**: http://81.177.140.232:8080/
- **Server IP**: 81.177.140.232

### Local Development
- **SWAPPE Web**: http://localhost:3003
- **DonatAI API**: http://localhost:8001/docs
- **WebSocket**: ws://localhost:3004

---

## 💻 Основные команды

### Make команды (с Docker)

```bash
make help          # Все команды
make run           # Полный запуск
make dev           # Быстрый запуск
make down          # Остановить
make logs          # Логи всех сервисов
make logs-ai       # Логи DonatAI
make db-shell      # PostgreSQL shell
make migrate       # Применить миграции (DonatAI)
make clean         # Очистка контейнеров
make rebuild       # Полная пересборка
make rebuild       # Полная пересборка
```

**[→ Полный справочник Make команд](./docs/getting-started/make-commands.md)**

### NPM команды

```bash
npm run dev        # Development (порт 3000)
npm run build      # Production build
npm start          # Production server (порт 3003)
npm run socket     # WebSocket сервер (порт 3004)
```

---

## 🛠️ Технологический стек

### Frontend
- **Next.js 15.2.4** - App Router, Server Actions
- **React 19.1.1** - UI библиотека
- **TypeScript 5** - Типизация
- **Tailwind CSS 4.1.11** - Стилизация
- **Redux Toolkit 2.5.1** - State management

### Backend
- **Next.js API Routes** - REST API
- **Server Actions** - Server-side logic
- **Prisma 6.9.0** - ORM
- **NextAuth 4.24.11** - Аутентификация
- **WebSocket (ws 8.18.3)** - Real-time

### Database & Services
- **MySQL** - Основная БД
- **PostgreSQL + pgvector** - DonatAI векторный поиск
- **Redis** - Кэширование
- **Yookassa** - Платежи

### AI (DonatAI)
- **OpenAI GPT-4o** - Генерация идей
- **OpenAI Embeddings** - Векторный поиск
- **FastAPI** - AI API

**[→ Детали технологий](./docs/getting-started/project-overview.md)**

---

## 📁 Структура проекта

```
swappe/
├── @types/              # TypeScript типы
├── prisma/              # Prisma схема БД
├── public/              # Статика
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── actions/     # Server Actions (бизнес-логика)
│   │   ├── api/         # API Routes
│   │   ├── account/     # Личный кабинет
│   │   ├── admin/       # Админ-панель
│   │   ├── im/          # Чаты
│   │   └── offer/       # Предложения
│   ├── components/      # React компоненты
│   ├── utils/           # Утилиты
│   └── middleware.ts    # Auth middleware
├── ws-server.js         # WebSocket сервер
├── DonatAI/             # AI модуль (FastAPI)
├── docs/                # Документация
└── Makefile             # Docker команды
```

**[→ Детальное описание](./docs/architecture/file-structure.md)**

---

## 🎯 Основной функционал

### Реализовано
- [x] ✅ Регистрация и аутентификация (NextAuth)
- [x] ✅ Профили компаний (ИНН, верификация)
- [x] ✅ Предложения (Offers) с фото/видео
- [x] ✅ Система сделок (Deals)
- [x] ✅ Real-time чаты (WebSocket)
- [x] ✅ Тарифные планы (free/base/pro/premium)
- [x] ✅ Платежи (Yookassa)
- [x] ✅ Отзывы о компаниях
- [x] ✅ Админ-панель
- [x] ✅ Реферальная система

### AI функциональность (DonatAI)
- [x] ✅ AI Matching Engine - векторный поиск партнёров
- [x] ✅ Collaboration Ideas - генерация идей (GPT-4o)
- [x] ✅ Deal Proposals - готовые предложения сделок

**🎉 MVP ГОТОВ К PRODUCTION!**

---

## 🖥️ Production Server

### Quick Access

- **Dev Server**: https://dev.swappe.ru/
- **Server IP**: 81.177.140.232
- **Database Admin**: http://81.177.140.232:8080/

### Running Services

**PM2 Processes:**
```bash
pm2 list    # View all processes
```
- `swappe` - Next.js (port 3003)
- `swappe-socket` - WebSocket (port 3004)
- `donatai-api` - FastAPI AI (port 8001)

**Docker Containers:**
```bash
docker ps   # View containers
```
- `donatai_postgres` - PostgreSQL + pgvector (port 5433)
- `donatai_redis` - Redis (port 6380)

### Essential Commands

```bash
# Status check
pm2 list && docker ps

# Restart services
pm2 restart swappe swappe-socket
pm2 restart donatai-api

# View logs
pm2 logs swappe
pm2 logs donatai-api

# Health check
curl http://localhost:8001/health
```

**[→ Production Server Guide](./docs/reference/production-server.md)** - Complete deployment guide with SSH access, code updates, troubleshooting, backups, and monitoring.

---

## 📞 Поддержка

При возникновении проблем:

1. Посмотрите логи: `make logs` (локально) или `pm2 logs` (на сервере)
2. Проверьте статус: `make health` (локально) или `pm2 list && docker ps` (на сервере)
3. Изучите [docs/reference/troubleshooting.md](./docs/reference/troubleshooting.md) - решение частых проблем
4. Изучите [docs/](./docs/index.md) для детального понимания проекта
