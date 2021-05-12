# Project Description
This App was built as a response to the take home test 
assigned to me (Person of Peter Agent) by OOZOU 
fullstack Javascript Developer role

### Tech used in building Project
App was built using React for frontend, Node.js and express
for backend and MongoDB for Frontend

# App setup
**Disclaimer** 
1. project has frontend and backend folders therefore,
requiring the installation of frontend and backend dependencies.
2. App connect to a cloud mongodb instance by default except
developer explicitely add a local mongodb connection string in 
environment variable.
3. App need internet to load fontawesome text icons

## installation of dependecies
1. **Frontend**
Navigate to the frontend directory, then to the todo subfolder in the 
directory and run

> npm install

2. **Backend** 
After successful installation of frontend dependencies, navigate to todo in
backend subfolder and run

> npm install

to install dependencies require to perform api services

## Database instance selection
1. Want to run project in a local instance of
mongodb or your personal cloud instance of mongodb

> export db="mongodb connetion string"
on Mac or
> set db="mongodb connection string"
on PC


# start app
1. start backend server by navigating todo directory in backend
and run

> node index.js

2. start frontend of app by navigating to todo directory in frontend
and run

> npm start
