import { Request, Response } from "express";
import Post, { IPost } from "../models/post.model";
import User from "../models/user.model";

export const newPost = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user || user.muted) return res.status(401).json("Unauthorized");

    const newPostData: IPost = {
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      tags: req.body.tags,
      author: user.toObject(),
    };

    const newPost = new Post(newPostData);
    const savedPost = await newPost.save();

    user.posts.push(savedPost._id.toString());
    await user.save();

    res.json([savedPost, user]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    if (!posts || posts.length === 0) return res.status(404).json("Posts not found");

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.params.limit);
    if (!limit) return res.status(418).json();

    const posts = await Post.find().limit(limit);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const getSearch = async (req: Request, res: Response) => {
  try {
    const query = req.params.search;
    if (!query) return res.status(418).json();

    const posts = await Post.find({ title: { $regex: new RegExp(query, 'i') } });
    res.json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(401).json("Unauthorized");

    await Post.deleteOne({ _id: req.params.id });

    const posts = user.posts;
    const index = posts.indexOf(req.params.id);

    if (index !== -1) {
      posts.splice(index, 1);
      user.posts = posts;
      user.save();
    }

    res.json(user.posts);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(401).json("Unauthorized");

    const updatedPostData: IPost = {
      _id: req.body._id,
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date(),
      tags: req.body.tags,
    };

    const renewedPost = await Post.findOneAndUpdate({ _id: req.body._id }, updatedPostData, { new: true });

    res.json(renewedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json("Internal Server Error");
  }
};
