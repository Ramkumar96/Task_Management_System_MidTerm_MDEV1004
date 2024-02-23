const mongoose = require('mongoose');
var express = require('express');
const Task = require('../model/tasks'); 
const User = require('../model/user'); 


exports.getAllTasks = async (req, res,next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsers = async (req, res,next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTasksByStatus = async (req, res,next) => {
  try {
    const { status } = req.params;
    const task = await Task.find({status: status}).exec();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTasksByTaskId = async (req, res,next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserByUsername = async (req, res,next) => {
  try {
    const { username } = req.params;
    const user = await User.find({username: username}).exec();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


