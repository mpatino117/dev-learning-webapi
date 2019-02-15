#Dev Learning Web API

This application is built on Hapi.js a Node.js framework.

####Tech Stack
- Hapi.js
- JWT Auth
- Postgres DB
- Sequelize
  ... update with time

-------


Configurations you must add **.env** file if you do not have one and add the following enviroment variables. With your custom settings. You will have to create a database in Postgress and add username, password, and database name to the enviroment variables.


```
API_HOST=127.0.0.1
API_PORT=3000
JWT_KEY='devlearning'

DB_USERNAME=devlearner
DB_PASSWORD=password
DB_NAME=devlearning
DB_HOST=127.0.0.1
```

Start project:


```

Install modules

Run:
npm install 

Once DB is created and enviroment variables are setup run the folloing command, it will add mock data to the database.

Run:
node_modules/.bin/sequelize db:migrate


Once everything is good with DB and node modules. You can start the API,

Run:

npm run start



```

---

This Web API has 3 routes setup to start:

- Signup
    ***Method:POST***

    ```
    localhost:3000/user/signup
    ```

    Body to submit Example:

        
    ```
        {
	        "email":"mpatino117@gmail.com",
	        "password":"password"
        }
    ```

- Login
    ***Method:POST***

    ```
    localhost:3000/user/login
    ```

    Body to submit Example:

        
    ```
        {
        "email":"mpatino117@gmail.com",
        "password":"password"
        }
    ```

    Response Example of JWT TOKEN:

    ```
    {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1wYXRpbm9AZ21haWwuY29tIiwiaWQiOjcsInVzZXJuYW1lIjoibXBhdGlub0BnbWFpbC5jb20iLCJpYXQiOjE1NTAyMDU2NTAsImV4cCI6MTU1MDI5MjA1MH0.qvVdDRrXl0EOMG_pb6O3_qgCRzbal5tIvBdMlAsjr2o"}

    ```


- Get All Users ( Protected route )
    ***Method:GET***

    To get all users it is a protected route. You will have to authenticate at every request. Use POSTMAN app to test out HTTP post or GET.


    ```
    localhost:3000/user
    ```

    Example payload with auth header:

    ```
        curl -v -H "Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A" \
        http://localhost:8000/restricted

    ```

