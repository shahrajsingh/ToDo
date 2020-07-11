const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  status: {
    type: Boolean, required: true
  },
  task: {
    type: String, required: true
  },
  important: {
    type: Boolean, required: true
  },
  timeStamp: {
    type: String, required: true
  },
  date: {
    type: String, required: true
  },
  
  userId: {
    type: String, required: true
  }
});
taskSchema.index({task: 'text'});
module.exports = mongoose.model("Task", taskSchema);
