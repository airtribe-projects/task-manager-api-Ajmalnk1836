const express = require('express');
const tasks = require('./task.json');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

// GET API
app.get("/api/v1/tasks",(req,res)=>{
try {
    if(!tasks || !Array.isArray(tasks.tasks)){
    return res.status(500).json({
          status: 'error',
        message: 'Invalid or missing tasks data',
    })
    }

    let filteredTasks = tasks.tasks;

    if (req.query.completed !== undefined) {
      const completedParam = req.query.completed.toLowerCase();

      // Validate that query param is only 'true' or 'false'
      if (completedParam !== 'true' && completedParam !== 'false') {
        return res.status(400).json({
          status: 'error',
          message: "Invalid 'completed' value. Use 'true' or 'false'.",
        });
      }

      const isCompleted = completedParam === 'true';
      filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
    }


  res.status(200).json({
      status: 'success',
      results: filteredTasks.length,
      data: filteredTasks
    });
    
} catch (error) {
     console.error('Error fetching tasks:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while retrieving tasks',
    });
}

});


//get specific tasks 
app.get("/api/v1/tasks/:id", (req, resp)=> {

  // Convert id to number format
 const id = parseInt(req.params.id); 
 const task = tasks.tasks.find((ts) =>ts.id == id);

if (!task) {
    return resp.status(404).send("This task does not exist in the DB");
}

  resp.status(200).json({
    status: "success",
    data: task,
  });


})


//POST API
app.post("/api/v1/tasks",(req,res)=> {

  const {title,description,completed} = req.body;
  const task = req.body;
   if (!title || title.trim() === "") {
      return res.status(400).json({
        status: "fail",
        message: "Title is required and cannot be empty",
      });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({
        status: "fail",
        message: "Description is required and cannot be empty",
      });
    }


    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({
        status: "fail",
        message: "Completed must be a boolean value",
      });
    }



task.id =tasks.tasks.length+1;
tasks.tasks.push(task);
res.send(task);
});


//put api
app.put("/api/v1/tasks/:id",(req,res) => {
     const id = req.params.id;
     const task = tasks.tasks.find((tas)=> tas.id == id);
     if (!task) {
    return res.status(404).send("This task does not exist in the DB");
}
     task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;




const {title,description,completed} = req.body;

 

   if (!title || title.trim() === "") {
      return res.status(400).json({
        status: "fail",
        message: "Title is required and cannot be empty",
      });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({
        status: "fail",
        message: "Description is required and cannot be empty",
      });
    }


    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({
        status: "fail",
        message: "Completed must be a boolean value",
      });
    }


     res.status(200).json({
    status: "success",
    data: task,
  });

})

//delete 
app.delete('/api/v1/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.tasks.findIndex(t => t.id === id);

  // Task not found
  if (taskIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Task not found",
    });
  }

  // Store deleted task to return in response
  const deletedTask = tasks.tasks[taskIndex];

  // Remove task from array using splice
  tasks.tasks.splice(taskIndex, 1);

  res.status(200).json({
    status: "success",
    message: "Task deleted successfully",
    data: deletedTask,
  });
});


// filtering tasks by completion status
app.get('/api/v1/tasks/filter', (req, res) => {
  try {
    let filteredTasks = tasks.tasks;

    // check if completed query param is provided
    if (req.query.completed !== undefined) {
      const isCompleted = req.query.completed.toLowerCase() === 'true';
      filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
    }

    res.status(200).json({
      status: 'success',
      results: filteredTasks.length,
      data: filteredTasks
    });

  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while retrieving tasks'
    });
  }
});




module.exports = app;