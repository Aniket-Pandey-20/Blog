import express from 'express'
import User from '../models/User.js';
import Post from '../models/Post.js';
const router = express.Router();

//CREATE
router.post('/',async (req,res)=>{
    const newPost = new Post(req.body);

    try{
        const savedPost =await newPost.save();
        res.status(200).json(savedPost);
    }catch(error){
        res.status(500).json(error);
    }
});

//UPDATE
router.put('/:id',async (req,res) =>{
    try {
        const post =await Post.findById(req.params.id);
        if(post.username ){
            const updatedPost =await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            res.status(200).json(updatedPost);
        }else{
            res.status(401).json('You can only update your post');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE
router.delete('/:id',async (req,res) =>{
    console.log(req.body);
    try {
        const post =await Post.findById(req.params.id);
        if(post.username === req.body.username){
            await post.delete();
            res.status(200).json('Post Deleted');
        }else{
            res.status(401).json('You can only delete your post');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/',async (req,res) =>{
    const username = req.query.username;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }});
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router; 