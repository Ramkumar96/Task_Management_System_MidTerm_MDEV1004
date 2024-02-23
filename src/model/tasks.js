const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    taskId: {type: String},
    title: {type: String},
    description: {type: String},
    status: {type: String},
    assignedTo: {type: String},
})

const Movie = mongoose.model('Tasks', TasksSchema);

module.exports = Movie;