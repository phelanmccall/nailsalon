import React, { Component } from 'react';

class AppointmentForm extends Component {

  state = {
    availableAppointments: [
      
    ]
  }
  componentDidMount() {

  }
  handleChangeDate(){

  }
  render() {

    return (
      <div className="modal" id="appointmentsModal">

        <div className="modal-content"  >
          <button className="close" onClick={function(e){
            e.target.parentNode.parentNode.style.display ="none";

          }}>&times;</button>
          <form id="apptForm" onSubmit={function(e){
            e.preventDefault();
            console.log(e.target.date.value)
          }}>
            <label htmlFor="date">Date: </label>
            <input type="date" name="date" min={new Date().toISOString().split("T")[0]} required /><br />
            <label htmlFor="timeslot">Time: </label>
            <select name="timeslot">
            {
            this.state.availableAppointments.map(function(value, key){
              return <option value={value} key={key} >{value}</option>
            })
          }</select> <br/>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" required /><br />
            <label htmlFor="tel">Phone#: </label>
            <input type="tel" name="phone" required /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );

  }
}

export default AppointmentForm;