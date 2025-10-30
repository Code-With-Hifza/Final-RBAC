const express = require("express");
const router = express.Router();
const UserRole = require("../models/userRole.model");
const User = require("../models/user.model");
const Role = require("../models/role.model");

router.post("/", async (req, res) => {
  try {
    const { email, roleName } = req.body;

    if (!email || !roleName) {
      return res.status(400).json({ message: "email and roleName are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const role = await Role.findOne({ name: roleName });
    if (!role) return res.status(404).json({ message: "Role not found" });

    const existing = await UserRole.findOne({ userId: user._id, roleId: role._id });
    if (existing) return res.status(400).json({ message: "User already has this role" });

    const userRole = new UserRole({ userId: user._id, roleId: role._id });
    await userRole.save();

    res.status(201).json({
      message: "Role assigned to user successfully",
      user: { id: user._id, email: user.email },
      role: { id: role._id, name: role.name }
    });

  } catch (error) {
    res.status(500).json({ message: "Error assigning role", error: error.message });
  }
});

module.exports = router;
