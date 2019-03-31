import React, { Component } from "react";

class ServicesModal extends Component {


    render() {

        return (
            <div className="modal" id="servicesModal">

                <div className="modal-content">
                    <button className="close" onClick={function (e) {
                        e.target.parentNode.parentNode.style.display = "none";
                    }}>&times;</button>

                    <table>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nails</td>
                                <td>$99</td>
                            </tr>
                            <tr>
                                <td>Eyebrows</td>
                                <td>$50</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default ServicesModal;