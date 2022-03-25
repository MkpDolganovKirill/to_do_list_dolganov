# nodeJsProjectShareToDo

For start project need run commands:
* npm install
* npm start

Project have routes:

1) http://localhost:8000/allTasks - get all tasks user (GET)

2) http://localhost:8000/createTask - create new task (POST). In the request, you must pass the body:
body {
  "text": '',
  "isCheck": true || false
}

3) http://localhost:8000/updateTask - change information about task (PATCH). In the request, you must pass the body:
body {
  "id": 1,
  "text": ''
}
body {
  "id": 1,
  "isCheck": true || false
}
body {
  "id": 1,
  "text": '',
  "isCheck": true || false
}

4) http://localhost:8000/deleteTask?id=:id - delete task (DELETE). In the request, you must pass the param id