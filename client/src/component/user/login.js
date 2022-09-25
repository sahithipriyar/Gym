import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "./user.css"
const Login=(props)=>{
  const navigate=useNavigate()
  console.log(props);
    const[user,setUser]=useState({username:"",password:""})
    const [error,setError]=useState(false)
        const handleLogin = (e)=> {
fetch('https://gym-serverr.herokuapp.com/login', {
    method:"post",
    body: JSON.stringify({
                     username: user.username, password: user.password
              }),
    headers: {Authentication: 'Bearer Token', "Content-Type": "application/json"}
  })
     .then(resp => resp.json())
     .then((token)=>{
        localStorage.setItem("authorization",token.authoToken);
     }).catch((err)=>{
        setError(err)
     })
     let token =localStorage.getItem("authorization")
       if(token === null) {
         localStorage.setItem("authorization", "")
       } else{
         token = token
       }
     fetch("https://gym-serverr.herokuapp.com/details", {
        headers: {
            authorization: token,
          },           
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.userType);
        if(data.userType==="Joiner"){
          navigate("/joiner")
        }else{
          navigate("/trainer")
        }
        
      }).catch((err)=>{
        console.log(err);
      }); 
    }
    return(
        <>
        <h1 className="login">Login into Gym</h1>
        <div className="main_container">
            <div className="usr">
                <input type="text" placeholder="username" id="username" onChange={(e)=>{setUser({...user,username:e.target.value})}}/>
                <input placeholder="password" type="password" id="password" onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
            </div>
            <div>
            <button className="log" onClick={handleLogin}>Login</button>
            </div>
        </div>
        
        </>
    )
}
export default Login