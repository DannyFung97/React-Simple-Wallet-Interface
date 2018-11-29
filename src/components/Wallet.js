import React, { Component } from 'react';
import '../styles/global.css';
import Balance from "./Balance";
import SelectAddress from "./SelectAddress";
import InputAmountAndAddress from "./InputAmountAndAddress.js";
import { Wallet } from "oip-hdmw";
import TransactionRow from "./TransactionRow.js";
//import { Insight } from 'insight-explorer';

class WalletComponent extends Component {
    constructor(props) {
        super(props);
        let wal = new Wallet('00000000000000000000000000000000', {
            discover: false,
            supported_coins: ['flo', 'flo_testnet']
        })
        this.state = {
            wallet: wal,
            floExplorer: wal.networks.flo.explorer,
            myAddress: undefined,
            address: [
                // {
                //     id: 0,
                //     title: 'FAPiw7EFMYmYK1mUuQQekyLsmimUBQT9zd',
                //     selected: false,
                //     key: 'address'
                // }
                // ,
                // {
                //     id: 1,
                //     title: 'FPznv9i9iHX5vt4VMbH9x2LgUcrjtSn4cW',
                //     selected: false,
                //     key: 'address'
                // },
                // {
                //     id: 2,
                //     title: 'FHSugHTMpn4D8U8CWuFDmyPXanfQ6zpAF9',
                //     selected: false,
                //     key: 'address'
                // },
                // {
                //     id: 3,
                //     title: 'FCG37kpQXNd3AjdqacbEVELTfC7SCD2vzK',
                //     selected: false,
                //     key: 'address'
                // }
            ],
            transactions: [
                /*
                {
                    tx: '',
                    addr: ''
                }
                 */
            ],
            toAddress: undefined,
            amount: undefined,
            confirmation: undefined,
            viewSelectedAddressOnly: false
        };

        this.onToAddressChange = this.onToAddressChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.setView = this.setView.bind(this);
        this.getAllTransactions = this.getAllTransactions.bind(this);
        this.addNewAddresses = this.addNewAddresses.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.addNewTransactions = this.addNewTransactions.bind(this);
        this.getAllAddresses = this.getAllAddresses.bind(this);
    }

    setView() {
        this.setState({ viewSelectedAddressOnly: !this.state.viewSelectedAddressOnly });
        console.log('SWITCHED, viewAll: ', this.state.viewSelectedAddressOnly);
    }

    componentDidMount() {
        console.log('START')
        this.getAllAddresses();
        this.getAllTransactions().then().catch(err => { console.log("GATHER_ERROR: ", err); });
    }

    getAllAddresses() {
        let account = this.state.wallet.getCoin("flo_testnet").getAccount(0);
        let addrs = [];
        for (let i = 0; i < 10; i++) {
            addrs.push({ id: i, title: account.getAddress(0, i).getPublicAddress(), selected: false, key: 'address' });
        }
        this.setState({ address: addrs });
    }

    addNewAddresses(allAddresses, a) {
        this.setState({ address: allAddresses });
        this.addNewTransactions(a);
    }

    addNewTransactions(a) {
        let tempTxs = [...this.state.transactions];
        this.state.floExplorer.getTransactionsForAddress(a).then(transactions => {
            let txs = transactions.txs;
            for (let tx of txs) {
                tempTxs.push({ tx: tx, addr: a });
                console.log("pushed new transactions")
            }
            tempTxs.sort(function (a, b) {
                return b.tx.time - a.tx.time;
            });
            this.setState({ transactions: tempTxs });
            console.log("What is transactions", this.state.transactions)
        }).catch(err => {
            console.log({ success: false, message: "Failed to get txs from a", address: a, error: err })
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('component did update')
    }

    async getAllTransactions() {
        console.log('get_all');
        let tempTxs = []; // { tx, addr}
        for (let addr of this.state.address) {
            let transactions;
            try {
                transactions = await this.state.floExplorer.getTransactionsForAddress(addr.title)
            } catch (err) {
                console.error(`Error getting transactions from floExplorer: ${err}`)
            }
            if (transactions) {
                let txs = transactions.txs;
                for (let tx of txs) {
                    tempTxs.push({ tx: tx, addr: addr.title });
                }
            }
        }
        if (tempTxs.length > 0) {
            tempTxs.sort(function (a, b) {
                return a.tx.time - b.tx.time;
            });
        }
        this.setState({
            transactions: tempTxs,
        });
    }

    onToAddressChange(toAddress) {
        this.setState({ toAddress: toAddress });
    }

    onAmountChange(amount) {
        this.setState({ amount: amount });
    }

    setAddress(a) {
        console.log("setAddress: ", a);
        this.setState({ myAddress: a });
    }

    render() {
        console.log("main address: ", this.state.wallet.getCoin("flo_testnet").getMainAddress().getPublicAddress());
        console.log('Rendering');
        let displayTXs = [];
        if (!this.state.viewSelectedAddressOnly) {
            displayTXs = this.state.transactions;
            console.log(displayTXs);
        } else {
            for (let t of this.state.transactions) {
                for (let param in t) {
                    if (t[param] === this.state.myAddress) {
                        displayTXs.push(t)
                    }
                    for (let _param in param) {
                        if (param[_param] === this.state.myAddress) {
                            displayTXs.push(t)
                        }
                        for (let __param in _param) {
                            if (_param[__param] === this.state.myAddress) {
                                displayTXs.push(t)
                            }
                        }
                    }
                }
            }
            displayTXs.sort(function (a, b) {
                return b.tx.time - a.tx.time;
            });
        }
        return (
            <div className="WholeWallet">
                <div className="MyWallet">
                    { console.log("What is this: ", this.state.myAddress) }
                    <Balance address={this.state.myAddress} />
                    <div className="Address">
                        <SelectAddress
                            setView={this.setView}
                            addNewAddresses={this.addNewAddresses}
                            addresses={this.state.address}
                            myAddress={this.state.myAddress}
                            state={this.state}
                            setAddress={this.setAddress}
                        />
                    </div>
                    <div className="IAAA">
                        <InputAmountAndAddress onToAddressChange={this.onToAddressChange} address={this.state.myAddress}
                            onAmountChange={this.onAmountChange} amount={this.state.amount} wallet={this.state.wallet} />
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
                            {displayTXs ? (
                                //filter  txs to get the displayed txs
                                //map the displayed variable
                                displayTXs.map((obj, i) => {
                                    console.log("Object: ", obj);
                                    console.log("Creating row");
                                    return <TransactionRow key={i} tx={obj.tx} addr={obj.addr} />
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