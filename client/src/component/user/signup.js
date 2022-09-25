import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css"
const Signup = () => {
    const navigate=useNavigate()
    const [signupState, setSignupState] = useState({});
    const [err,setError]=useState({})
    const signUpFormData = [{ attr: "name", type: "text", id: "name", label: "Name:" }, { attr: "phoneNumber", type: "text", id: "phoneNumber", label: "Mobile Number:" }, { attr: "address", type: "text", id: "address", label: "Address:" }, { attr: "age", type: "text", id: "age", label: "Age:" }, { attr: "username", type: "text", id: "username", label: "Username:" },
    { attr: "password", type: "password", id: "password", label: "Password:" }]
    const radioData=[{attr: "userType", type: "radio", id:"userType", value:"Trainer", label: "Trainer:"},{attr:"userType",type:"radio",id:"userType",value:"Joiner",label:"Joiner"}]
    const handleUserAdd = ()=> {
        
        console.log(signupState);
        fetch("https://gym-serverr.herokuapp.com/signup", {
            method: "post",
            body: JSON.stringify({
               signupState
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {

        }).catch((err) => {
            console.log(err);
            setError(err)
        })
        navigate("/login")
       
    }

    const handleInputChange = (e, id)=> {
        if(id === "phoneNumber") {
            e.target.value = parseInt(e.target.value);
        }
        setSignupState({...signupState, [id]: e.target.value})

    }
    const handleRoute=()=>{
        navigate("/login")
    }
    return (
        <>
        <h1 className="signup">Signup To Gym</h1>
            <div className="sign">
                <form>
                    {signUpFormData.map((formKey)=> {
                        return (
                            <div>
                                <div>
                                    <label className="lb" for={formKey.id}>{formKey.label}</label>
                                </div>
                                <div>
                                    <input  className="lb"type={formKey.type} id={formKey.id} onChange={(e)=> {handleInputChange(e,formKey.id)}}/>
                                </div>
                            </div>
                        )
                    })}
                </form>
                <form>
                {radioData.map((formKey)=> {
                        return (
                            <div>
                                <div>
                                    <label className="rd" for={formKey.id}>{formKey.label}</label>
                                </div>
                                <div>
                                    <input className="rad" type={formKey.type} value={formKey.value} onChange={(e)=> {handleInputChange(e,formKey.id)}}/>
                                </div>
                            </div>
                        )
                    })}
                </form>
               
                <button className="add" type="button" onClick={handleUserAdd}>Submit</button>
                <button  className="add" onClick={handleRoute}>Login</button>
            </div>
            {/* {
                err.map((e)=>{
                    return (
                        <>
                            
                        </>
                    )
                })
            } */}
        </>
    )
}
export default Signup