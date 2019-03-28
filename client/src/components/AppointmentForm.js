import React, { Component } from 'react';

class AppointmentForm extends Component {


    render() {

        return (
            <div className="modal-content">
            <span className="close">&times;</span>
            <form id="apptForm" >
              <label htmlFor="date">Date:</label>
              <input type="date" name="date" min={new Date().toISOString().split("T")[0]} required /><br />
              <label htmlFor="timeslot">Time:</label>
              <select name="timeslot" required>
                <option value="9AM">9AM</option>
                <option value="11AM">11AM</option>
                <option value="1PM">1PM</option>
                <option value="3PM">3PM</option>
              </select><br />
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" required /><br />
              <label htmlFor="tel">Phone#:</label>
              <input type="tel" name="phone" required /><br />
                <input type="submit" value="Submit" />
            </form>
            </div>
        );

    }
} 

export default AppointmentForm;