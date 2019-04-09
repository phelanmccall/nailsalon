import React, {Component} from "react";

class AdminUpdate extends Component {
   
    render() {
        
        return (

            <span id="updateAdminForm" className="updateForm">
                <form className="admin"  onSubmit={function(e){
                    console.log("ASDASDASDASD")
                }}>
                    <label>Address: </label>
                    <input name="address"></input><br />
                    <label>Phone: </label>
                    <input name="phone"></input><br />
                    <label>Button1: </label>
                    <input name="button1"></input><br />
                    <label>Button2: </label>
                    <input name="button2"></input><br />
                    <label>Button3: </label>
                    <input name="button3"></input><br />
                    <label>API: </label>
                    <input name="api"></input><br />
                    <input type="submit" name="submit" value="Submit"></input>
                </form>
            </span>
        );
    }

}

export default AdminUpdate;