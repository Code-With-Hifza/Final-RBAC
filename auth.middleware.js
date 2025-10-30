const UserRole = require("../models/userRole.model");
const RolePermission = require("../models/rolepermission.model");


const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized: No user ID found in token",
        });
      }

      const userRoles = await UserRole.find({ userId }).populate("roleId");
      if (!userRoles.length) {
        return res.status(403).json({
          message: "Access Denied: User has no roles assigned",
        });
      }

      const roleIds = userRoles.map((ur) => ur.roleId._id);

      const rolePermissions = await RolePermission.find({
        roleId: { $in: roleIds },
      }).populate("permissionId");

      const hasPermission = rolePermissions.some(
        (rp) =>
          rp.permissionId &&
          rp.permissionId.slug?.toLowerCase().trim() ===
            requiredPermission.toLowerCase().trim()
      );

      if (!hasPermission) {
        return res.status(403).json({
          message: "Access Denied: Insufficient permissions",
        });
      }

      next();
    } catch (error) {
      console.error("Permission check error:", error);
      res.status(500).json({
        message: "Server Error while checking permissions",
        error: error.message,
      });
    }
  };
};

module.exports = checkPermission;
