import mongoose, {Schema, Document} from "mongoose";

export interface Messages extends Document{
    message: string;
    createdAt: Date;
};

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    codeExpiry: Date;
    message: Messages[];
    isAcceptingMessage: boolean;
};

const messageSchema: Schema<Messages> = new Schema({
    message:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
});
const Userschema: Schema<User> = new Schema({
    username:{
        type: String, 
        required: [true, "Username is required"],
        unique: true,
        maxlength: 20,
        minlength: 3
    },
    email:{
        type: String, 
        required: [true, "Email is required"],
        unique: true,
        match: 
        [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        ,"Please use a valid email address"]
    },
    password:{
        type: String, 
        required: true,
        unique: true,
        maxlength: 20,
        minlength: 8
    },
    verifyCode:
    {
        type: String, 
        required: true
    },
    codeExpiry:{
        type: Date,
        required: true
    },
    isAcceptingMessage:{
        type: boolean,
        default: true
    },
    message: [messageSchema]
}) 

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", Userschema))

export default UserModel