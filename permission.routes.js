const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permission.controller");
const checkPermission = require("../middleware/auth.middleware");
const { createPermission } = require("../controllers/permission.controller");

router.post("/", createPermission);

router.get("/", checkPermission("view"), permissionController.getPermissions);

module.exports = router;

router.post("/", permissionController.createPermission);