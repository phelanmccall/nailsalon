import React, { Component } from 'react';
import logo from './assets/images/logo.png';
import './App.css';
import directions from "./assets/images/app-car-charging-33488.jpg";
import appointments from "./assets/images/beautiful-cleaning-fashion-332046.jpg"
import AppointmentForm from "./components/AppointmentForm";
class App extends Component {

  componentDidMount() {
      // Get the modal
      var modal = document.getElementById('myModal');
        
      // Get the button that opens the modal
      var btn = document.getElementById("booking");
      
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      
      var form = document.getElementById("apptForm");
      // When the user clicks on the button, open the modal 
      btn.onclick = function() {
        modal.style.display = "block";
      }
      
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
      
      // // When the user clicks anywhere outside of the modal, close it
      // window.onclick = function(event) {
      //   if (event.target == modal) {
      //     modal.style.display = "none";
      //   }
      // }
      
      form.onsubmit = function(e){
          e.preventDefault();

          let info = {
              date: e.target.date.value,
              timeslot: e.target.timeslot.value,
              name: e.target.name.value,
              phone: e.target.phone.value
          }
          modal.style.display = "none";

      }
  }

  render() {
    return (
      <div className="App">

        <header>
          <img id="logo" src={logo}></img>
        </header>


        <div id="myModal" className="modal">

          <AppointmentForm />
   
          </div>
          <div id="section">
            <section>
              <div>
                <a id="booking" href="#">
                  <img src={appointments} alt="Appointments" />
                  <div>Appointments</div>
                </a>

                <a id="directions" href="https://goo.gl/maps/mJEMySZFc5p" target="_blank">
                  <img src={directions} alt="Directions" />
                  <div>Directions</div>
                </a>
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
