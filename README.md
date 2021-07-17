# Interview Task:
The basic idea for this is to allow a user to register for an account and allow them to make notes on their account.
## Application Requirements:
- Setup tables in the MySQL database for:
    - `Users`
    - `Notes`
- Develop a simple nodejs rest api to include:      
    - `[POST]` /register ß for registering user accounts
    - `[POST]` /login ß user sign in with email/password that returns auth token
    - `[AUTH] [GET]` /account ß retrieves user details
    - `[AUTH] [GET]` /notes ß retrieves user notes
    - `[AUTH] [POST]` /notes ß creates a new note
- Create a front end react web app that talks to the api to include:            
    - User Register
    - User Login
    - View Account with Create Note & View notes
- Additional Notes  
    - Design – If you want to go all out that is entirely up to you however the design of the front-end application will not impact any scoring, this is a development test to see how you code the application, not a design test.
    - API framework – Hapi-Js was mentioned during the interview because it has been my preference for previous projects, but it is certainly not a requirement if you are unfamiliar with it. Use anything you are familiar with to complete the task.
        


# MYSQL database:
## Databases:
```
users {
    user_id: INT, NOT_NULL, UNIQUE, AUTO_INCREMENT, PRIMARY KEY,
    first_name: VARCHAR(255),
    last_name: VARCHAR(255),
    email: VARCHAR(255), NOT_NULL, UNIQUE,
    password: VARCHAR(255), NOT_NULL
}
```
```
notes {
    note_id: INT, NOT_NULL, UNIQUE, AUTO_INCREMENT, PRIMARY KEY,
    user_id: INT, NOT_NULL, FORIEGN_KEY(user_id FROM users),
    noteTitle: VARCHAR(255),
    note: VARCHAR(255),
    createdAt: DATETIME, NOT_NULL,
    updatedAt: DATETIME, NOT_NULL
}
```

## Connection:
_Note the port should not be either 3000 or 8000 (The app and server use these)_ 
Variables:
```
host: 'localhost',
user: 'root',
password: '<Change_Me>',
database: 'todo_list'
```
_Change password here: [server.js](./hapi-server/server.js#L11)_


# Start:
## Hapi-server:
_To start the server run these commands in the terminal: (once the MySQL Database is set up)_
```
cd hapi-server /
npm ci /
npm start 
```

## Todo List:
_To start the app run these commands in a seperate terminal to the above: (once the MySQL Database is set up && the hapi-server is running)_
```
cd todo-list /
npm ci /
npm start 
```
