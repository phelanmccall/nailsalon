import React, { Component } from "react";
import axios from "axios";
class AdminModal extends Component {

    handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("/login", {
            username:e.target.username,
            password: e.target.password
        }).then(function(response){
            console.log(response.data)
        }).catch(function(err){
            console.log(err)
        })
    } 
    render() {

        return (
            <div className="modal" id="adminModal">

                <div className="modal-content">
                    <button className="close" onClick={function (e) {
                        e.target.parentNode.parentNode.style.display = "none";
                    }}>&times;</button>


                    <form id="loginForm" >
                        <label for="username">Username</label>
                        <input name="usernmame"></input><br/>
                        <labe for="password">Password</labe>
                        <input type="password" name="password"></input>
                        
                        <input type="submit" name="submit" onClick={this.handleSubmit} value="login"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default AdminModal;