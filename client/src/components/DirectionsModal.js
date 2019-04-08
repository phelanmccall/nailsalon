import React from 'react';

function close (e){
        e.target.parentNode.parentNode.style.display ="none";
}


function DirectionsModal (props) {

        return (
            <div className="modal" id="directionsModal">
            <div className="modal-content">
            <button className="close" onClick={close}>&times;</button>
             
                <iframe title="directionsMap" id="map" src={"https://www.google.com/maps/embed/v1/place?key=" + props.api + "&q=" + props.address} frameBorder="0" style={{border: 0}} allowFullScreen></iframe>
            </div>
        </div>)
    } 
    


export default DirectionsModal;