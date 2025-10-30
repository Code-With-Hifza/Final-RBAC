const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  userRoleId: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserRole", userRoleSchema);
