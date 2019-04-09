import React, { Component } from "react";
import axios from "axios";
import AppointmentAdmin from "../components/AppointmentAdmin";
import ServiceForms from "../components/ServiceForms";
import BookingsForms from "../components/BookingsForms"
import AdminHeader from "../components/AdminHeader";
import AdminUpdate from "../components/AdminUpdate";

class AdminContols extends Component {

    state = {
        message: "",
        services: [],
        bookings: [],
        booked: [],
        appointments: []
    }

    timeout = "";

    componentDidMount() {

        this.getServices();

        this.getAppointments();

    }

    convertTime = (val, key) => {
        let hour = parseInt(val.value.slice(0, 2));
        let min = val.value.slice(3, 5);
        let end = val.value.slice(5);

        if(end === "PM" && hour < 12){
            hour = hour + 12;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }

        console.log(hour + ":" + min)
        return hour + ":" + min + ":00";
    }

    getAppointments = (e) => {
        axios.get("/appointments").then((res) => {
          
                console.log(res.data);
                this.setState({
                    appointments: res.data
                })
            
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
            }).then((res) => {
                console.log(res.data)
                this.getAppointments();

                this.setState({
                    message: res.data
                }, () => {
                    
                    this.resetMessage();
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
            }).then((res) => {
                console.log(res.data)
                this.getAppointments();

                this.setState({
                    message: res.data
                }, () => {
                    this.resetMessage();
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
            let newData = response.data.map((val, key) => {
                return val.time;
            }).map((val, key) => {
                let hour = parseInt(val.slice(0, 2));
                let min = val.slice(3, 5);
                let end;
                if (hour > 12) {
                    hour = hour - 12;
                    if (hour < 10) {
                        hour = "0" + hour;
                    }
                    end = "PM";
                } else if (hour === 12) {
                    end = "PM";
                } else if (hour < 12) {
                    if (hour < 10) {
                        hour = "0" + hour;
                    }
                    end = "AM";
                }
                console.log(hour + ":" + min + end)
                return hour + ":" + min + end;
            })

            console.log(newData);

            this.setState({
                bookings: newData
            })
        });

    }

    // confirmBookings = (e) => {
    //     e.preventDefault();
    //     var times = Array.from(document.querySelectorAll('input[name=confirmBook]:checked'), (val, key) => {
    //         return val.value;
    //     });
    //     console.log(times);
    //     if (times.length) {
    //         axios.put(`/bookings/${e.target.date.value}`,
    //             { time: times }).then((res) => {

    //                 this.setState({
    //                     booked: [],
    //                     message: res.data
    //                 }, this.resetMessage);



    //             })
    //     }
    //     e.target.reset();
    // }

    addBooking = (e) => {
        e.preventDefault();
        var times = Array.from(document.querySelectorAll('input[name=addBook]:checked'), this.convertTime);
        console.log(times);
        if (times.length) {
            axios.post(`/bookings`, {
                date: e.target.date.value,
                time: times
            }).then((response) => {
                this.setState({
                    bookings: [],
                    message: response.data
                }, this.resetMessage)


            });
            e.target.reset();
        } else {
            this.setState({
                message: "No times selected."
            }, this.resetMessage)
        }

    }

    deleteBooking = (e) => {
        e.preventDefault();
        var times = Array.from(document.querySelectorAll('input[name=deleteBook]:checked'), this.convertTime);
        console.log(times);
        if (times.length) {
            axios.put(`/bookings`, {
                date: e.target.date.value,
                time: times
            }).then((res) => {
                this.setState({
                    bookings: [],
                    message: res.data
                }, this.resetMessage)


            });

            e.target.reset();
        }


    }
    getServices = (e) => {
        axios.get("/services").then((response) => {
            if (response.data) {
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
            }, this.resetMessage);
            this.getServices();
            
        })
        e.target.reset();

    }

    deleteService = (e) => {
        e.preventDefault();
        axios.delete(`/services/${e.target.service.value}`).then((res) => {
            this.setState({
                message: res.data
            }, () => {
                this.getServices();
                this.resetMessage();
            })

        })
    }
    clearMessage = () => {
        this.setState({
            message: ""
        })
    }

    resetMessage = () => {
      if(this.timeout){
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({
                message: ""
            })
        }, 5000)
      }else{
        this.timeout = setTimeout(() => {
            this.setState({
                message: ""
            })
        }, 5000)
      }
    }
    updateService = (e) => {
        e.preventDefault();
        let { service, price } = e.target;
        console.log(service + " " + price);
        axios.put("/services", { service: service.value, price: price.value }).then((res) => {
            this.setState({
                message: res.data
            }, this.resetMessage)
            this.getServices();

        })
        e.target.reset();
    }

    updateBusiness = (e) => {
        e.preventDefault();
        console.log("ASDASDADASDASDASKERKAEGKWOK")
        const { address, phone , button1, button2, api} = e.target;
        let newInfo = {
            address: address.value,
            phone: phone.value,
            button1: button1.value,
            button2: button2.value,
            api: api.value
        }
        console.log(newInfo)
        axios.put("/info", newInfo).then((res) => {
            console.log(this.props.getBusiness)
            this.setState({
                message: res.data
            }, this.resetMessage)
            this.props.getBusiness();

        }).catch((err)=>{
            this.setState({
                message: err
            }, this.resetMessage);
        })
        e.target.reset();

    }
    render() {

        return (
            <div>
                <AdminHeader logout={this.props.logout} clearMessage={this.clearMessage} />
                <span className="alertText">{typeof this.state.message === "string" ? this.state.message : ""}</span>
                <div id="adminControl">
                    <AdminUpdate
                        updateBusiness={this.updateBusiness}
                    />
                    <ServiceForms
                        services={this.state.services}
                        addService={this.addService}
                        deleteService={this.deleteService}
                        updateService={this.updateService}
                    />
                    <BookingsForms
                        getBookings={this.getBookings}
                        addBooking={this.addBooking}
                        deleteBooking={this.deleteBooking}
                        bookings={this.state.bookings}
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