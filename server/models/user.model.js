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
      unique: true, // Ensure email is unique
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address!",
      ], // Email format validation
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters long!"], // Increase minimum length for better security
    },
  },
  { timestamps: true }
);

// Hash password before saving the document
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if the password is modified or new

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
    next();
  } catch (err) {
    next(err); // Pass error to the next middleware
  }
});

const User = model("users", UserSchema);
export default User;
