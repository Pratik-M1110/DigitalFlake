import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
function Login() {
    const [cred,setCred] = useState({email:"",password:"",id:0});
    const [message,setMessage] = useState("")
    const navigate = useNavigate();

    const onTextChange =(args)=>{
      var copyOfcred = {...cred};
      copyOfcred[args.target.name] = args.target.value;
      setCred(copyOfcred);
  }
  
    useEffect(()=>{
      if(message!=""){
          setTimeout(() => {
              setMessage("");
          }, 3000);
      }
    }, [message])


  const home = () => {
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if( helper.readyState == 4 && helper.status == 200 ) {

        var response = JSON.parse(helper.responseText);

        if( response[0].email == cred.email && response[0].password == cred.password) {
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("email", response[0].email);
          sessionStorage.setItem("id", response[0].id);
          sessionStorage.setItem("password", response[0].password);
          navigate('/home')
        }
      }
      else{
        setMessage("Invalid Email or Password!")
        setCred({email:"",password:""});
      }
    }
    helper.open("POST","http://127.0.0.1:7373/login");
    helper.setRequestHeader("Content-Type","application/json")
    helper.send(JSON.stringify(cred));
  }
  return (
    <div>
        <div className="login-container">
  <form className="login-form">
    <h1>Welcome to Digital Flake</h1>
    <p>Please login to your account</p>
    <div className="input-group">
      <input type="text" onChange={onTextChange} value={cred.email} name="email" placeholder="Email" required/>
    </div>
    <div className="input-group">
      <input type="password" onChange={onTextChange} value={cred.password} name="password" placeholder="Password" required/>
    </div>
    <button type="submit" onClick={home}>Login</button>
    <div>{message}</div>
  </form>
</div>
    </div>
  )
}

export default Login