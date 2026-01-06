Как запустить и настроить проект

1. npm install
2. npm init playwright@latest + npm install @faker-js/faker
3. Создать .env:
   APP_URL=https://fe-delivery.tallinn-learning.ee/signin
4. Добавить в .gitignore:
   .env
   node_modules/
5. npx playwright test
