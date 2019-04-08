import React, { Component } from 'react';

class CustomButton extends Component {

    render(){
        return (
            
            <button id={this.props.id} onClick={this.props.onClick}>
            <img src={this.props.src} alt={this.props.alt} />
            <div>{this.props.text}</div>
          </button>
        );
    }

}

export default CustomButton;