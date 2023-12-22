import Post, { IPost } from "../models/post.model";
import User from "../models/user.model";
import {
  AuthenticationError,
  NotFoundError,
  UnauthorizedError,
} from "../libs/errorHandling";

export const createPost = async (userId: string, postData: IPost) => {
  const user = await User.findById(userId, { password: 0, __v: 0 });
  if (!user) throw new UnauthorizedError("Access Denied");

  const newPostData: IPost = {
    title: postData.title,
    content: postData.content,
    createdAt: new Date(),
    tags: postData.tags,
    author: { _id: user._id, username: user.username },
  };

  const newPost = new Post(newPostData);
  const savedPost = await newPost.save();

  user.posts.push(savedPost._id.toString());
  await user.save();

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

export const findPost = async (postId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw new NotFoundError("Post not found");
  return post;
};

export const findPosts = (limit: number) => {
  if (limit == 0) {
    return Post.find();
  } else {
    return Post.find().limit(limit);
  }
};

export const search = async (query: string) => {
  const posts = await Post.find({
    title: { $regex: new RegExp(query, "i") },
  });

  return posts;
};

export const deleteOne = async (userId: string, postId: string) => {
  const user = await User.findById(userId, { password: 0, __v: 0 });
  if (!user) throw new UnauthorizedError("Access Denied");

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

export const update = async (userId: string, postData: IPost) => {
  const user = await User.findById(userId, { password: 0, _v: 0 });
  if (!user) throw new AuthenticationError("Access Denied");

  const renewedPost = await Post.findByIdAndUpdate(
    { _id: postData._id },
    postData,
    { new: true }
  );

  return renewedPost;
};
