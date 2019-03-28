import React, { Component } from "react";

class DirectionsModal extends Component {


    render() {
        
        return (
            <div className="modal" id="directionsModal">
                <div className="modal-content">
                <button className="close" onClick={function(e){
            e.target.parentNode.parentNode.style.display ="none";
          }}>&times;</button>
                    <address>
                        Nail Salon <br />
                        123 Fake St.<br />
                        Anywhere, CA 90210<br />
                    </address>
                    <p>1-555-555-5555</p>
                    <a id="directions" href="https://goo.gl/maps/mJEMySZFc5p" target="_blank" rel="noopener noreferrer">Open Google Maps</a>
                </div>
            </div>
        );
    }
}

export default DirectionsModal;