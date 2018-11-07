import React, {Component} from 'react';
import {util} from 'oip-hdmw';

class InputAmountAndAddress extends Component{
    constructor(props){
        super(props);
        this.state = {
         amount: 'Number of FLO',
         to: 'Receiving Address'
        };

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendFunds = this.sendFunds.bind(this);
    }

    handleAmountChange(event){
        this.setState({
            amount: event.target.value
        })
       this.props.onAmountChange(event.target.value)
    }

    handleAddressChange(event) {
        this.setState({
            address: event.target.value
        })
        this.props.onToAddressChange(event.target.value)
    }

    sendFunds(){
        let fr = {}
        fr[this.props.address]= this.state.amount
        this.wallet.getCoin("flo").sendPayment({to: this.state.to, from: fr});
    }

    handleSubmit(event){
        event.preventDefault();
       if(util.isValidPublicAddress(this.state.to) && parseFloat(this.state.amount) > 0){
           this.sendFunds();
       }
       else{
           alert('Please have a valid public address / amount of FLO coins.');
       }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Send:
                    <input type="number" amount={this.state.amount} onChange={this.handleAmountChange} style={{width: "150px",paddingLeft: "10px"}} placeholder={"FLO"}/>
                </label>
                <label style={{paddingLeft: "10px"}}>
                    To:
                    <input type="text" to={this.state.to} onChange={this.handleAddressChange} style={{width: "500px",paddingLeft: "10px"}} placeholder={"Receiving Address"}/>
                </label>
                    <input className="submitBtn" type="submit" value="Submit"/>
            </form>
        )
    }
}

export default InputAmountAndAddress;