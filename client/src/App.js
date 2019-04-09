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
  state = {
    business: {
      address:"",
      phone: "",
      button1: "",
      button2: "",
      button3: "",
      api: ""
    }
  }

  componentDidMount(){
    window.onclick = function(event) {
      if (event.target.className === "modal" ) {
        event.target.style.display = "none";
      }
    }
    this.getBusiness();
  }

  getBusiness = () => {

    axios.get("/info").then((res)=>{
      if(res.data){
        this.setState({
          business: res.data
        },
        function(){
        })
      }
    })
  }

  handleClick = (e) => {
   if(document.getElementById("adminModal").style.display !== "block"){
 
    var target;
    if(e.target.id){
      target = e.target.id;
    }else if(e.target.alt)  {
      target = e.target.alt;
    }else{
      target = e.target.parentNode.id;
    }
    document.getElementById(target+"Modal").style.display = document.getElementById(target + "Modal").style.display === "block" ? "none" : "block";
  
   }
  }
  render() {
    return (
      <div className="App">
     
        {
          this.state.business ? <header>
          <img id="logo" src={this.state.business.logo ? this.state.business.logo : logo} alt="logo"></img>
          <address id="address">
                     {
                       this.state.business.address
                     }
            </address>
                    <br/>
            <a id="phone" href={"tel:+" + this.state.business.phone}>{this.state.business.phone}</a>
        </header>
        :
        <header>
        <img id="logo" src={logo} alt="logo"></img></header>
        }


          <AppointmentForm />

          <ServicesModal />
        
          <DirectionsModal
            address={this.state.business.address}
            api={this.state.business.api}
          />

          <AdminModal getBusiness={this.getBusiness} />

        <div id="section">
          <section>
            <div>
              <CustomButton 
                id="appointments"
                onClick={this.handleClick}
                src={appointments}
                alt="appointments"
                text={this.state.business.button1}
              />

              <CustomButton
                id="services"
                onClick={this.handleClick}
                src={services}
                alt="services"
                text={this.state.business.button2}
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
