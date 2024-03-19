import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://tse3.mm.bing.net/th?id=OIP.zW0R7waKPw1IOmG3METk6gHaHa&pid=Api&P=0&h=180",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
