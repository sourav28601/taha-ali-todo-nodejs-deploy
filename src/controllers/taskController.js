import Task from "../models/TaskModel.js";

// CREATE TASK

export const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(201).json({ msg: "Task created successfully!", task });
};

// GET ALL TASK

export const getAllTask = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  };
  const task = await Task.find(queryObject);
  res.json({ task });
};

// GET TASK BY ID

export const getJobById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.status(200).json({ task });
};

// UPDATE TASK

export const updateJobById = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, { ...req.body });
  res.status(201).json({ msg: "Updated Successfully!", updatedTask });
};

// DELETE TASK

export const deleteJobById = async (req, res) => {
  const { id } = req.params;
  const removeTask = await Task.findByIdAndDelete(id);
  res
    .status(201)
    .json({ msg: `${id} job is deleted successfully`, removeTask });
};
