const express = require("express");
const router = express.Router();
const Role = require("../models/role.model");
const Permission = require("../models/permission.model");
const RolePermission = require("../models/rolepermission.model");

// Assign permissions to role
router.post("/", async (req, res) => {
  try {
    const { roleName, permissions } = req.body;

    const role = await Role.findOne({ name: roleName });
    if (!role) return res.status(404).json({ message: "Role not found" });

    for (const permName of permissions) {
      const permission = await Permission.findOne({ name: permName });
      if (!permission)
        return res.status(404).json({ message: `Permission '${permName}' not found` });

      const existing = await RolePermission.findOne({
        roleId: role._id,
        permissionId: permission._id,
      });
      if (!existing) {
        await RolePermission.create({
          roleId: role._id,
          permissionId: permission._id,
        });
      }
    }

    res.status(201).json({ message: "Permissions assigned to role successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error assigning permissions", error: error.message });
  }
});

module.exports = router;
