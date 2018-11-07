import React, {Component} from 'react';
import '../styles/global.css';
import Balance from "./Balance";
import SelectAddress from "./SelectAddress";
import InputAmountAndAddress from "./InputAmountAndAddress.js";
import {Wallet} from "oip-hdmw";
import TransactionRow from "./TransactionRow.js";

//import { Insight } from 'insight-explorer';

class WalletComponent extends Component {
    constructor(props) {
        super(props);
        let wal = new Wallet(props.mnemonic, {discover: false});
        this.state = {
            wallet: wal,
            floExplorer: wal.networks.flo.explorer,
            transactions: [],
            toAddress: "",
            myAddress: '',
            amount: "",
            confirmation: ''
        };

        this.onToAddressChange = this.onToAddressChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onMyAddressChange = this.onMyAddressChange.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
    }

    componentDidMount() {
        this.getAddress();
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.myAddress !== nextState.myAddress;
    }

    onToAddressChange(toAddress) {
        this.setState({toAddress: toAddress});
    }

    onAmountChange(amount) {
        this.setState({amount: amount});
    }

    onMyAddressChange(myAddress) {
        this.setState({myAddress: myAddress});
        this.getAddress();
    }

    getAddress() {
        //let address = this.state.wallet.getCoin("flo").getMainAddress().getPublicAddress();
        this.getTransactions(this.state.myAddress);//FAPiw7EFMYmYK1mUuQQekyLsmimUBQT9zd");"address);
    }

    getTransactions(address) {
        let _this = this;
        this.state.floExplorer.getTransactionsForAddress(address).then(function (response) {
            console.log(response);
            _this.setState({transactions: response.txs});
        }).catch(err => {
            console.log("getTransactions" + err);
        })

    }

    render() {
        return (
            <div className="WholeWallet">
                <div className="MyWallet">
                    <Balance mnemonic={this.state.wallet.mnemonic}/>
                    <div className="Address">
                        <SelectAddress onMyAddressChange={this.onMyAddressChange}/>
                    </div>
                    <div className="IAAA">
                        <InputAmountAndAddress onToAddressChange={this.onToAddressChange} address={this.state.myAddress}
                                               onAmountChange={this.onAmountChange} amount={this.state.amount}/>
                    </div>
                </div>
                <div className="Table">
                    <table className="table table-hover">
                        <thead className="thead-light">
                        <tr>
                            <th>Time</th>
                            <th>&Delta; Amount</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Confirmations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.transactions ? (
                            this.state.transactions.map((tx, i) => {
                                return <TransactionRow key={i} tx={tx} myAddress={this.state.myAddress} />
                            })
                        ) : (null)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default WalletComponent;