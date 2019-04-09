import React, { Component } from "react";

class BookingsForms extends Component {
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
    render() {
        return (
            <span id="updateBookingsForm" className="updateForm">
                <form className="booking" onSubmit={this.props.addBooking}>
                    <label>Add a Booking</label><br />
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" min={new Date().toISOString().split("T")[0]} required /><br />
                    <label>Check All</label><input type="checkbox" onClick={function (e) {
                        var boxes = document.querySelectorAll("input[name=addBook]");
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
                <form className="booking" onSubmit={this.props.deleteBooking}>
                    <label>Delete a Booking</label><br />
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" onChange={this.props.getBookings} required /><br />
                    <label>Check All</label><input type="checkbox" onClick={function (e) {
                        var boxes = document.querySelectorAll("input[name=deleteBook]");
                        for (let i = 0; i < boxes.length; i++) {
                            boxes[i].checked = e.target.checked
                        }
                    }} defaultChecked></input><br />
                    {
                        this.props.bookings.map((val, key) => {
                            return <span key={key}><label>{val}</label><input type="checkbox" name="deleteBook" value={val} defaultChecked></input></span>
                        })
                    }
                    <br />
                    <input type="submit" name="submit" value="Delete Booking(s)"></input>
                </form>
           
            </span>
        );
    }

}

export default BookingsForms;