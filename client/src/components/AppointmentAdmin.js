import React, {Component} from "react";

class AppointmentAdmin extends Component {

    render() {
        return (
            <table>
            <thead>
                <tr>
                    <th>
                        Name:
                </th>
                    <th>
                        Phone:
                </th>
                    <th>
                        Date:
                </th>
                    <th>
                        Time:
                </th>
                    <th>
                        Confirmed:
                </th>
                <th>

                </th>
                </tr>
            </thead>
            <tbody>
                
                {
                    
                    this.props.appointments.map((val, key) => {
                        console.log(val)
                        return <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.phone}</td>
                            <td>{val.date}</td>
                            <td>{val.time}</td>
                            <td>
                                <button 
                                    className="confirmButton"
                                    data-name={val.name}
                                    data-phone={val.phone}
                                    data-date={val.date}
                                    data-time={val.time ? val.time : "NODATA"}
                            onClick={this.props.confirmAppointment}>{val.booked ? "Confirmed" : "Confirm"}</button>
                                <button 
                                    className="confirmButton"
                                    data-name={val.name}
                                    data-phone={val.phone}
                                    data-date={val.date}
                                    data-time={val.time ? val.time : "NODATA"}
                            onClick={this.props.deleteAppointment}>Delete</button>
                            
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
   
        );
    }

}

export default AppointmentAdmin;