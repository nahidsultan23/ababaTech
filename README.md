# ababatech

Project for Ababa Tech

Instructions:

For Server (backend):

1. The server uses MongoDB as the database. So, MongoDB must be present in the machine before starting the server. Otherwise, it will not work. To make the server use MongoDB cloud or any remote MongoDB database, just replace the value of the MONGODB_URL variable inside the .env file.
2. The server uses a database named "ababaTech". Make sure there is no database available with the same name before starting the server. Otherwise, it may conflict with the previous data. To make the server use a different database, just change the database name in the MONGODB_URL variable inside the .env file.
3. Now, open terminal in the "backend" folder.
4. Install packages using the command "npm install".
5. After the packages are finished installing, start the server by running the command "npm run start:dev" or "npm run start". The server will start on 5000 port by default.
6. The server has a module named "dummy". This module is only to provide some dummy data for the server to use. Validations were not added to this module as this won't be present in the real server.
7. The features of the server cannot be accessed without being logged in. To log in, database needs to have one or more users. As the server doesn't have any sign up feature, the "dummy" module needs to be used to push dummy users to the database. "Postman" can be used to push the dummy data to the server. A post request from "Postman" will create the dummy user in the database. The request format is as follows:
   Request url: {SERVER_URL}/api/dummy/insert-user
   Request body:
   {
   "email": "nahid@ababatech.com",
   "password": "123456",
   "username": "Nahid"
   }
   Request method: POST
   By default, SERVER_URL = http://localhost:5000
8. To show movies list in the front-end, the database needs to have some entries. This can also be done by the "dummy" module with "Postman". The following request from the "Postman" will create the dummy entries in the database:
   Request url: {SERVER_URL}/api/dummy/insert-movies
   Request body:
   {}
   Request method: POST
   By default, SERVER_URL = http://localhost:5000
9. Now everything is ready for the front-end.

For Front-end:

1. Open terminal in the "frontend" folder.
2. Install packages using the command "npm install".
3. Start the app using the command "npm start".
4. The app will start on 3000 port by default.
5. To see the app, go to the url http://localhost:3000
6. Log in to the website by using the email and password inserted by the "dummy" module from the "Postman".
