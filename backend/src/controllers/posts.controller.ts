import { Request, Response } from "express";
import Post, { IPost } from "../models/post.model";
import User from "../models/user.model";
import {
  createPost,
  findPost,
  findPosts,
  search,
  deleteOne,
  update,
} from "../services/posts.service";

/**
 * The function `newPost` creates a new post and associates it with a user, and then sends the created
 * post and user as a response.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and body.
 * @param {Response} res - The `res` parameter is an instance of the `Response` object from the
 * Express.js framework. It represents the HTTP response that will be sent back to the client. It is
 * used to send the response data, set response headers, and control the response status code.
 */
export const newPost = async (req: Request, res: Response) => {
  try {
    const { post, user } = await createPost(req.userId, req.body);

    res.json([post, user]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await findPost(req.params.id);

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json("Internal Server Error");
  }
};

/**
 * The function `getPosts` is an asynchronous function that retrieves posts with an optional limit from
 * a database and sends the retrieved posts as a JSON response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is an instance of the `Response` object from the
 * Express.js framework. It represents the HTTP response that will be sent back to the client.
 */
export const getPosts = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 0;
    const posts = await findPosts(limit);

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json("Internal Server Error");
  }
};

/**
 * The function `getSearch` is an asynchronous function that handles a search request by retrieving
 * posts related to the search query and returning them as a JSON response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with the search results (posts) if the search query is provided. If there
 * is no search query, it returns a 418 status code (I'm a teapot) without any response body. If there
 * is an error during the search process, it returns a 500 status code (Internal Server Error) with a
 * response body of "Internal Server Error".
 */
export const getSearch = async (req: Request, res: Response) => {
  try {
    const query = req.params.search;
    if (!query) return res.status(418).json();

    const posts = await search(query);
    res.json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json("Internal Server Error");
  }
};

/**
 * The function `deletePost` is an asynchronous function that deletes a post and returns the updated
 * list of posts, or an error message if there is an error.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, request headers, request body, request
 * parameters, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as `json()` to send a JSON response, `status()` to set the status code of the response, and `send
 */
export const deletePost = async (req: Request, res: Response) => {
  try {
    const posts = await deleteOne(req.userId, req.params.id);

    res.json(posts);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const updatedPostData: IPost = {
      _id: req.body._id,
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date(),
      tags: req.body.tags,
    };

    const renewedPost = await update(req.userId, updatedPostData);

    res.json(renewedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json("Internal Server Error");
  }
};
