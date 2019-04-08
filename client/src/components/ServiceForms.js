import React, {Component} from "react";

class ServiceForms extends Component {

    render() {
        return (
           <span id="updateServicesForm" className="updateForm">
                <form className="service" onSubmit={this.props.addService}>
                        <label>Add Service</label><br />
                        <label>Service</label><br />
                        <input name="service" required></input><br />
                        <label>Price</label><br />
                        <input name="price" required></input><br />
                        <input name="submit" type="submit" value="Submit" />
                    </form>
                    <form className="service" onSubmit={this.props.updateService}>
                        <label>Update Service</label><br />
                        <label>Service</label><br />
                        <select name="service" required>
                            {
                                this.props.services.map((value, key) => {
                                    return <option key={key}>
                                        {value.service}
                                    </option>
                                })
                            }
                        </select><br />
                        <label>Price</label><br />
                        <input name="price" required></input><br />
                        <input name="submit" type="submit" value="Update" />
                    </form>
                    <form className="service" onSubmit={this.props.deleteService}>
                        <label>Delete Service</label><br />
                        <label>Service</label><br />
                        <select name="service" required>
                            {
                                this.props.services.map((value, key) => {
                                    return <option key={key}>
                                        {value.service}
                                    </option>
                                })
                            }
                        </select><br />
                        <input name="submit" type="submit" value="Delete" />
                    </form>
                    
           </span>
        );
    }

}

export default ServiceForms;