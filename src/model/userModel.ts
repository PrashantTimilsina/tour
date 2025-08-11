import { models, model, Schema, Document } from "mongoose";
import validator from "validator";
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?: string[];
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: function (this: IUser) {
        if (this.provider?.includes("credentials")) {
          return true;
        } else {
          return false;
        }
      },
    },
    image: { type: String, required: false },
    provider: { type: [String], default: [] },
  },
  { timestamps: true }
);
const User = models.User || model<IUser>("User", userSchema);
export default User;
