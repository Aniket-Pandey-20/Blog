import React, { useContext ,useState} from 'react'
import SideBar from '../../Components/Sidebar/SideBar';
import './Setting.css';
import {Context} from '../../Context/Context';
import axios from 'axios';

function Setting() {
  const {user} = useContext(Context);
  const[username,setUsername] = useState(user.username);
  const[email,setEmail] = useState(user.email);
  const[password,setPassword] = useState('');
  const[file,setFile] = useState(null);
  const [updateState,setUpdateState] = useState(false);

  const haldelSubmit =async (e) => {
    e.preventDefault();
    const updateUser = {
      _id:user._id,
      username,
      email,
      password,
    }
    if(file){
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilPicture = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log(err) 
      }
    }
    if(username || email || password){
      try {
      await axios.put(`http://localhost:5000/api/users/` + user._id,updateUser)
      setUpdateState(true);
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={haldelSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) :  user.profilPhoto}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" defaultValue={username} name="name" onChange={(e) => setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" defaultValue={email} name="email" onChange={(e) => setEmail(e.target.value) }/>
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value) }/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {updateState && <h2 style={{textAlign:'center',marginTop:"20px"}}>Updated Succefully</h2>}
        </form>
      </div>
      <SideBar />
    </div>
  )
}

export default Setting
