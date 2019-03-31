import React, { Component } from "react";

class DirectionsModal extends Component {


    render() {
        
        return (
            <div className="modal" id="directionsModal">
                <div className="modal-content">
                <button className="close" onClick={function(e){
            e.target.parentNode.parentNode.style.display ="none";
          }}>&times;</button>
                   
                    <iframe title="directionsMap" id="map" src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d3105.1503810331815!2d-77.0387185!3d38.8976763!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x89b7b7bcdecbb1df%3A0x715969d86d0b76bf!2sThe+White+House%2C+1600+Pennsylvania+Ave+NW%2C+Washington%2C+DC+20500!3m2!1d38.8976763!2d-77.0365298!5e0!3m2!1sen!2sus!4v1553917357817!5m2!1sen!2sus" frameBorder="0" style={{border: 0}} allowFullScreen></iframe>
                </div>
            </div>
        );
    }
}

export default DirectionsModal;