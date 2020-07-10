const Task = require("../models/task");

exports.createTask = (req, res, next) => {

  const task = new Task({
    status: req.body.status,
    task: req.body.task,
    important: req.body.important,
    timeStamp: req.body.timeStamp,
    date: req.body.date,
    userId: req.body.userId
  });

  task.save().then(result => {
    res.status(201).json({
      message: 'save success',
      data: result
    });

  }).catch(err => {
    console.log('showing error \n' + err);
    res.status(500).json({
      message: 'server error',
      error: err
    });
  });
}

exports.getTasks = (req, res, next) => {

  Task.find({ userId: req.params.UserId }).then((result) => {
    if (result) {
  
      res.status(201).json({
        message: "tasks found",
        task: result
      });
    } else {
      res.status(404).json({
        message: "no taskas added or found",
        task: result
      });
    }
  }).catch(result => {
    res.status(500).json({
      message: "error getting tasks",
      task: result
    });
  });
}


exports.getimptask = (req, res, next) => {

  Task.find({ important: true, userId: req.params.UserId }).then((result) => {

    if (result) {
      res.status(201).json({
        message: "tasks found",
        task: result
      });
    } else {
      res.status(404).json({
        message: "no taskas added or found",
        task: result
      });
    }
  }).catch(result => {
    res.status(500).json({
      message: "error getting tasks",
      task: result
    });
  });
}


exports.getmydaytasks = (req, res, next) => {

  const d = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const todaydate = days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();

  Task.find({ date: todaydate, userId: req.params.UserId }).then((result) => {
    if (result) {
      res.status(201).json({
        message: "tasks found",
        task: result
      });
    } else {
      res.status(404).json({
        message: "no taskas added or found",
        task: result
      });
    }
  }).catch(result => {
    res.status(500).json({
      message: "error getting tasks",
      task: result
    });
  });
}


exports.getCompletedTask = (req, res, next) => {
  Task.findOne({ status: true, userId: req.params.UserId }).then(result => {
  
    res.status(201).json({
      result: result
    });
  }).catch(error => {
    res.status(500).json({
      message: "an error has occured",
      result: error
    });
  });
}


exports.completeTask = (req, res, next) => {
  Task.findByIdAndUpdate({ userId: req.params.UserId, _id: req.body._id }, { status: true }).then(result => { 
    Task.findOne({userId:req.params.UserId,status: true}).then((response)=>{
      res.status(201).json({
        result: response
      });
    });  
  }).catch(result => {
    res.status(500).json({
      message: "internal server error"
    });
  });
}

exports.uncompleteTask = (req, res, next) => {
  Task.findByIdAndUpdate({ userId: req.params.UserId, _id: req.body._id }, { status: false }).then(result => {
    Task.findOne({userId:req.params.UserId,status: true}).then((response)=>{
      res.status(201).json({
        result: response
      });
    }); 
  }).catch(result => {
    res.status(500).json({
      message: "internal server error"
    });
  });
}

exports.marknImportant = (req, res, next) => {
  Task.findOneAndUpdate({ _id: req.body._id, userId: req.params.UserId }, { important: false }).then(() => {
    res.status(201).json({
      message: 'marked not important'
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'error occured!',
      error: error
    });
  });
}


exports.markImportant = (req, res, next) => {
  Task.findOneAndUpdate({ _id: req.body._id, userId: req.params.UserId }, { important: true }).then(() => {
    res.status(201).json({
      message: 'marked important'
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'error occured!',
      error: error
    });
  });
}
