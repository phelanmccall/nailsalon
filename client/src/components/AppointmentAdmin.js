import React, { Component } from "react";

class AppointmentAdmin extends Component {

    render() {
        return (
            <span id="updateAppointmentsForm" className="updateForm">
                <table >
                    <thead>
                        <tr>
                            <th>Name: </th>
                            <th>Phone: </th>
                            <th>Date: </th>
                            <th>Time: </th>
                            <th>Confirmed: </th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                            this.props.appointments.map((val, key) => {
                                console.log(val)
                                let h = parseInt(val.time.slice(0,2));
                                let m = val.time.slice(3,5);
                                let end;
                                if(h > 12){
                                    end = "PM";
                                    h -= 12;
                                }else{
                                    end = "AM";
                                }
                                if(h < 10){
                                    h = "0" + h;
                                }
                                 
                                return <tr key={key}>
                                    <td>{val.name}</td>
                                    <td>{val.phone}</td>
                                    <td>{val.date}</td>
                                    <td>{h+":"+m+end}</td>
                                    <td>
                                        <button
                                            className="confirmButton"
                                            data-name={val.name}
                                            data-phone={val.phone}
                                            data-date={val.date}
                                            data-time={val.time}
                                            onClick={this.props.confirmAppointment}>{val.booked ? "Confirmed" : "Confirm"}</button>
                                        <button
                                            className="confirmButton"
                                            data-name={val.name}
                                            data-phone={val.phone}
                                            data-date={val.date}
                                            data-time={val.time}
                                            onClick={this.props.deleteAppointment}>Delete</button>

                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </span>
        );
    }

}

export default AppointmentAdmin;