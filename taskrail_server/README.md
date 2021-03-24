1. Run npm install 

If using AtlasMongo... 
you will need to prepare for step 2 as follows. 
Go to cloud.mongodb.com
Go to the project and where it shows the Cluster, 
click "connect". Follow those steps. Those user credentials
will be used in the .env in the next step. 

2. Create a .env file in this directory. 
Populate it as follows:

DB_NAME=somename
DB_CLUSTER=cluster0
DB_USER=someuser
DB_PW=somepassword
PORT=someport
 
3. Run index.js with some tool like nodemon, running the command `nodemon index.js`.
nodemon has hot reloading, whereas `node index.js` will not hot reload. 


