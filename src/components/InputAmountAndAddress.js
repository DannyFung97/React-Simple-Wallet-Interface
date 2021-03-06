import React, { Component } from 'react';
import { util } from 'oip-hdmw';

class InputAmountAndAddress extends Component {
    constructor(props) {
        super(props);
        this.amount = 'Number of FLO';
        this.to = 'Receiving Address';

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendFunds = this.sendFunds.bind(this);
    }

    handleAmountChange(event) {
        this.amount = event.target.value;
    }

    handleAddressChange(event) {
        this.to = event.target.value;
    }

    sendFunds() {
        let toArr = {};
        toArr[this.to] = this.amount;
        console.log("the address of to: ", typeof toArr)
        console.log("The address ", this.props.address, " is sending money to ", this.to);
        this.props.wallet.sendPayment({ to: toArr, coin: "flo_testnet"}).then(() => {
            alert('Transaction successful.');
        }).catch(err => console.log("Error in sending funds: ", err));
    }

    handleSubmit(event) {
        event.preventDefault();
        if (util.isValidPublicAddress(this.to) && parseFloat(this.amount) > 0) {
            this.props.onAmountChange(this.amount);
            this.props.onToAddressChange(this.to);
            this.sendFunds();
        }
        else {
            alert('Please have a valid public address / amount of FLO coins.');
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Send:
                    <input type="number" step="0.00000001" amount={this.amount} onChange={this.handleAmountChange} style={{ width: "150px", paddingLeft: "10px" }} placeholder={"FLO"} />
                </label>
                <label style={{ paddingLeft: "10px" }}>
                    To:
                    <input type="text" to={this.to} onChange={this.handleAddressChange} style={{ width: "500px", paddingLeft: "10px" }} placeholder={"Receiving Address"} />
                </label>
                <input className="submitBtn" type="submit" value="Submit" />
            </form>
        )
    }
}

export default InputAmountAndAddress;