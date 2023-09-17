import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
// const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
// export default mongoose.model("User", userSchema);
