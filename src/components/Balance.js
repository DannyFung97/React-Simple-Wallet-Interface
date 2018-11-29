import React, { Component } from 'react';
import '../styles/global.css';
import { Wallet, Address, Networks } from "oip-hdmw";

class Balance extends Component {
    constructor(props) {
        super(props);
        this.address = undefined;
        this.state = {
            wallet: new Wallet(props.mnemonic, { supported_coins: ["flo"], discover: false }),
            bal: "(Select your address)" /* Placeholder as flo coins are being accessed */
        };
        this.showBalance()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate in Balance called.");
        if (this.address !== this.props.address) {
            console.log('show balance');
            this.showBalance();
        }
    }

    /* Gets flo coins from wallet object based on its mnemonic and sets bal to amount of flo coins */
    showBalance() {
        console.log('calling show_balance function...', this.props.address);
        if (this.props.address !== undefined) {
            this.setState({bal: "*Loading*"});
            this.address = this.props.address;
            let addr = new Address(this.address, Networks.flo_testnet, false);
            addr.updateState().then((a) => {
                let ball = addr.getBalance().toFixed(8)
                this.setState({ bal: ball })
                console.log(ball,this.address);
            })
        }
    }

    render() {
        return (
            <div className="balance">
                <label>FLO Balance: {this.state.bal} </label>
            </div>
        );
    }
}

export default Balance;