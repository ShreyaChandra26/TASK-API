const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task");
const conn = require("./connection/conn");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//create task
app.post("/v1/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      task,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
    console.log(e.message);
  }
});

//get all task
app.get("/v1/tasks", async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json({
      status: "success",
      message: "Got all tasks",
      task,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
    console.log(e.message);
  }
});

//get task by id
app.get("/v1/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message:"Task deleted by requested id",
      task,
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: "There is no task at that id",
    });
    console.log(e.message);
  }
});

//delete  task by id
app.delete("/v1/tasks/:id", async (req, res) => {
  try {
    const task = await Task.deleteOne({ _id: req.params.id }, req.body);
    res.status(204).json({
      status: "success",
      message: "Task deleted by requested id",
      task,
    });
  } catch (e) {
    res.status(204).json({
      status: "failed",
      message: "Task deleted by requested id",
    });
    console.log(e.message);
  }
});

//update task by id
app.put("/v1/tasks/:id", async (req, res) => {
  try {
    await Task.updateOne({ _id: req.params.id }, req.body);
    const task = await Task.findOne({ _id: req.params.id });
    res.status(204).json({
      status: "success",
      message:"Task updated",
      task,
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: "There is no task at that id",
    });
    console.log(e.message);
  }
});

// add more than one task
app.post("/v1/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Tasks created",
      task,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
    console.log(e.message);
  }
});

//delete more than one task
app.delete("/v1/tasks", async (req, res) => {
  try {
    const task = await Task.deleteMany({ _id: req.task._id });
    res.status(204).json({
      status: "success",
      message: "Tasks deleted",
      task,
    });
  } catch (e) {
    res.status(204).json({
      status: "failed",
      message: e.message,
    });
    console.log(e.message);
  }
});

app.listen(5000, () => console.log(`server is running on port 5000`));
