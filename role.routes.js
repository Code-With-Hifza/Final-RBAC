const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");
const checkPermission = require("../middleware/auth.middleware");

router.get("/", checkPermission("view"), roleController.getRoles);

module.exports = router;


router.post("/", roleController.createRole);
