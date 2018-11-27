import React, { Component } from 'react';
import '../styles/toggler.css';

class Toggle extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    
    }

    handleChange() {
        this.props.setView();
    }
//value={this.props.viewSelectedAddressOnly} 
    render () {
        return (
            <label className="switch">
                <input type="checkbox" onChange={this.handleChange} />
                <div className="slider" />
            </label>
        );
    }
}

export default Toggle;