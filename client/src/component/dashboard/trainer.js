import { useState } from "react"
import "./trainer.css"
import aerobic from "./images.jfif"
import cardio from "./cardio.jpg"
import weight from "./weight.jpg"
const Trainer=(props)=>{
    const [aero,setAero]=useState(30)
    const [cardi,setCardi]=useState(30)
    const [weigh,setWeigh]=useState(30)
    console.log(props);
    const token = localStorage.getItem("authorization");
  if (token === null) {
    localStorage.setItem("authorization","")
  }
    
    return(
        <>
        <div className="nav">
            <h1 className="nv">{props.mainData.name}</h1>
        </div>
      <div className="container">
      <div className="card">
        <h2 className="aer">AEROBICS</h2>
        <img className="imgs" src={aerobic} alt="aerobic"></img>
        <h3>12PM to 2PM</h3>
        <h4>remaining</h4>
        <h5 className="rem">Booked: {aero}</h5>
        <button className="btn">Book</button>
        </div>
        <div className="card2">
        <h2 className="aer">CARDIO</h2>
        <img className="imgs" src={cardio} alt="aerobic"></img>
        <h3>2PM to 4PM</h3>
        <h4>remaining</h4>
        <h5 className="rem">Booked: {cardi}</h5>
        <button className="btn">Book</button>
        </div>
        <div className="card3">
        <h2 className="aer">Weight Lifting</h2>
        <img className="imgs" src={weight} alt="aerobic"></img>
        <h3>4PM to 6PM</h3>
        <h4>remaining</h4>
        <h5 className="rem">Booked: {weigh}</h5>
        <button className="btn">Book</button>
        </div>
      </div>
      
        </>
    )
}
export default Trainer