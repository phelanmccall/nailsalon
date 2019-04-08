import React, { Component } from 'react';
import axios from "axios";
class AppointmentForm extends Component {

  state = {
    availableAppointments: [

    ]
  }
  componentDidMount() {

  }
  handleChangeDate = (e) =>{
    console.log(e.target.value)
    axios.get("/appointments/"+ e.target.value, {
      headers:{
        Accept: "data"
      }
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          availableAppointments: res.data.map(function(value){
            return value.time;
          }).map((val, key)=>{
            let hour = parseInt(val.slice(0, 2));
            let min = val.slice(3,5);
            let end;
            if(hour > 12){
                hour = hour - 12;
                if(hour < 10){
                    hour = "0"+ hour;
                }
                end = "PM";
            }else if(hour === 12){
                end = "PM";
            }else if(hour < 12){
                if(hour < 10){
                    hour = "0"+ hour;
                }
                end = "AM";
            }
            console.log(hour + ":" + min + end)
            return hour + ":" + min + end;
       
          })
        }, function(){
          if(!this.state.availableAppointments.length){
            document.getElementById("apptStatus").innerHTML = "No appointments available."
          }else{
            document.getElementById("apptStatus").innerHTML = "";
          }
        })
      })
  }
  handleSubmit(e){
    console.log(Object.keys(e.target));
    let {date, time, name, phone} = e.target;
    e.preventDefault();
    let h = parseInt(time.value.slice(0,2));
    let m = time.value.slice(3, 5);
    if(h < 12){
      h = h +12;
    }
    if(h < 10){
      h = "0" + h;
    }
    let convertedTime = h + ":" + m + ":00"; 
    axios.post("/appointments", {
      date: date.value,
      time: convertedTime,
      name: name.value,
      phone: phone.value
    },
    {
      headers:{
        Accept: "text/plain; charset=utf-8"
      }
    }).then(function(res){
      console.log(document.getElementById("apptStatus"));
      
      document.getElementById("apptStatus").innerHTML = res.data;
    }).catch(function(err){
      console.log(err);
      document.getElementById("apptStatus").innerHTML = err;

    });

    e.target.reset();

  }
  render() {

    return (
      <div className="modal" id="appointmentsModal">

        <div className="modal-content"  >
          <button className="close" onClick={function(e){
            e.target.parentNode.parentNode.style.display ="none";
          }}>&times;</button>
          <form id="apptForm" onSubmit={this.handleSubmit} onReset={() =>{
            this.setState({
              availableAppointments: []
            })
          }}>
            <span id="apptStatus" className="alertText"></span><br/>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" placeholder="Name" required /><br />
            <label htmlFor="tel">Phone: </label>
            <input type="tel" name="phone" placeholder="##########" pattern="[0-9]{10}" required/><br />
            <label htmlFor="date">Date: </label>
            <input type="date" name="date" min={new Date().toISOString().split("T")[0]} onChange={this.handleChangeDate} required /><br />
            <label htmlFor="time">Time: </label>
            <select name="time" required>
            {
            this.state.availableAppointments.map(function(value, key){
              return <option value={value} key={key} >{value}</option>
            })
          }</select> <br/>
            
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );

  }
}

export default AppointmentForm;