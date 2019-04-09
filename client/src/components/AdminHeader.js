import React, { Component } from "react";

class AdminHeader extends Component {

    toggleModal = (e) => {
        let element = document.getElementById("update" + e.target.value + "Form");
        // let buttons = document.getElementsByClassName("headerButton");
        let forms = document.getElementsByClassName("updateForm");
        for (let i = 0; i < forms.length; i++) {
            forms[i].style.display = "none";
        }
        
        element.style.display = "contents";
        this.props.clearMessage();
        



    }
    render() {
        return (
            <div>
                <button className="logoutBtn" onClick={this.props.logout}>Logout</button>
                <select defaultValue={"Appointments"} onChange={this.toggleModal}>
                    <option>
                        Admin
               </option>
                    <option>
                        Appointments
                </option>
                    <option>
                        Bookings
                </option>
                    <option>
                        Services
                </option>
                </select>


            </div>
        );
    }

}

export default AdminHeader;