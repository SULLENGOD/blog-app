import { ObjectId, Schema, model } from "mongoose";
import { IUser } from "./user.model";

export interface IPost {
  _id?: ObjectId;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags: string[];
  author?: {
    _id: ObjectId,
    username: string
  }
}

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  content: {
    type: String,
    required: true,
  },

  createdAt: {
    required: false,
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  },

  tags: [
    {
      type: String,
      trim: true,
    },
  ],

  author: {
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true }
  },
});

export default model("Post", postSchema);
