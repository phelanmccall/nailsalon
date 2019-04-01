import React, { Component } from "react";
import axios from "axios";

class AdminContols extends Component {
     timesArr = [
         "09:00AM",
         "09:30AM",
         "10:00AM",
         "10:30AM",
         "11:00AM",
         "11:30AM",
         "12:00PM",
         "12:30PM",
         "01:00PM",
         "01:30PM",
         "02:00PM",
         "02:30PM",
         "03:00PM",
         "03:30PM",
         "04:00PM",
         "04:30PM",
     ];

    state = {
        services: []
    }
    componentDidMount() {   
      
        axios.get("/services").then((response)=>{
            if(response.data.length){
                this.setState({
                    services: response.data
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    addBooking = (e) => {
        document.querySelectorAll('input[name=mycheckboxes]:checked');
    }

    addService = (e) => {
        e.preventDefault();
        console.log(e.target.service.value)
        axios.post("/services", {
            service: e.target.service.value,
            price: e.target.price.value
        }).then((response) => {
            console.log(response.data)
        })
        e.target.reset();

    }

    deleteService = (e) =>{
        e.preventDefault();
        axios.delete(`/services/${e.target.service.value}`).then((res)=>{
            console.log(res.data);
        })
    }
    updateService = (e) =>{
        e.preventDefault();
        let { service, price} = e.target;

        axios.put("/services", {service: service.value, price: price.value})
    }
    render() {
     
        return (
            <div>
                    <form onSubmit={this.addService}>
                        <label>Add Service</label><br/>
                        <label>Service</label>
                        <input name="service" required></input>
                        <label>Price</label>
                        <input name="price" required></input>
                        <input name="submit" type="submit" value="Submit" />
                    </form>
                    <form onSubmit={this.updateService}>
                        <label>Update Service</label><br/>
                        <label>Service</label>
                        <select name="service" required>
                            {
                                this.state.services.map((value, key)=>{
                                    return <option key={key}>
                                        {value.service}
                                    </option>
                                })
                            }
                        </select>
                        <label>Price</label>
                        <input name="price" required></input>
                        <input name="submit" type="submit" value="Update" />
                    </form>
                    <form onSubmit={this.deleteService}>
                        <label>Delete Service</label><br/>
                        <label>Service</label>
                        <select name="service" required>
                            {
                                this.state.services.map((value, key)=>{
                                    return <option key={key}>
                                        {value.service}
                                    </option>
                                })
                            }
                        </select>
                        <input name="submit" type="submit" value="Delete" />
                    </form>
                    <form onSubmit={this.addBooking}>
                        <label>Add a Booking</label><br/>
                        <label htmlFor="date">Date: </label>
                        <input type="date" name="date" min={new Date().toISOString().split("T")[0]} required /><br />
                        {
                            this.timesArr.map((val, key) => {
                                return <span key={key}><label>{val}</label><input type="checkbox" value={val} defaultChecked></input></span>
                            })
                        }
                        <input type="submit" name="submit" value="Add Booking(s)"></input>
                    </form>
                    <form onSubmit={this.deleteBooking}>
                        <label>Delete a Booking</label><br/>
                        <label htmlFor="date">Date: </label>
                        <input type="date" name="date" min={new Date().toISOString().split("T")[0]} required /><br />
                        {
                            this.timesArr.map((val, key) => {
                                return <span key={key}><label>{val}</label><input type="checkbox" value={val} defaultChecked></input></span>
                            })
                        }
                        <input type="submit" name="submit" value="Delete Booking(s)"></input>
                    </form>
            
            </div>
        );
    }
}

export default AdminContols;