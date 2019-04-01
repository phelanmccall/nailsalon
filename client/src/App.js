import React, { Component } from 'react';
import logo from './assets/images/logo.png';
import './App.css';
import directions from "./assets/images/directions.jpg";
import appointments from "./assets/images/appointments.jpg"
import services from "./assets/images/services.jpg"
import CustomButton from "./components/CustomButton"
import AppointmentForm from "./components/AppointmentForm";
import DirectionsModal from "./components/DirectionsModal";
import ServicesModal from "./components/ServicesModal";
import AdminModal from "./components/AdminModal";
import axios from 'axios';

class App extends Component {

  componentDidMount() {
    
  }
  

  handleClick = (e) => {
   if(document.getElementById("adminModal").style.display !== "block"){
    console.log(e.target.id);
    console.log(e.target.alt)
    var target;
    if(e.target.id){
      target = e.target.id;
    }else if(e.target.alt)  {
      target = e.target.alt;
    }else{
      target = e.target.innerHTML.toLowerCase();
      console.log(e.target);
    }
    console.log(document.getElementById(target+"Modal"))
    document.getElementById(target+"Modal").style.display = document.getElementById(target + "Modal").style.display === "block" ? "none" : "block";
  
   }
  }
  render() {
    return (
      <div className="App">
     
        <header>
          <img id="logo" src={logo} alt="logo"></img>
          <address id="address">
                        Nail Salon
                        123 Fake St.<br/>
                        Anywhere, CA 90210
            </address>
                    <br/>
            <a id="phone" href="tel:+18475555555">1-847-555-5555</a>
        </header>


          <AppointmentForm />

          <ServicesModal />
        
          <DirectionsModal />

          <AdminModal />

        <div id="section">
          <section>
            <div>
              <CustomButton 
                id="appointments"
                onClick={this.handleClick}
                src={appointments}
                alt="appointments"
                text="Appointments"
              />

              <CustomButton
                id="services"
                onClick={this.handleClick}
                src={services}
                alt="services"
                text="Services"
              />
              <CustomButton 
                id="directions"
                onClick={this.handleClick}
                src={directions}
                alt="directions"
                text="Directions"
              />

            
            </div>
          </section>

        </div>

        <footer className="navbar fixed-bottom justify-content-center w-100 bg-secondary text-white border-info border-top">
          <small>Copyright &copy;</small>
          <small><div id="admin" onClick={this.handleClick}>Admin</div></small>
        </footer>


      </div>
    );
  }
}

export default App;
