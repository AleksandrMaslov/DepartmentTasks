# DepartmentTasks

Приложение позволяющие отслеживать статус и время выполнения задач сотрудниками отдела.

# РАЗРАБОТКА ПРИОСТАНОВЛЕНА 🛑
# ВСЕ ПЕРЕПИСАТЬ НА REACT TS

В ходе разработки стало ясно, что подобное приложение необходимо разрабатывать с использованием websocket протокола для отправки изменений другим пользователям в реальном времени, но было принято решение для практики закончить на HTTP запросах с минимальными потерями в удобстве использования.

Разработка **приостановлена** на неопределенное время, поскольку дальнейшее добавление функционала связано с описанием бизнеслогики приложения, с технической точки зрения многие основные проблемы были решены. Vanilla JavaScript не является конечной точкой в изучении web разработки.

### Описание

При запуске выполняется запрос задач из БД и динамически генерируется разметка элементов списка на странице. Состояние задач отображается цветом фона строки, отвечающей за каждую конкретную задачу (не активна / в работе / выполнена / согласована / имеет замечания).

Дополнительно в правой части элемента(задачи) добавлены индикаторы на несколько типов активностей, относящихся к задаче:

- **_Заметки_**, не влияющие на согласование задачи
- **_Замечания(комментарии)_** для внесения изменений в результат работы
- **_Вопросы_** исполнителя, которые не удалось решить в процессе работы

Для авторизированных пользователей в правой части элемента задачи располагаются кнопки управления:

- Кнопка **_редактирования_**(работы с активностями, описанными выше)
- Кнопка быстрого **_добавления заметок\замечаний\вопросов_**
- Кнопка **_запуска и остановки_** таймера, фиксирующего затраченное время

Состояния задач и активностей, содержание этих активностей, отметки об исполнителях и затраченном времени будут храниться в БД, взаимеодействие с которой осуществляется через серверную часть приложения.

### Авторизация

Авторизация пользователя выполняется при введении учетных данных в окне LOGIN. Логин и пароль верифицируются в БД, где так же хранится информация о правах доступа каждого конкретного пользователя и информация для профиля (аватарка, имя, фамилия). Хранение учетных данных и их отправка\получение осуществляется в упрощенном виде без дополнительного шифрования.

### Бэкенд

В качестве серверной части используется приложение написанное на Google Apps Script (JavaScript), размещенное в Extensions у документа Google Spreadsheets, выполняющего функцию базы данных. Код хранится в отдельном проекте на github.

### База данных

В качестве БД на данном этапе используется Google Spreadsheets, необходимо будет позже протестировать совместную работу нескольких человек (есть опасения, что могут возникнуть конфликты записи\чтения).

### (В РАЗРАБОТКЕ)

- Функции редактирования и ответа на комментарии в модальном окне управления задачей
- Отображение списка задач с фильтрацией по различным параметрам
- Дашборд со статистикой по задачам и пользователям

- Создание новых задач под вопросом, т.к. список будет формироваться в Spreadsheets вручную, используя преимущества таблиц и возможность одновременной работы с ними в Google Docs
- Регистрация новых пользователей под вопросом, не планируется расширение состава отдела без участия администратора БД
