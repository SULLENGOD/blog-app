import { ObjectId, Schema, model } from "mongoose";
import { IUser } from "./user.model";

export interface IPost {
  _id?: ObjectId;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  tags: string[];
  categories?: string[];
  author?: {
    _id: ObjectId;
    username: string;
  };
  coAuthors?: {
    _id: ObjectId;
    username: string;
  }[];
  status?: "draft" | "published" | "scheduled" | "private";
  likes?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
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

  excerpt: String,

  featuredImage: String,

  tags: [
    {
      type: String,
      trim: true,
    },
  ],

  categories: [String],

  author: {
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
  },

  coAuthors: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "User" },
      username: { type: String },
    },
  ],

  status: {
    type: String,
    enum: ["draft", "published", "scheduled", "private"],
    default: "draft",
  },

  likes: {
    _id: { type: Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
  },

  createdAt: {
    required: false,
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  },

  publishedAt: Date,
});

export default model("Post", postSchema);
