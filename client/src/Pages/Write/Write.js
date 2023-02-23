import React, { useContext, useState } from 'react'
import axios from 'axios';
import './Write.css'; 
import {Context} from '../../Context/Context';


function Write() {
  const{user} = useContext(Context)
  const[title,setTitle] = useState("");
  const[desc,setDesc] = useState("");
  const[cats,setCats] = useState([]);
  const [file,setFile] = useState(null);

  const handleSubmit =async (e)=>{
    
    e.preventDefault();
    const newPost = {
      username:user.username,
      title,
      desc,
      categories:cats,
    }
    if(file){
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    try {
        const post = await axios.post('http://localhost:5000/api/posts',newPost);          
        alert("Post Added");
        window.location.replace('/');
      } catch (error) {
        console.log(error.message);
      } 
  }

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])}/>
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Categories"
            type="text"
            autoFocus={true}
            style={{fontSize:'20px',padding:'10px'}}
            required pattern="[a-z,A-Z]*"
            onChange={(e) => {setCats(e.target.value.split(","))}}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  )
}

export default Write
