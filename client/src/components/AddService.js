import React, { Component } from "react";

class AddServiceModal extends Component {


    render() {

        return (
            <div className="modal" id="addServiceModal">

                <div className="modal-content">
                    <button className="close" onClick={function (e) {
                        e.target.parentNode.parentNode.style.display = "none";
                    }}>&times;</button>
                    <form action="/services" method="post">
                        <input name="service"></input>
                        <input name="price"></input>
                    </form>

                </div>
            </div>
        );
    }
}

export default AddServiceModal;