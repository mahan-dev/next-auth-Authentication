import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const User = models.user || model("user", userSchema);
export default User;
