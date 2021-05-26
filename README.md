# TaskRail
A full-stack task management web app with React and Express.js written in TypeScript.
Constructed during the Spring of 2021.   
 

# Deployment Instructions

1. Install Node.js on your system.
2. Set the env files for the client and the server using the template included in the repository. The descriptions of each ENV variable and file is following:

    **Client env files**

    - **.env.development:** Used for development. When running "npm start", the variables in this file is used.
    - **.env.production:** Used for production build. When running "npm run build", the built files use the variables in this file.
    - **.env.test:** Used for testing. When running "npm test", tests use the variables in this file, if they need ENV variables.

    **Client ENV variables**

    - **REACT_APP_BASE_API_URL**
        - A base URL for the API endpoints. e.g: "http://localhost:4000/api"

    **Server env files**

    - **.env.development:** Used for development. When running "npm run start:dev", the server uses env variables in this file.
    - **.env.production:** Used for production build. When running "npm run start:production",  the server uses env variables in this file.
    - **.env.test:** Used for testing. When running "npm run start:test",  the server uses env variables in this file.

    **Server ENV variables**

    - **DB_NAME**
        - Database name on MongoDB Atlas.
    - **DB_CLUSTER**
        - Database cluster name on MongoDB Atlas.
    - **DB_USER**
        - Database username on MongoDB Atlas.
    - **DB_PW**
        - Database password on MongoDB Atlas
    - **PORT**
        - A port number to run the server on.
    - **GOOGLE_AUTH_CLIENT_ID**
        - Google Auth Client ID. To set this up from scratch, you have to setup a Google Auth from Google Cloud Platform ([Reference](https://developers.google.com/identity/sign-in/web/sign-in)).

3. Execute the following commands (Linux/Mac) to deploy TaskRail.

    ```bash
    # -- Set up the client project --
    cd ~/…/TaskRail
    cd client/
    # Install dependencies
    npm install
    # Fix the package vulnerabilities if needed.
    npm audit fix

    # Run client side test
    npm test

    # Compile the client files. 
    # The built files will be served from the root URL of the server.
    npm run build 

    # -- Set up the server project --
    cd ../server
    # Install dependencies
    npm install
    
    # Run one of the following
    # 1. Run the development server
    npm run start:dev
    # 2. Run the production server
    npm run start:production
    # 3. Run the test server
    npm run start:test
    
    # The TaskRail is now served at the port specified in server's .env file.
    ```
