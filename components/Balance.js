import React, {Component} from 'react';
import '../styles/global.css';
import {Wallet} from "oip-hdmw";

class Balance extends Component{
    constructor(props) {
        super(props);
        this.state = {
            wallet: new Wallet(props.mnemonic, {supported_coins:["flo"],discover:false}),
            bal: "*Loading*" /* Placeholder as flo coins are being accessed */
        };
        this.showBalance()
    }

    /* Gets flo coins from wallet object based on its mnemonic and sets bal to amount of flo coins */
    showBalance() {
         this.state.wallet.getCoinBalances(["flo"]).then((data) => {
             this.setState({bal:data.flo.toFixed(8)})
         }).catch(err=> console.error(err))
    }

    render(){
        return(
            <div className="balance">
                <label>Balance: {this.state.bal} FLO</label>
            </div>
        );
    }
}

export default Balance;