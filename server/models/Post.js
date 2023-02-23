import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true,
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        required:true,
    },
    categories: {
        type:Array,
        required:false,
    },
},{timestamps: true});

const Post = mongoose.model("Post",PostSchema);
export default Post;