const Permission = require("../models/permission.model");

exports.createPermission = async (req, res) => {
  try {
    const permission = await Permission.create(req.body);
    res.status(201).json({ message: "Permission created successfully", permission });
  } catch (error) {
    res.status(400).json({ message: "Error creating permission", error: error.message });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching permissions", error: error.message });
  }
};
