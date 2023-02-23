import express from 'express';
import User from '../models/User.js';
//used to hash passssword
import bcrypt from 'bcrypt';

const router = express.Router();

/*
Methods uses -
    post :- if we want to create something
    put  :- if we want to update existing models we use this
    delete :- to delete some model
    get  :- if we want to fetch data and not change anything or update anything
*/

//REGISTER
router.post('/register',async(req,res) =>{
    try{
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post('/login',async (req,res)=>{
    try {
        const user =await User.findOne({username: req.body.username});
        !user && res.status(400).json('Wrong credentials!');

        const validated =  bcrypt.compare(req.body.password,user.password);
        !validated && res.status(400).json('Wrong credentials!');

        //Not sending password since not needed
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;