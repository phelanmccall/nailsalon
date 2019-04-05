import React, { Component } from "react";
import axios from "axios";

class BookingsForms extends Component {

    render() {
        return (
            <span>
                <form className="booking" onSubmit={this.props.addBooking}>
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
                        this.props.timesArr.map((val, key) => {
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
                        var boxes = document.querySelectorAll("input[name=deleteBook");
                        for (let i = 0; i < boxes.length; i++) {
                            boxes[i].checked = e.target.checked
                        }
                    }} defaultChecked></input><br />
                    {
                        this.props.bookings.map((val, key) => {
                            return <span key={key}><label>{val.time}</label><input type="checkbox" name="deleteBook" value={val.time} defaultChecked></input></span>
                        })
                    }
                    <br />
                    <input type="submit" name="submit" value="Delete Booking(s)"></input>
                </form>
                {/* <form onSubmit={this.props.confirmBookings}>
                        <label>Confirm Bookings</label>
                        <label>Date</label>
                        <input type="date" name="date" min={new Date().toISOString().split("T")[0]} onChange={this.props.getBooked} required /><br />
                        <label>Check All</label><input type="checkbox" onClick={function(e){
                            var boxes = document.querySelectorAll("input[name=confirmBook");
                            for(let i = 0; i < boxes.length; i++){
                                boxes[i].checked = e.target.checked
                            }
                        }} defaultChecked></input>
                        {
                            this.props.booked.reduce((array, val, key) => {
                                console.log(val.booked);
                                if(!val.booked){
                                    array.push(<span key={key}><label>{val.time}</label><input type="checkbox" name="confirmBook" value={val.time} defaultChecked></input></span>)
                                }

                                return array;
                            }, [])
                        }
                        <input type="submit" value="submit"></input>
                    </form> */}
            </span>
        );
    }

}

export default BookingsForms;