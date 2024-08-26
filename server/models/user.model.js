import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      minlength: [2, "Name must be at least 2 characters long!"],
      maxlength: [255, "Name must be less than 255 characters long!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters long!"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = model("users", UserSchema);
export default User;
