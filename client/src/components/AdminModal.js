import React, { Component } from "react";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";
import AdminControls from "../components/AdminControls";

class AdminModal extends Component {
    state = {
        user: null,
        err: null
    }
    componentDidMount() {
        axios.get("/login").then((response) => {
            console.log(response.data)
            if (response.data.username) {
                this.setState({
                    user: response.data
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    logout = (e) =>{
        e.preventDefault();
        axios.get("/logout").then((res)=>{
            this.setState({
                user: null
            })
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        if (username.length && password.length) {
            axios.post("/login", {
                username: username,
                password: password
            }).then((response) => {
                console.log(response.data)
                if (response.data.username  ) {
                    this.setState({
                        user: response.data,
                        err: false
                    });
                }
            }).catch((err) => {
                console.log(err)
                this.setState({
                    err: true
                })
            })
        } else {
            this.setState({
                err: true
            })
        }
    }
    render() {

        return (
            <div className="modal" id="adminModal">

                <div className="modal-content">
                    <button className="close" onClick={(e) => {
                        e.target.parentNode.parentNode.style.display = "none";
                    }}>&times;</button>
                    {
                        this.state.user ?  <AdminHeader logout={this.logout}/> : <span></span>
                    }
                    {
                        this.state.user ? <AdminControls /> : 
                        <form id="loginForm" >
                            {this.state.err ? <span className="alertText">There was an error</span> : <span></span>}
                            <br/>
                            <label htmlFor="username">Username</label>
                            <input id="username" name="usernmame"></input><br/>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password"></input>
                            
                            <input type="submit" name="submit" onClick={this.handleSubmit} value="login"></input>
                        </form>
                    }
                </div>
            </div>
        );
    }
}

export default AdminModal;