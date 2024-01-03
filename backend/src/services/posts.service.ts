import Post, { IPost } from "../models/post.model";
import User from "../models/user.model";
import {
  NotFoundError,
  UnauthorizedError,
} from "../libs/errorHandling";
import { ObjectId } from "mongoose";

const findUser = async (userId: string) => {
  const user = await User.findById(userId, { password: 0, __v: 0 });
  if (!user) throw new UnauthorizedError("Access Denied");

  return user;
}

/**
 * The `createPost` function creates a new post with the provided data and associates it with the
 * specified user.
 * @param {string} userId - The `userId` parameter is a string that represents the ID of the user who
 * is creating the post.
 * @param {IPost} postData - The `postData` parameter is an object that represents the data for a new
 * post. It has the following properties:
 * @returns an object with two properties: "post" and "user". The "post" property contains the saved
 * post object, and the "user" property contains the updated user object.
 */
export const createPost = async (userId: string, postData: IPost) => {
  
  const user = await findUser(userId);

  const newPostData: IPost = {
    title: postData.title,
    content: postData.content,
    createdAt: new Date(),
    tags: postData.tags,
    author: {_id: user._id, username: user.username},
  };

  const newPost = new Post(newPostData);
  const savedPost = await newPost.save();

  await User.findByIdAndUpdate(
    userId,
    {
      $push: { posts: newPost._id },
    },
    { new: true }
  );

  return {
    post: savedPost,
    user: user,
  };
};

/**
 * The function `findPost` is an asynchronous function that finds a post by its ID and throws a
 * `NotFoundError` if the post is not found.
 * @param {string} postId - The `postId` parameter is a string that represents the unique identifier of
 * a post. It is used to search for a post in the database.
 * @returns the post object that was found by its ID.
 */
export const findPost = async (postId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw new NotFoundError("Post not found");
  return post;
};

/**
 * The function `findPosts` returns a list of posts with an optional limit.
 * @param {number} limit - The `limit` parameter specifies the maximum number of posts to be returned
 * by the `findPosts` function. If `limit` is set to 0, it will return all posts. Otherwise, it will
 * return the specified number of posts, limited by the value of `limit`.
 * @returns The function `findPosts` returns a query to find posts from the database. If the `limit`
 * parameter is 0, it returns all posts by calling `Post.find()`. Otherwise, it returns a limited
 * number of posts based on the `limit` parameter by calling `Post.find().limit(limit)`.
 */
export const findPosts = (limit: number) => {
  if (limit == 0) {
    return Post.find();
  } else {
    return Post.find().limit(limit);
  }
};

/**
 * The `search` function uses regular expressions to find posts with titles that match the given query
 * string in a case-insensitive manner.
 * @param {string} query - The `query` parameter is a string that represents the search query. It is
 * used to search for posts that have a title matching the given query.
 * @returns a promise that resolves to an array of posts that match the given query.
 */
export const search = async (query: string) => {
  const posts = await Post.find({
    title: { $regex: new RegExp(query, "i") },
  });

  return posts;
};

/**
 * The function deletes a post by its ID and removes it from the user's list of posts.
 * @param {string} userId - The `userId` parameter is a string that represents the ID of the user whose
 * post is being deleted.
 * @param {string} postId - The `postId` parameter is the unique identifier of the post that needs to
 * be deleted.
 * @returns the updated list of posts for the user after deleting a post.
 */
export const deleteOne = async (userId: string, postId: string) => {
  const user = await findUser(userId);
  console.log(postId);
  

  await Post.deleteOne({ _id: postId });

  const posts = user.posts;
  const index = posts.indexOf(postId);

  if (index !== -1) {
    posts.splice(index, 1);
    user.posts = posts;
    user.save();
  }

  return user.posts;
};

/**
 * The function updates a post for a specific user, after verifying the user's authentication.
 * @param {string} userId - A string representing the ID of the user who is updating the post.
 * @param {IPost} postData - The `postData` parameter is an object of type `IPost`. It contains the
 * data that needs to be updated for a post.
 * @returns the updated post object.
 */
export const update = async (userId: string, postData: IPost) => {
  const user = await findUser(userId);

  const renewedPost = await Post.findByIdAndUpdate(
    { _id: postData._id },
    postData,
    { new: true }
  );

  return renewedPost;
};
