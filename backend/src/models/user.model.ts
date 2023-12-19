import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
    posts: string[];
    role: 'super_administrator' | 'administrator' | 'moderator' | 'user';
    isMuted: boolean;
};

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],

    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'administrator', 'moderator', 'super_administrator']
    }
});

userSchema.methods.encryptPassword = async function(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
};

export default model<IUser>('User', userSchema);