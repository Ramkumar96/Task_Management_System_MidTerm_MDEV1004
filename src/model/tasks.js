/*
  Filename: tasks.js
  Student’s Name: Ramkumar
  StudentID: 200574709
  Date: 23-02-2024
*/  

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