import React, { Component } from 'react';
import {util} from 'oip-hdmw';
import DropDownMenu from "./DropDownMenu.js";
import ClipboardJS from 'clipboard';
import Toggle from "./Toggle.js";

class SelectAddress extends Component {
    constructor(props){
        super(props);

        new ClipboardJS(".copyToClipboard")

        this.addAddress = this.addAddress.bind(this);
    }

    addAddress() {
        let a = prompt("Enter a new address");
        if(util.isValidPublicAddress(a) && this.props.addresses.find(e => {
            return e.title === a;
        }) !== undefined){
            alert("This address exists.");
        }
        else if (util.isValidPublicAddress(a) && this.props.addresses.length > 0) {
            let tempArray = this.props.addresses.slice();
            tempArray.push({id: this.props.addresses[this.props.addresses.length - 1].id + 1, title: a, selected: false, key: 'address'});
            this.props.addNewAddresses(tempArray, a);
        }
        else if(util.isValidPublicAddress(a) && this.props.addresses.length <= 0){
            let tempArray = this.props.addresses.slice();
            tempArray.push({id: 0, title: a, selected: false, key: 'address'});
            this.props.addNewAddresses(tempArray, a);
        }
        else{
            alert('Please enter valid address.');
        }
    }

    resetThenSet = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.props.state[key]))
        temp.forEach(item => item.selected = false);
        temp[id].selected = true;
        this.props.setAddress(temp[id].title);
    };

    render() {
        return (
            <div className="AddressSelection">
                <div className="wrapper">
                    <h4>Show transactions of selected address only</h4>
                        <Toggle
                            setView={this.props.setView}
                        />
                    <div className="divider_two" />
                    <DropDownMenu
                        title="Select Your Address"
                        list={this.props.addresses}
                        resetThenSet={this.resetThenSet}
                    />
                    <button className="btn copyToClipboard" data-clipboard-text={this.props.myAddress}>
                        Copy
                    </button>
                    <div className="divider" />
                    <input type="image" src="https://cdn4.iconfinder.com/data/icons/web-and-mobile-ui/24/UI-33-512.png" alt="Add" width="60px" height="60px" onClick={this.addAddress}/>
                </div>
            </div>
        );
    }
}

export default SelectAddress;