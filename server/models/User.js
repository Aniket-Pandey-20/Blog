import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
    profilPicture: {
        type:String,
        default:''
    },
},{timestamps: true});

const User = mongoose.model("User",UserSchema);

export default User;