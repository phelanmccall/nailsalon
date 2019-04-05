import React, {Component} from "react";

class AdminHeader extends Component {

    render() {
        return (
            <span>
                <button className="logoutBtn" onClick={this.props.logout}>Logout</button>
            </span>
        );
    }

}

export default AdminHeader;