const UserModel = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
  static async login_users(req, res) {
    const { token } = req.body;

    try {
      // Verify the token using Google's OAuth client
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      // user details from the token
      const payload = ticket.getPayload();

      // if the user exists in the database
      UserModel.find_user_by_email_model(payload.email, async (err, user) => {
        if (err) {
          console.error("Database error while searching for user:", err);
          return res.status(500).json({
            message: "Error while searching for user",
            error: err.message,
          });
        }

        if (!user) {
          // If the user doesn't exist, create new user
          const user_data = {
            user_id: uuidv4(),
            user_name: payload.name,
            user_email: payload.email,
            user_phone: "",
            user_password: "",
            user_role: "user",
            user_status: "active",
          };

          UserModel.create_user_model(user_data, (err, result) => {
            if (err) {
              console.error("Error creating user:", err);
              return res.status(500).json({
                message: "Error creating new user",
                error: err.message,
              });
            }

            // New user created successfully
            return res.status(201).json({
              message: "Account created successfully",
              user: {
                id: user_data.user_id,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
              },
            });
          });
        } else {
          // User already exists; log them in
          return res.status(200).json({
            message: "Login successful",
            user: {
              id: user.user_id,
              email: payload.email,
              name: payload.name,
              picture: payload.picture,
            },
          });
        }
      });
    } catch (error) {
      console.error("Error verifying token:", error.message);
      return res.status(401).json({ error: "Invalid token" });
    }
  }

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
