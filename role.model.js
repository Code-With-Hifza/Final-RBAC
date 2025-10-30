const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleId: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
});

roleSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

module.exports = mongoose.model("Role", roleSchema);
