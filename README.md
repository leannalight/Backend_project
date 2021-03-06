# Backend_project
Аутентификация и авторизация в проекте Mesto
## Sprint-14. Актуальная версия v0.0.8
### Цель проекта: продолжение изучения Node.js и веб-фреймворка Express. Реализуем аутентификацию и авторизацию в проекте [Mesto](https://leannalight.github.io/Mesto-project-Yandex/), дополняя бэкенд-часть, исходя из предыдущего [спринта-13](https://github.com/leannalight/sprint-13). А ещё в этой работе мы познакомились с безопастью веб-приложений.

### Стек технологий:
- Node.js,
- Express.js,
- MongoDB,
- Mongoose (Object Data Modeling (ODM) library for MongoDB and Node.js)

## Что сделано?
- в схеме пользователя добавлены обязательные ```email``` и ```password```;
- поле ```email``` уникально и валидируется помощью подключенного валидатора;
- в контроллере ```createUser``` почта и хеш пароля записываются в базу;
- появился контроллер ```login```, он проверяет, полученные в теле запроса почту и пароль;
- если почта и пароль верные, контроллер ```login``` создаёт ```JWT```, в пейлоуд которого записано свойство ```_id``` - с идентификатором пользователя; срок жизни токена — 7 дней;
- если почта и пароль верные, контроллер ```login``` возвращает созданный токен в ответе;
- если почта и пароль не верные, контроллер ```login``` возвращает ошибку 401;
- в ```app.js``` появились обработчики ```POST```- запросов на роуты ```/signin``` и ```/signup```;
- добавлен файл ```middlewares/auth.js```, в нём мидлвэр для проверки ```JWT```;
  - при правильном ```JWT``` авторизационный мидлвэр добавляет в объект запроса пейлоуд и пропускает запрос - дальше;
  - при неправильном ```JWT``` авторизационный мидвэр возвращает ошибку 401;
- все роуты, кроме ```/signin``` и ```/signup```, защищены авторизацией;
- удалён хардкод ```req.user``` из самостоятельного проекта предыдущего спринта;
- пользователь не может удалить карточку, которую он не создавал;
- API не возвращает хеш пароля;

### Инструкции по установке, настройке и запуску
1. Для клонирования используйте git clone https://github.com/leannalight/Backend_project
2. Используйте ```npm i``` для переустановки пакетов.
3. Используйте ```npm run dev```, чтобы открыть проект на локальном сервере.
4. Команда ```npm run start``` запускает сервер на локальном сервере ```localhost:3030```;
5. Команда ```npm run dev``` запускает сервер на локальном сервере ```localhost:3030``` с горячей перезагрузкой;
6. Приложение Node.js подключается к серверу Mongo по адресу ```mongodb://localhost:27017/mestodb```;
