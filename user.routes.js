const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticate = require("../middleware/authenticate");
const checkPermission = require("../middleware/auth.middleware");

router.post("/login", userController.loginUser);

router.post("/", authenticate, checkPermission("create"), userController.createUser);

router.get("/", authenticate, checkPermission("view"), userController.getUsers);

router.get("/:id", authenticate, checkPermission("view"), userController.getUserById);

router.put("/:id", authenticate, checkPermission("edit"), userController.updateUser);

router.delete("/:id", authenticate, checkPermission("delete"), userController.deleteUser);

module.exports = router;
