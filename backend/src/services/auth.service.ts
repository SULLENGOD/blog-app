import {
  AuthenticationError,
  NotFoundError,
  UnauthorizedError,
} from "../libs/errorHandling";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

const findUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User not found.");

  return user;
};

/**
 * The function creates a new user, encrypts their password, saves the user to the database, generates
 * a token, and returns the token and user ID.
 * @param {IUser} userData - The `userData` parameter is an object that contains the information of a
 * new user. It typically includes properties such as `name`, `email`, and `password`.
 * @returns an object with two properties: "token" and "userId". The "token" property contains a JWT
 * token generated using the user's ID, and the "userId" property contains the ID of the saved user.
 */
export const newUser = async (userData: IUser) => {
  const newUser = new User(userData);
  newUser.password = await newUser.encryptPassword(newUser.password);

  const savedUser = await newUser.save();

  const token: string = jwt.sign(
    { _id: savedUser._id },
    process.env.TOKEN_SECRET || "defaultToken"
  );

  return {
    token: token,
    userId: savedUser._id,
  };
};

/**
 * The function `authenticateUser` takes in user data, checks if the user exists and if the password is
 * valid, and returns a token and user ID if successful.
 * @param {IUser} userData - The `userData` parameter is an object of type `IUser` which contains the
 * user's email and password.
 * @returns an object with two properties: "token" and "userId". The "token" property contains a JWT
 * token generated using the user's ID and a secret token. The "userId" property contains the ID of the
 * authenticated user.
 */
export const authenticateUser = async (userData: IUser) => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new AuthenticationError("Invalid email or password");
  }

  if (!(await user.validatePassword(userData.password))) {
    throw new AuthenticationError("Invalid email or password");
  }

  const token: string = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || "defaultToken",
    { expiresIn: 60 * 60 * 24 }
  );

  return {
    token: token,
    userId: user._id,
  };
};

/**
 * The function retrieves an authenticated user by their ID and returns the user object without the
 * password field.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used to query the database and find the user with the matching ID.
 * @returns the user object.
 */
export const userInfo = async (userId: string) => {
  const user = await User.findById(userId, { password: 0 });
  if (!user) throw new NotFoundError("User not found");
  return user;
};

/**
 * The function modifies the role of a user if the admin has the role of "super_administrator".
 * @param {string} adminId - The adminId parameter is a string that represents the ID of the admin user
 * who is performing the role modification.
 * @param {string} userId - The `userId` parameter is the unique identifier of the user whose role
 * needs to be modified.
 * @param {string} role - The `role` parameter is a string that represents the new role that you want
 * to assign to the user.
 * @returns the updated user object.
 */
export const modifyRole = async (
  adminId: string,
  userId: string,
  role: string
) => {
  const admin = await User.findById(adminId);
  if (!admin || admin.role !== "super_administrator") {
    throw new UnauthorizedError("Access Denied");
  }
  const user = await User.findById(userId, { password: 0 });
  if (!user) throw new NotFoundError("User not found");

  await user.updateOne({ role: role });

  return user;
};

/**
 * The function upgrades a user to a moderator role if the caller is an admin.
 * @param {string} adminId - The `adminId` parameter is the unique identifier of the admin user who is
 * performing the upgrade to moderator action.
 * @param {string} userId - The `userId` parameter is the unique identifier of the user that you want
 * to upgrade to a moderator.
 * @returns the updated user object with the role set to "moderator".
 */
export const upgradeToModerator = async (adminId: string, userId: string) => {
  const admin = await User.findById(adminId);
  if (
    !admin ||
    !["super_administrator", "administrator"].includes(admin.role)
  ) {
    throw new UnauthorizedError("Access Denied");
  }

  const user = await User.findById(userId, { password: 0 });
  if (!user) throw new NotFoundError("User not found");

  await user.updateOne({ role: "moderator" });

  return user;
};

/**
 * The function `muteAnAuthor` mutes a user by setting their `muted` property to `true`, but only if
 * the caller is an admin with the appropriate role.
 * @param {string} adminId - The `adminId` parameter is a string that represents the ID of the admin
 * user who is performing the mute action.
 * @param {string} userId - The `userId` parameter is the unique identifier of the user that you want
 * to mute.
 * @returns the user object after updating the "muted" field to true.
 */
export const muteAnAuthor = async (adminId: string, userId: string) => {
  const admin = await User.findById(adminId);
  if (
    !admin ||
    !["super_administrator", "administrator", "moderator"].includes(admin.role)
  ) {
    throw new UnauthorizedError("Access Denied");
  }

  const user = await User.findById(userId, { password: 0 });
  if (!user) throw new NotFoundError("User not found");

  await user.updateOne({ muted: true });

  return user;
};

export const deleteAuthor = async (adminId: string, userId: string) => {
  const admin = await User.findById(adminId);
  if (!admin || admin.role !== "super_administrator") {
    throw new UnauthorizedError("Access Denied");
  }

  const user = await findUser(userId);

  await user.deleteOne({ _id: userId });

  return user.username;
};

export const updateAuthorInfo = async (userId: string, userInfo: IUser) => {
  const user = await findUser(userId);
  const updatedUser = await user.updateOne(userInfo);

  return updatedUser;
};
