import React, { Component } from "react";
import axios from "axios";
class ServicesModal extends Component {
    state = {
        services: []
    }
    componentDidMount() {   
        axios.get("/services").then((response)=>{
            console.log(response.data)
            if(typeof response.data === "object"){
                this.setState({
                    services: response.data
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

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
                            {
                                this.state.services.map((services, index) =>{
                                    return ( <tr key={index}>
                                <td>{services.service}</td>
                                <td>{services.price}</td>
                            </tr>);
                                })
                            }
                           
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default ServicesModal;