const express = require("express");
const authenticate = require("../middleware/authenticate");
const checkPermission = require("../middleware/auth.middleware"); // <- yaha change kiya

const router = express.Router();

// Admin protected route

router.get(
  "/dashboard",
  authenticate,
  checkPermission("view_admin_dashboard"),
  (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard" });
  }
);

module.exports = router;
