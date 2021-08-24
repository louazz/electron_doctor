
import '../assets/css/App.scss';
import React, { useState, useEffect } from 'react';
import '../assets/css/react-confirm-alert.scss';
import { confirmAlert } from 'react-confirm-alert'; 
import axios from "axios";
import { useHistory } from 'react-router-dom';
import MyImage from './zaiter.png';
import MyImage1 from './login.jpg';
import { unwatchFile } from 'fs';
function App() {
  const [name, setName] = useState("");
	const [password, setpassword] = useState("");
  const [checker, setchecker] = useState(false);
	const history = useHistory();
  function handlechange_name(event){
    setName(event.target.value)
}
function handlechange_password(event){
  setpassword(event.target.value)
  } 

  function handlechange_submit(event){
    var text = window.ipcRenderer.sendSync('search',{name: name, password:password});
   console.log(text.length)
    if(text.length!=0 ){
      if(name===(text[0].name) && password===(text[0].password)){
        history.push({  pathname: '/add', state:{data: text[0]}});
        submit("Signed in", `welcome ${text.name}`)
        setchecker(true)
      }else{
        submit("Mistake", "incorrect username or password")
      }
   
    }else{
      submit("Mistake", "incorrect username or password")
    }
   
  
	/*	axios.get(`https://riadhzaiter.herokuapp.com/doctors`)
   
		.then(res => {
      submit("Wait a second", "We are signing you in ....")
      if(res.status==200){
        var checker= false;
        res.data.map((data)=> {
       if((data.Username== name) && (data.pass==password)){
         console.log(data.Username)
            history.push({  pathname: '/add', state:{data: data}});
            checker=true;
          }
        }  
        )
        if(checker==false){
          submit("Mistake", "incorrect username or password")
        }
      }else {
        submit("No internet", "Signin needs internet connection")
      }
    })*/
  }
     
  function submit(text, desc) {
    confirmAlert({
      title: text,
      message: desc,
      buttons: [
        {
          label: 'Ok',
          onClick: () =>{console.log("logging")},}
       
      ]
    });
  }; 
  return (
    <div >
        <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 login-section-wrapper">
          <div class="brand-wrapper">
            <img src={MyImage} alt="ZAITER" class="logo"/>
          </div>
          <div class="login-wrapper my-auto">
            <h1 class="login-title">Log in</h1>
            <form action="#!">
              <div class="form-group">
                <label for="email">Username</label>
                <input type="email" name="email" id="email" class="form-control" onChange={handlechange_name} placeholder="username"/>
              </div>
              <div class="form-group mb-4">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" onChange={handlechange_password} placeholder="enter your passsword"/>
              </div>
              <input name="login" id="login" class="btn btn-block login-btn" onClick={e => handlechange_submit(e)} type="button" value="Login"/>
            </form>
            <br/>
          </div>
        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img src={MyImage1}  alt="login image" class="login-img"/>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
