## Task API

A Simple Node.js + Express + REST API for managing tasks
Supports creating, retrieving, filtering, and updating tasks with proper validation and error handling.



This API allows you to:
- Create new tasks
- Retrieve a single task by ID
- Update tasks
- Delet Tasks by ID
- Retrieve all tasks by completion status
- Handle invalid requests with proper HTTP error codes



## Setup Instructions

##1 - Clone the repositery
- git clone  https://github.com/airtribe-projects/bel-14.git

##2 start the local host
- node index.js 
or we can use nodemon also, now i'm using above one


## API END POINTS

## 1 GET ALL TASKS
API - GET -  http://localhost:3000/api/v1/tasks

## 2 GET TASK BY ID
API - GET- http://localhost:3000/api/v1/tasks/1


## 3 Create a new task

API - POST -  http://localhost:3000/api/v1/tasks

 Request body : 
 {
   "title": "Set up environment",
            "description": "Install Node.js, npm, and git",
            "completed": true
}


## 4 update task

API - PUT -  http://localhost:3000/api/v1/tasks/1

request body:
{
    "title": "Set up environment2222",
            "description": "Install Node.js, npm, and git",
            "completed": true
}


## 5 filtering task by completion status

API - GET - http://localhost:3000/api/v1/tasks?completed=true



