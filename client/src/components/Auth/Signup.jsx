
import axios  from "axios";

import { useState } from "react";
function Signup() {
    const url = import.meta.env.VITE_APP_URL
    const [email ,setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleSignup = (e)=>{
        e.preventDefault();
        axios({method:"post",url:`${url}/api/signup`,data:{
            email:email,password:password,confirmPassword:confirmPassword}})
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
        <form onSubmit={handleSignup}>
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
          <div className="form-div">
            <label>Confirm Password</label>
            <br />
            <input type="password" value={confirmPassword} onChange={(e)=>{
                setConfirmPassword(e.target.value)
            }} />
          </div>
          <div className="form-button-div">
            <button type="submit">Signup</button>
          </div>
        </form>
        
      </div>
    </div>
  )
}

export default Signup