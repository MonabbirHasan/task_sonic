const express = require("express");
const UserController = require("../controller/users.controller");
const authorization = require("../middleware/authentication");
const router = express.Router();

router.use(authorization);

router.get("/", UserController.all_users);
router.post("/login", UserController.login_users);
router.post("/", UserController.create_users);
router.get("/:user_id", UserController.single_users);
router.patch("/:user_id", UserController.update_users);
router.delete("/:user_id", UserController.delete_users);
module.exports = router;
