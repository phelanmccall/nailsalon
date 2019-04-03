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
        message: "",
        services: [],
        bookings: [],
        booked: [],
        appointments: []
    }
    componentDidMount() {

        axios.get("/services").then((response) => {
            if (response.data.length) {
                this.setState({
                    services: response.data
                })
            }
        }).catch((err) => {
            console.log(err);
        })
        axios.get("/appointments").then((response) => {
            if (response.data.length) {
                this.setState({
                    appointments: response.data
                })
            }
        }).catch((err) => {
            console.log(err);
        })
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

    getAppointments = (e) => {
        axios.get("/appointments").then((res) => {
            if (res.data.lenth && typeof res.data === "object") {
                console.log(res.data);
                this.setState({
                    appointments: [...res.data]
                })
            }
        })
    }

    confirmAppointment = (e) => {

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
                e.target.reset();
            });
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

    deleteService = (e) => {
        e.preventDefault();
        axios.delete(`/services/${e.target.service.value}`).then((res) => {
            console.log(res.data);
        })
    }
    updateService = (e) => {
        e.preventDefault();
        let { service, price } = e.target;

        axios.put("/services", { service: service.value, price: price.value })
    }
    render() {
        return (
            <div>
                <span>{this.state.message}</span>
                <div id="adminControl">
                    <form className="service" onSubmit={this.addService}>
                        <label>Add Service</label><br />
                        <label>Service</label>
                        <input name="service" required></input>
                        <label>Price</label>
                        <input name="price" required></input>
                        <input name="submit" type="submit" value="Submit" />
                    </form>
                    <form className="service" onSubmit={this.updateService}>
                        <label>Update Service</label><br />
                        <label>Service</label><br />
                        <select name="service" required>
                            {
                                this.state.services.map((value, key) => {
                                    return <option key={key}>
                                        {value.service}
                                    </option>
                                })
                            }
                        </select><br />
                        <label>Price</label>
                        <input name="price" required></input><br />
                        <input name="submit" type="submit" value="Update" />
                    </form>
                    <form className="service" onSubmit={this.deleteService}>
                        <label>Delete Service</label><br />
                        <label>Service</label><br />
                        <select name="service" required>
                            {
                                this.state.services.map((value, key) => {
                                    return <option key={key}>
                                        {value.service}
                                    </option>
                                })
                            }
                        </select><br />
                        <input name="submit" type="submit" value="Delete" />
                    </form>
                    <form className="booking" onSubmit={this.addBooking}>
                        <label>Add a Booking</label><br />
                        <label htmlFor="date">Date: </label>
                        <input type="date" name="date" min={new Date().toISOString().split("T")[0]} required /><br />
                        <label>Check All</label><input type="checkbox" onClick={function (e) {
                            var boxes = document.querySelectorAll("input[name=addBook");
                            for (let i = 0; i < boxes.length; i++) {
                                boxes[i].checked = e.target.checked
                            }
                        }} defaultChecked></input><br />
                        {
                            this.timesArr.map((val, key) => {
                                return <span key={key}><label>{val}</label><input type="checkbox" name="addBook" value={val} defaultChecked></input></span>
                            })
                        }
                        <br />
                        <input type="submit" name="submit" value="Add Booking(s)"></input>
                    </form>
                    <form className="booking" onSubmit={this.deleteBooking}>
                        <label>Delete a Booking</label><br />
                        <label htmlFor="date">Date: </label>
                        <input type="date" name="date" onChange={this.getBookings} required /><br />
                        <label>Check All</label><input type="checkbox" onClick={function (e) {
                            var boxes = document.querySelectorAll("input[name=deleteBook");
                            for (let i = 0; i < boxes.length; i++) {
                                boxes[i].checked = e.target.checked
                            }
                        }} defaultChecked></input><br />
                        {
                            this.state.bookings.map((val, key) => {
                                return <span key={key}><label>{val.time}</label><input type="checkbox" name="deleteBook" value={val.time} defaultChecked></input></span>
                            })
                        }
                        <br />
                        <input type="submit" name="submit" value="Delete Booking(s)"></input>
                    </form>
                    {/* <form onSubmit={this.confirmBookings}>
                        <label>Confirm Bookings</label>
                        <label>Date</label>
                        <input type="date" name="date" min={new Date().toISOString().split("T")[0]} onChange={this.getBooked} required /><br />
                        <label>Check All</label><input type="checkbox" onClick={function(e){
                            var boxes = document.querySelectorAll("input[name=confirmBook");
                            for(let i = 0; i < boxes.length; i++){
                                boxes[i].checked = e.target.checked
                            }
                        }} defaultChecked></input>
                        {
                            this.state.booked.reduce((array, val, key) => {
                                console.log(val.booked);
                                if(!val.booked){
                                    array.push(<span key={key}><label>{val.time}</label><input type="checkbox" name="confirmBook" value={val.time} defaultChecked></input></span>)
                                }

                                return array;
                            }, [])
                        }
                        <input type="submit" value="submit"></input>
                    </form> */}
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.appointments.map((val, key) => {
                                    return <tr>
                                        <td>{val.name}</td>
                                        <td>{val.phone}</td>
                                        <td>{val.date}</td>
                                        <td>{val.time}</td>
                                        <td>false</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default AdminContols;