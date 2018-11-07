import React, { Component } from 'react';
import {util} from 'oip-hdmw';
import DropDownMenu from "./DropDownMenu.js";
import ClipboardJS from 'clipboard';

class SelectAddress extends Component {
    constructor(){
        super();
        new ClipboardJS(".copyToClipboard")
        this.currentlySelectedAddress = ""
        this.state = {
            address: [
                // {
                //     id: 0,
                //     title: '2869 Historic Decatur Rd, San Diego, CA 92106',
                //     selected: false,
                //     key: 'address'
                // }
            ]
        }

        this.addAddress = this.addAddress.bind(this);
        this.onMyAddressChange = this.onMyAddressChange.bind(this);
    }

    addAddress() {
        let a = prompt("Enter a new address");
        if (util.isValidPublicAddress(a) && this.state.address.length > 0) {
            let tempArray = this.state.address.slice();
            tempArray.push({id: this.state.address[this.state.address.length - 1].id + 1, title: a, selected: false, key: 'address'});
            this.setState({address: tempArray})
        }
        else if(util.isValidPublicAddress(a) && this.state.address.length <= 0){
            let tempArray = this.state.address.slice();
            tempArray.push({id: 0, title: a, selected: false, key: 'address'});
            this.setState({address: tempArray})
        }
        else{
            alert('Please enter valid address.');
        }
    }

    onMyAddressChange(){
        for(let a of this.state.address){
            if(a.selected = true){
                this.props.onMyAddressChange(a.title);
            }
        }
    }

    resetThenSet = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]))
        temp.forEach(item => item.selected = false);
        temp[id].selected = true;
        console.log(temp[id].title)
        this.currentlySelectedAddress = temp[id].title;
        this.onMyAddressChange();
        this.setState({
            [key]: temp
        })
    };

    render() {
        return (
            <div className="AddressSelection">
                <div className="wrapper">
                    <DropDownMenu
                        title="Select Your Address"
                        list={this.state.address}
                        resetThenSet={this.resetThenSet}
                    />
                    <button className="btn copyToClipboard" data-clipboard-text={this.currentlySelectedAddress}>
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