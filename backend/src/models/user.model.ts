import { Schema, model, Document, ObjectId, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  _id?: ObjectId;
  username: string;
  name: string;
  password: string;
  email: string;
  avatarUrl: string;
  bio: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
  posts: ObjectId[];
  drafts: ObjectId[];
  favoritePosts?: ObjectId[];
  role: "super_administrator" | "administrator" | "moderator" | "user";
  muted: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
    lowercase: true,
    unique: true,
  },

  name: {
    type: String,
    required: false,
    minLength: 2,
    lowercase: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatarUrl: {
    type: String,
    lowercase: true,
    default: ""
  },

  bio: {
    type: String,
    required: false,
  },

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  drafts: [
    {
      type: Types.ObjectId,
      ref: "Post",
    },
  ],

  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "administrator", "moderator", "super_administrator"],
  },

  muted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
});

userSchema.methods.encryptPassword = async function (
  password: string
): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
