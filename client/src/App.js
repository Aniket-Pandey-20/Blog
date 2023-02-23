import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import Navbar from "./Components/Navbar/Navbar";
import Setting from "./Pages/Setting/Setting";
import Write from './Pages/Write/Write';
import PostM from './Pages/PostM/PostM';
import About from "./Pages/About/About";
import Contact from './Pages/Contact/Contact';
import {Context} from './Context/Context';

function App(){
  const {user} = useContext(Context);
  const currentUser = user;
  return(
    <Router>
      <Navbar currentUser = {currentUser}/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/posts" element={<Home/>} />

        <Route path="/register" element={currentUser ? <Home /> : <Register />} />
          
        <Route path="/login" element={currentUser ? <Home /> : <Login />} />

        <Route path="/post/:id" exact element={<PostM />} />

        <Route path="/about" element={<About/>}/>

        <Route path="/contact" element={<Contact/>}/>
          
        <Route path="/write" element={currentUser ? <Write /> : <Login />} />

        <Route path="/setting" element={currentUser ? <Setting /> : <Login />} />
        
      </Routes>
    </Router> 
  )
}

export default App;
