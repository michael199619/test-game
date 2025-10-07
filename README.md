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
npm run build
```

### 3. Запуск сервисов
```bash
npm run start
```