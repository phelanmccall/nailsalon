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
    axios.get("/appointment/"+ e.target.value, {
      headers:{
        Accept: "data"
      }
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          availableAppointments: res.data.map(function(value){
            return value.time;
          })
        })
      })
  }
  handleSubmit(e){
    console.log(e);
    e.preventDefault();
    axios.post("/appointment", {
      date: e.target.date.value,
      timeslot: e.target.timeslot.value,
      name: e.target.name.value,
      phone: e.target.phone.value
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
            <span id="apptStatus"></span><br/>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" required /><br />
            <label htmlFor="tel">Phone: </label>
            <input type="tel" name="phone" required /><br />
            <label htmlFor="date">Date: </label>
            <input type="date" name="date" min={new Date().toISOString().split("T")[0]} onChange={this.handleChangeDate} required /><br />
            <label htmlFor="timeslot">Time: </label>
            <select name="timeslot" required>
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