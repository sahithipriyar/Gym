import { useState,useEffect } from "react"
import "./joiner.css"
import aerobic from "./images.jfif"
import cardio from "./cardio.jpg"
import weight from "./weight.jpg"
const Joiner=(props)=>{
    console.log(props)
    const [aero,setAero]=useState(0)
    const [cardi,setCardio]=useState(0)
    const [weigh,setWeigh]=useState(0)
    const [remAero,setRemAero]=useState(0)
    const[remCardi,setRemCardi]=useState(0)
    const [remWeigh,setRemWeigh]=useState(0)
    const [trainers,setTrainer]=useState([])
    const [appointedTrainer,setAppointedTrainer]=useState({trainer:""})
    console.log(appointedTrainer);
    const token = localStorage.getItem("authorization");
    if (token === null) {
      localStorage.setItem("authorization","")
    }
//fetch data trainer
    useEffect(()=>{
        fetch("https://gym-serverr.herokuapp.com/trainer",{
            method:"GET",
            headers:{
                "authorization": token,
            }
        }).then((res)=>
        res.json()
    ).then((data)=>{
        const filtered = data.filter(employee => {
            return employee.userType === 'Trainer';
          });
            setTrainer(filtered)
    }).catch((err)=>{
        console.log(err);
    })
    },[token])
    //fetch data Aerobics
    useEffect(()=>{
        fetch('https://gym-serverr.herokuapp.com/Aerobics', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})

  .then((response) => response.json())
  .then((data) => {
   data.map((item)=>{
    setRemAero(item.slot)
   })
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    },[token])
    //fetch data cardio
    useEffect(()=>{
        fetch('https://gym-serverr.herokuapp.com/cardio', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})

  .then((response) => response.json())
  .then((data) => {
   data.map((item)=>{
    setRemCardi(item.slot)
   })

    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    },[token])
    //fetch data weight_Lifting
    useEffect(()=>{
        fetch('https://gym-serverr.herokuapp.com/weigh', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((response) => response.json()).then((data) => {
   data.map((item)=>{
    setRemWeigh(item.slot)
   })
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    },[token])
    console.log(remAero)
    //Button for Booking Aerobics
    const handleAero=(e)=>{
        setAppointedTrainer({...appointedTrainer,trainer:e.target.value})
       if(remAero>=1){
       setAero(aero +1)
       setRemAero(remAero-1)
       }
       if(remAero===0){
        e.currentTarget.disabled =true
       }
      
       fetch('https://gym-serverr.herokuapp.com/Aerobics', {
        method: 'POST',
        headers: {
          "authorization":token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            appointedTrainer,remAero,aero
        }
        ),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
     
    }
  //button for booking Cardio
   const handleCardio=(e)=>{
    setAppointedTrainer({...appointedTrainer,trainer:e.target.value})
    if(remCardi>=1){
        setCardio(cardi+1)
    setRemCardi(remCardi-1)
    }
    if(remCardi===0){
        e.currentTarget.disabled = true
       }
       fetch('https://gym-serverr.herokuapp.com/cardio', {
        method: 'POST',
        headers: {
          "authorization":token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            appointedTrainer,remCardi,cardi
        }
        ),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
   }
   const handleCardioTrainer=(e)=>{
    setAppointedTrainer({...appointedTrainer,trainer:e.target.value});
   }
   const handleAeroTrainer=(e)=>{
    setAppointedTrainer({...appointedTrainer,trainer:e.target.value});
   }
   const handleWeighTrainer=(e)=>{
    setAppointedTrainer({...appointedTrainer,trainer:e.target.value});
   }
//button for booking Weight_lifting
   const handleWeigh=(e)=>{
    if(remWeigh>=1){
        setWeigh(weigh+1)
        setRemWeigh(remWeigh-1)
    }
    if(remWeigh===0){
        e.currentTarget.disabled = true
       }
       fetch('https://gym-serverr.herokuapp.com/weigh', {
        method: 'POST',
        headers: {
          "authorization":token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            appointedTrainer,remWeigh,weigh
        }
        ),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
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
        <h4>Remaining Slot {remAero}</h4>
        <h5 className="rem">Booked: {aero}</h5>
        <button className="btn" onClick={handleAero}>Book</button>
        <select onChange={handleAeroTrainer} className="select" placeholder="Trainer">
        {trainers.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <h5 className="tr">Trainer</h5>
        </div>
        <div className="card2">
        <h2 className="aer">CARDIO</h2>
        <img className="imgs" src={cardio} alt="aerobic"></img>
        <h3>2PM to 4PM</h3>
        <h4>Remaining slot:{remCardi}</h4>
        <h5 className="rem">Booked: {cardi}</h5>
        <button className="btn" onClick={handleCardio}>Book</button>
        <select onChange={handleCardioTrainer} className="select" placeholder="Trainer">
        {trainers.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <h5 className="tr">Trainer</h5>
        </div>
        <div className="card3">
        <h2 className="aer">Weight Lifting</h2>
        <img className="imgs" src={weight} alt="aerobic"></img>
        <h3>4PM to 6PM</h3>
        <h4>Remaining slot:{remWeigh}</h4>
        <h5 className="rem">Booked: {weigh}</h5>
        <button className="btn" onClick={handleWeigh}>Book</button>
        <select onChange={handleWeighTrainer} className="select" placeholder="Trainer">
        {trainers.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <h5 className="tr">Trainer</h5>
        </div>
      </div>
        </>
    )
}
export default Joiner