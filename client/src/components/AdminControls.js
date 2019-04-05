import React, { Component } from "react";
import axios from "axios";
import AppointmentAdmin from "../components/AppointmentAdmin";
import ServiceForms from "../components/ServiceForms";
import BookingsForms from "../components/BookingsForms"

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
        message: "",
        services: [],
        bookings: [],
        booked: [],
        appointments: []
    }
    componentDidMount() {

     this.getServices();
     
     this.getAppointments();
   
    }

   
    getAppointments = (e) => {
        axios.get("/appointments").then((res) => {
            if (res.data.length && typeof res.data === "object") {
                console.log(res.data);
                this.setState({
                    appointments: res.data
                })
            }
        })
    }

    confirmAppointment = (e) => {
        e.preventDefault();
        console.log(e.target.attributes);
        
        axios.put("/appointments",
        {
            name: e.target.attributes["data-name"].value,
            phone: e.target.attributes["data-phone"].value,
            date: e.target.attributes["data-date"].value,
            time: e.target.attributes["data-time"].value,
            delete: false
        }).then((res)=>{
            console.log(res.data)
            this.setState({
                message: res.data
            }, () => {
                this.getAppointments();
            })
        })
    }

    deleteAppointment = (e) => {
        e.preventDefault();
        console.log(e.target.attributes);
        
        axios.put("/appointments",
        {
            name: e.target.attributes["data-name"].value,
            phone: e.target.attributes["data-phone"].value,
            date: e.target.attributes["data-date"].value,
            time: e.target.attributes["data-time"].value,
            delete: true
        }).then((res)=>{
            console.log(res.data)
            this.setState({
                message: res.data
            }, () => {
                this.getAppointments();
            })
        })
    }
 
    getBooked = (e) => {
        e.preventDefault();
        axios.get(`/bookings/${e.target.value}`).then((response) => {
            let booked = response.data.reduce((array, val, key) => {
                if (!val.booked) {
                    array.push(val);
                }
                return array;
            }, []);
            this.setState({
                booked: booked
            })

        });
    }

    getBookings = (e) => {
        e.preventDefault();
        axios.get(`/bookings/${e.target.value}`).then((response) => {
            console.log(response.data);
            this.setState({
                bookings: response.data
            })
        });

    }

    confirmBookings = (e) => {
        e.preventDefault();
        var times = Array.from(document.querySelectorAll('input[name=confirmBook]:checked'), (val, key) => {
            return val.value;
        });
        console.log(times);
        if (times.length) {
            axios.put(`/bookings/${e.target.date.value}`,
                { time: times }).then((res) => {

                    this.setState({
                        booked: [],
                        message: res.data
                    });

                })
        }
        e.target.reset();
    }

    addBooking = (e) => {
        e.preventDefault();
        var times = Array.from(document.querySelectorAll('input[name=addBook]:checked'), (val, key) => {
            return val.value;
        });
        console.log(times);
        if (times.length) {
            axios.post(`/bookings`, {
                date: e.target.date.value,
                time: times
            }).then((response) => {
                this.setState({
                    bookings: [],
                    message: response.data
                })
            });
            e.target.reset();
        }else{
            this.setState({
                message: "No times selected."
            })
        }
        
    }

    deleteBooking = (e) => {
        e.preventDefault();
        var times = Array.from(document.querySelectorAll('input[name=deleteBook]:checked'), (val, key) => {
            return val.value;
        });
        if (times.length) {
            axios.put(`/bookings`, {
                date: e.target.date.value,
                time: times
            }).then((res) => {
                this.setState({
                    bookings: [],
                    message: res.data
                })
            });

            e.target.reset();
        }


    }
    getServices =(e) => {
        axios.get("/services").then((response) => {
            if (response.data.length) {
                this.setState({
                    services: response.data
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    addService = (e) => {
        e.preventDefault();
        console.log(e.target.service.value)
        axios.post("/services", {
            service: e.target.service.value,
            price: e.target.price.value
        }).then((res) => {
            this.setState({
                message: res.data
            })
        })
        e.target.reset();

    }

    deleteService = (e) => {
        e.preventDefault();
        axios.delete(`/services/${e.target.service.value}`).then((res) => {
            this.setState({
                message: res.data
            })
        })
    }
    updateService = (e) => {
        e.preventDefault();
        let { service, price } = e.target;

        axios.put("/services", { service: service.value, price: price.value }).then((res)=>{
            this.setState({
                message: res.data
            })
        })
    }
    render() {
        console.log(typeof this.state.appointments)
        console.log(this.state.appointments)
        return (
            <div>
                <span className="alertText">{typeof this.state.message === "string" ? this.state.message : ""}</span>
                <div id="adminControl">
                    
                    <ServiceForms 
                        services={this.state.services}
                        addService={this.addService}
                        deleteService={this.deleteService}
                        updateService={this.updateService}
                    />
                   <BookingsForms 
                    addBooking={this.addBooking}
                    deleteBooking={this.deleteBooking}
                    bookings={this.state.bookings}
                    timesArr={this.timesArr}
                   />
                   <AppointmentAdmin 
                    appointments={this.state.appointments}
                    confirmAppointment={this.confirmAppointment}
                    deleteAppointment={this.deleteAppointment}
                    />
                 </div>

            </div>
        );
    }
}

export default AdminContols;