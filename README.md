# DepartmentTasks

Приложение позволяющие отслеживать статус и время выполнения задач сотрудниками отдела.

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

Состояния задачи и активностей, содержание этих активностей, отметки об исполнителях и затраченном времени будут храниться в БД. В дальнейшем планируется разработка дашборда с показателями и статистикой по пользователям.

### Авторизация

Авторизация пользователя выполняется при введении учетных данных в окне LOGIN. Логин и пароль верифицируются в БД, где так же хранится информация о правах доступа каждого конкретного пользователя и информация для профиля (аватарка, имя, фамилия). Хранение учетных данных и их отправка\получение осуществляется в упрощенном виде без дополнительного шифрования.

### База данных

В качестве БД на данном этапе используется Google Spreadsheets, необходимо будет позже протестировать совместную работу нескольких человек (есть опасения, что могут возникнуть конфликты записи\чтения). API для таблиц Spreadsheets написан на JS и хранится в отдельном проекте.

### (В РАЗРАБОТКЕ)

- Учет исполнителей
- Учет и редактирование времени
- Модальное окно для управления задачей (CRUD функции для комментариев)
- Различные фильтры для отображения списка задач
- Дашборд со статистикой
- Модальное окно профиля пользователя
- Доработка окна профиля пользователя с добавлением статистики

- Создание новых задач под вопросом, т.к. список будет формироваться в Spreadsheets вручную, используя преимущества таблиц и возможность одновременной работы с ними в Google Docs
- Регистрация новых пользователей под вопросом, не планируется расширение состава отдела без участия администратора БД
