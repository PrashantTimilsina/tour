import { models, model, Schema, Document, Types } from "mongoose";
import validator from "validator";
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;

  provider?: string[];
  cartItems?: Types.ObjectId[];
  passwordResetToken?: string;
  cloudinaryId?: string;
  passwordResetExpiry?: Date;
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
    cartItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tour",
      },
    ],

    cloudinaryId: { type: String, required: false },
    provider: { type: [String], default: [] },
    passwordResetToken: String,
    passwordResetExpiry: Date,
  },
  { timestamps: true }
);
const User = models.User || model<IUser>("User", userSchema);
export default User;
