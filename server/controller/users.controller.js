const UserModel = require("../models/users.model");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
class UserController {
  /////////////////////////
  // ALL USER CONTROLLER
  /////////////////////////
  static all_users(req, res) {
    try {
      UserModel.all_user_model((err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to get all user", err });
        }
        res.status(200).json(data);
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  /////////////////////////
  // SINGLE USER CONTROLLER
  /////////////////////////
  static single_users(req, res) {
    try {
      const { user_id } = req.params;
      UserModel.single_user_model(user_id, (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to get single user", err });
        }
        res.status(200).json(data);
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  /////////////////////////
  // CREATE USER CONTROLLER
  /////////////////////////
  static create_users(req, res) {
    try {
      // validation schema
      const schema = Joi.object({
        user_name: Joi.string().min(3).max(50).required().label("User Name"),
        user_email: Joi.string().email().required().label("User Email"),
        user_phone: Joi.string()
          .pattern(/^[6-9]\d{9}$/) // Validate Indian phone number
          .required()
          .label("User Phone"),
        user_password: Joi.string()
          .min(8)
          .regex(/[A-Z]/) // At least one uppercase letter
          .regex(/[a-z]/) // At least one lowercase letter
          .regex(/[0-9]/) // At least one number
          .required()
          .label("User Password"),
        user_role: Joi.string()
          .valid("admin", "user", "tasker")
          .required()
          .label("User Role"),
        user_status: Joi.string()
          .valid("active", "inactive", "suspended")
          .required()
          .label("User Status"),
      });

      // Validate request data
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res
          .status(400)
          .json({ message: "Validation Error", errors: errorMessages });
      }
      const data = { ...value, user_id: uuidv4() };
      UserModel.create_user_model(data, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to create user", err });
        }
        res
          .status(201)
          .json({ message: "user create successfully", id: data.user_id });
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  /////////////////////////
  // LOGIN USER CONTROLLER
  /////////////////////////
  static login_users(req, res) {}
  /////////////////////////
  // UPDATE USER CONTROLLER
  /////////////////////////
  static update_users(req, res) {
    try {
      // validation schema
      const schema = Joi.object({
        user_name: Joi.string().min(3).max(50).required().label("User Name"),
        user_email: Joi.string().email().required().label("User Email"),
        user_phone: Joi.string()
          .pattern(/^[6-9]\d{9}$/) // Validate Indian phone number
          .required()
          .label("User Phone"),
        user_password: Joi.string()
          .min(8)
          .regex(/[A-Z]/) // At least one uppercase letter
          .regex(/[a-z]/) // At least one lowercase letter
          .regex(/[0-9]/) // At least one number
          .required()
          .label("User Password"),
        user_role: Joi.string()
          .valid("admin", "user", "tasker")
          .required()
          .label("User Role"),
        user_status: Joi.string()
          .valid("active", "inactive", "suspended")
          .required()
          .label("User Status"),
      });

      // Validate request data
      const { error, value } = schema.validate(req.body, { abortEarly: false });

      // If validation fails, send error response
      if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res
          .status(400)
          .json({ message: "Validation Error", errors: errorMessages });
      }
      const data = value;
      const { user_id } = req.params;
      UserModel.update_user_model(data, user_id, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to update user", err });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "user not found!" });
        }
        res.status(200).json({ message: "user update successfully" });
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
  /////////////////////////
  // DELETE USER CONTROLLER
  /////////////////////////
  static delete_users(req, res) {
    try {
      const { user_id } = req.params;
      UserModel.delete_user_model(user_id, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to delete user", err });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "user not found!" });
        }
        res.status(200).json({ message: "user delete successfully" });
      });
    } catch (error) {
      return res.status(503).json(error);
    }
  }
}
module.exports = UserController;