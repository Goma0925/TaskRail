1. Run npm install 

2. Create a .env file in this directory. 
Populate it as follows:

DB_NAME=somename
DB_CLUSTER=cluster0
DB_USER=someuser
DB_PW=somepassword
PORT=someport 

DB_NAME for us is TaskRail

3. Run index.js with some tool like nodemon (nodemon index.js).
nodemon has hot reloading, whereas node index.js will not hot reload. 


