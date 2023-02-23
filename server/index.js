import express  from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import postRoute from './routes/posts.js';
import catRouter from './routes/categories.js';

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use('/images',express.static(path.join(__dirname,'/images')));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

//take file and save in images
const storage = multer.diskStorage({
    destination:(req,res,cb) =>{
        cb(null,"images")
    },filename:(req,res,cb) =>{
        cb(null,req.body.name)
    }
})
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


//Routers
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',catRouter);

app.listen(5000,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});
