const TaskModel = require("../models/task.model");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

class TaskController {
  ////////////////////////////
  // ALL TASK CONTROLLER
  ////////////////////////////
  static all_tasks(req, res) {
    try {
      TaskModel.all_task_model((err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to get all task", err });
        }
        res.status(200).json(data);
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  ////////////////////////////
  // SINGLE TASK CONTROLLER
  ////////////////////////////
  static single_tasks(req, res) {
    try {
      const { task_id } = req.params;
      TaskModel.single_task_model(task_id, (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to get single task", err });
        }
        res.status(200).json(data);
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  ////////////////////////////
  // USER TASK CONTROLLER
  ////////////////////////////
  static single_user_tasks(req, res) {
    try {
      const { user_id } = req.params;
      TaskModel.single_user_task_model(user_id, (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to get single user task", err });
        }
        res.status(200).json(data);
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  ////////////////////////////
  // CREATE TASK CONTROLLER
  ////////////////////////////
  static create_tasks(req, res) {
    try {
      console.log(req.body)
      // Task validation schema
      const schema = Joi.object({
        user_id: Joi.string().required().label("User ID"),
        task_type: Joi.string().required().label("Task Type"),
        task_details: Joi.string().label("Task Details"),
        task_budget: Joi.number().min(1).required().label("Task Budget"),
        task_category: Joi.string().label("Task Category"),
        task_date: Joi.string().required().label("Task Date"),
        task_flexible_time: Joi.string().label("Task Flexible Time"),
        task_status: Joi.string().label("Task Status"),
        task_location: Joi.string()
          .min(5)
          .max(255) // Maximum length for task location
          .required()
          .label("Task Location"),
      });
      // Validate request data
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res
          .status(400)
          .json({ message: "Validation Error", errors: errorMessages });
      }
      const data = { ...value, task_id: uuidv4() };
      TaskModel.create_task_model(data, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to create task", err });
        }
        res
          .status(201)
          .json({ message: "task create successfully", id: data.task_id });
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  ////////////////////////////
  // UPDATE TASK CONTROLLER
  ////////////////////////////
  static update_tasks(req, res) {
    try {
      // Task validation schema
      const schema = Joi.object({
        user_id: Joi.string().required().label("User ID"),
        task_type: Joi.string().required().label("Task Type"),
        task_details: Joi.string().label("Task Details"),
        task_budget: Joi.number().min(1).required().label("Task Budget"),
        task_category: Joi.string().label("Task Category"),
        task_date: Joi.string().required().label("Task Date"),
        task_flexible_time: Joi.string().label("Task Flexible Time"),
        task_status: Joi.string().label("Task Status"),
        task_location: Joi.string()
          .min(5)
          .max(255)
          .required()
          .label("Task Location"),
      });
      // Validate request data
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res
          .status(400)
          .json({ message: "Validation Error", errors: errorMessages });
      }
      const data = value;
      const { task_id } = req.params;
      TaskModel.update_task_model(data, task_id, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to update task", err });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "task not found!" });
        }
        res.status(200).json({ message: "task update successfully" });
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  ////////////////////////////////
  // UPDATE TASK STATUS CONTROLLER
  //////////////////////////////////
  static update_task_status(req, res) {
    try {
      const schema = Joi.object({
        task_status: Joi.string()
          .valid("open", "completed", "in_progress")
          .required()
          .label("Task Status"),
      });
      // Validate request data
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res
          .status(400)
          .json({ message: "Validation Error", errors: errorMessages });
      }
      const task_status = value.task_status;
      const task_id = req.params.task_id;
      TaskModel.update_task_status_model(
        task_status,
        task_id,
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "failed to update task status", err });
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "task not found!" });
          }
          res.status(200).json({ message: "task status update successfully" });
        }
      );
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  ////////////////////////////
  // DELETE TASK CONTROLLER
  ////////////////////////////
  static delete_tasks(req, res) {
    try {
      const { task_id } = req.params;
      TaskModel.delete_task_model(task_id, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to delete task", err });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "task not found!" });
        }
        res.status(200).json({ message: "task delete successfully" });
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
}
module.exports = TaskController;
