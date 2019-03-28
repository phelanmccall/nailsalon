import React, { Component } from 'react';
import logo from './assets/images/logo.png';
import './App.css';
import directions from "./assets/images/app-car-charging-33488.jpg";
import appointments from "./assets/images/beautiful-cleaning-fashion-332046.jpg"
import AppointmentForm from "./components/AppointmentForm";
import DirectionsModal from "./components/DirectionsModal";

class App extends Component {

  componentDidMount() {

  }

  handleClick = (e) => {
    console.log(e.target.id);
    console.log(e.target.alt)
    var target;
    if(e.target.id){
      target = e.target.id;
    }else{
      target = e.target.alt;
    }
    console.log(document.getElementById(target+"Modal"))
    document.getElementById(target+"Modal").style.display = document.getElementById(target + "Modal").style.display === "block" ? "none" : "block";
  }
  render() {
    return (
      <div className="App">

        <header>
          <img id="logo" src={logo} alt="logo"></img>
        </header>


          <AppointmentForm />

        
          <DirectionsModal />
       
        <div id="section">
          <section>
            <div>
              <button id="appointments" onClick={this.handleClick}>
                <img src={appointments} alt="appointments" />
                <div>Appointments</div>
              </button>

              <button id="directions" onClick={this.handleClick}>
                <img src={directions} alt="directions" />
                <div>Directions</div>
              </button>
            </div>
          </section>

        </div>

        <footer className="navbar fixed-bottom justify-content-center w-100 bg-secondary text-white border-info border-top">
          <small>Copyright &copy;</small>
        </footer>


      </div>
    );
  }
}

export default App;
