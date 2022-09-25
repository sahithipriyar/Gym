import {BrowserRouter,Route,Routes} from "react-router-dom" 
import { useState,useEffect } from "react";
import Login from "./component/user/login";
import Signup from "./component/user/signup";
import Joiner from "./component/dashboard/joiner";
import Trainer from "./component/dashboard/trainer";
function App() {
  const [mainData, setMainData] = useState([])

  
  let token =localStorage.getItem("authorization")
console.log(token);
  if(token === null) {
    localStorage.setItem("authorization", "")
  } else{
    token = token
  }




  useEffect(() => {
    fetch(" https://gym-serverr.herokuapp.com/details", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMainData(data);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup mainData={mainData}/>}></Route>
      <Route path="/login" element={<Login mainData={mainData}/>}></Route>
      <Route path="/joiner" element={<Joiner mainData={mainData}/>}></Route>
      <Route path="/trainer" element={<Trainer mainData={mainData}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
