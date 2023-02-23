import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Post from '../models/Post.js';

//UPDATE
router.put('/:id',async (req,res) =>{
    if(req.body._id === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10); 
            req.body.password = await bcrypt.hash(req.body.password,salt);           
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new: true});
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(401).json('You can only update your account');
    }
})

//DELETE
router.delete('/:id',async (req,res) =>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try {
                //deleting all post to this user
                await Post.deleteMany({username: user.username});
                
                //deleting the user
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json('User has been deleted');
            } catch (error) {
                res.status(500).json(error);
            }
        }catch(error){
            res.status(404).json('user not found');
        }

    }else{
        res.status(401).json('You can only delete your account');
    }
}) 

//GET USER
router.get('/:id',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const{password,...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;