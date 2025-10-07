# Микросервисная архитектура 

## Структура проекта
Микросервисы общаются через HTTP/gRPC (kafka)
```
apps/
├── api
   ├── client/      # :2000 - API для пользователей
├── microservices
   ├── micro-users/     - Управление пользователями
└── common/             - Общее
```

### 1. Установка зависимостей
```bash
npm install
```

### 2. Сборка
```bash
npm run build && npm run prisma:migrate && npm run prisma:gen
```

### 3. Запуск базы
```bash
cp .env.example .env
docker-compose up
```

### 4. Запуск сервисов
```bash
npm run start
```