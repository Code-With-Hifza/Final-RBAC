const mongoose = require("mongoose");

const rolePermissionSchema = new mongoose.Schema({
  rolePermissionId: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  permissionId: { type: mongoose.Schema.Types.ObjectId, ref: "Permission", required: true },
  createdAt: { type: Date, default: Date.now },
});

// 
module.exports =
  mongoose.models.RolePermission ||
  mongoose.model("RolePermission", rolePermissionSchema);
