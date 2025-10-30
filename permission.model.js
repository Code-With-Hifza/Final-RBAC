const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  permissionId: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true,  lowercase: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

permissionSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

module.exports = mongoose.model("Permission", permissionSchema);
