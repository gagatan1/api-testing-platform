# CRM API-автотесты

## Запуск

1. `npm install`
2. Скопируй `.env.staging` в `.env` и заполни `BASE_URL`, токен и логины
3. `npm test` — все тесты
4. `npm run test:smoke` — только смоук

## Структура

```
common/          общая инфраструктура (клиенты, авторизация, fixtures)
api-tests/      тесты по модулям (mobile / personal-cabinet / dispatcher)
reports/        отчёты прогонов
.github/workflows/ CI
```

## Как добавить тест

1. Выбери модуль (`mobile/`, `personal-cabinet/`, `dispatcher/`)
2. Открой или создай `.spec.ts` файл
3. Импорти `getToken` из `../../common/auth/get-token` и нужный клиент из `../../common/api-clients/`
4. Замени `TESTIT-ID: ЗАМЕНИ` на реальный ID кейса из TestIT
5. Замени заглушки `/api/...` на реальные эндпоинты
6. Запусти `npm test`

## Окружения

- `.env.staging` — тестовый стенд (основной)
- `.env.prod-readonly` — прод (только read-only смоук)

## Ключевые моменты

- Токены кешируются внутри сессии — логин один раз на роль
- Каждый клиент (`DispatcherClient`, `LkClient`, `MobileClient`) держит свой base URL и токен
- Мобильные тесты с пропусками (если нет подходящей заявки) — это нормально для API-тестов
- `billing.spec.ts` в `personal-cabinet/` — это аналитика (задача #64), файл нужно переименовать когда появится биллинг