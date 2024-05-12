import "../../assets/css/Auth/Login.css";
import { GoogleLogin } from "@react-oauth/google";
import axios  from "axios";

import { jwtDecode } from "jwt-decode";
import { useState } from "react";


function Login() {
    const url = import.meta.env.VITE_APP_URL
    const [email ,setEmail] = useState("");
    const [password , setPassword] = useState("");
    

    const handlelogin = (e)=>{
        console.log(email,password)
        e.preventDefault();
        axios({method:"post",url:`${url}/api/login`,data:{email:email,password:password},withCredentials:true})
        .then((res)=>{
            console.log(res)

        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const sendData = async(decode)=>{
        await axios({method:"post",url:`${url}/api/googleLogin`,data:{email:decode.email,picture:decode.picture,name:decode.name},withCredentials:true})
        .then((res)=>{
            console.log(res)
            

        })
        .catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div className="login-page-main-div">
      <div className="login-page-insider-div" data-aos="fade-in" data-aos-duration="500" data-aos-easing="ease-in-out">
        <form onSubmit={handlelogin}>
          <div className="form-div">
            <label>Email</label>
            <br />
            <input type="text" value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
          </div>
          <div className="form-div">
            <label>Password</label>
            <br />
            <input type="password" value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }} />
          </div>
          <div className="form-button-div">
            <button type="submit">login</button>
          </div>
        </form>
        <div className="google-button-div">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              const decoded = jwtDecode(credentialResponse?.credential);
              console.log(decoded);
              sendData(decoded)
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
