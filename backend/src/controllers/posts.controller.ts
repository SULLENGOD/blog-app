import { Request, Response } from "express";
import Post, { IPost } from "../models/post.model";
import User from "../models/user.model";

/**
 * Creates a new post by the currently logged-in user.
 *
 * @param {Request} req Express request object containing post data (title, content, tags).
 * @param {Response} res Express response object.
 * @returns {Response} JSON response containing the saved post and updated user information (excluding password) on success, or error message on failure.
 *
 * @throws {401 Unauthorized} If the logged-in user is muted or unauthorized.
 * @throws {500 Internal Server Error} If any unexpected error occurs while creating the post.
 */
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

/**
 * Retrieves a specific post by its ID.
 *
 * @param {Request} req Express request object containing the post ID in URL parameters.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response containing the requested post details on success, or error message on failure.
 *
 * @throws {404 Not Found} If the post with the provided ID is not found.
 * @throws {500 Internal Server Error} If any unexpected error occurs while fetching the post.
 */

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

/**
 * Retrieves all existing posts.
 *
 * @param {Request} req Express request object.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response containing a list of all posts on success, or error message on failure.
 *
 * @throws {404 Not Found} If no posts are found.
 * @throws {500 Internal Server Error} If any unexpected error occurs while fetching posts.
 */
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    if (!posts || posts.length === 0)
      return res.status(404).json("Posts not found");

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json("Internal Server Error");
  }
};

/**
 * Retrieves a limited number of latest posts.
 *
 * @param {Request} req Express request object containing the desired number of posts in URL parameters.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response containing a list of the requested number of posts on success, or an empty response on invalid limit.
 *
 * @throws {418 I'm a teapot} If the provided limit is invalid.
 * @throws {500 Internal Server Error} If any unexpected error occurs while fetching posts.
 */
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

/**
 * Searches for posts matching a specific keyword in their title.
 *
 * @param {Request} req Express request object containing the search keyword in URL parameters.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response containing a list of matching posts on success, or an empty response on an empty query.
 *
 * @throws {418 I'm a teapot} If the provided query is empty.
 * @throws {500 Internal Server Error} If any unexpected error occurs while searching posts.
 */
export const getSearch = async (req: Request, res: Response) => {
  try {
    const query = req.params.search;
    if (!query) return res.status(418).json();

    const posts = await Post.find({
      title: { $regex: new RegExp(query, "i") },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json("Internal Server Error");
  }
};

/*
 * Deletes a specific post and removes its reference from the author's list.
 *
 * @param {Request} req Express request object containing the post ID in URL parameters.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response containing an updated list of the logged-in user's posts on success, or error message on failure.
 *
 * @throws {401 Unauthorized} If the logged-in user is not the post author.
 * @throws {500 Internal Server Error} If any unexpected error occurs while deleting the post.
 */
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

/**
 * Updates an existing post with the provided data, only allowing modifications by the post author.
 *
 * @param {Request} req Express request object containing the post data (ID, title, content, tags) for update.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response containing the updated post details on success, or error message on failure.
 *
 * @throws {401 Unauthorized} If the logged-in user is not the post author.
 * @throws {404 Not Found} If the post with the provided ID is not found.
 * @throws {500 Internal Server Error} If any unexpected error occurs while updating the post.
 */
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

    const renewedPost = await Post.findOneAndUpdate(
      { _id: req.body._id },
      updatedPostData,
      { new: true }
    );

    res.json(renewedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json("Internal Server Error");
  }
};
