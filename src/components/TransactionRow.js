import React, {Component} from 'react';
import '../styles/global.css';


class TransactionRow extends Component {
    constructor(props) {
        super(props);
        this.vinReducer = this.vinReducer.bind(this);
        this.voutReducer = this.voutReducer.bind(this);
    }

    vinReducer(accumulator, currentVin) {
        if (currentVin.addr === this.props.myAddress) {
            accumulator += currentVin.value;
        }
        return accumulator;
    }

    voutReducer(accumulator, currentVout) {
        if (currentVout.scriptPubKey.addresses.includes(this.props.myAddress)) {
            accumulator += parseFloat(currentVout.value);
        }
        return accumulator;
    }

    render() {
        return (
            <tr>
                <th>{new Date(this.props.tx.time * 1000).toString()}</th>
                <th style={{color: "blue"}}>{this.props.tx.vout.reduce(this.voutReducer, 0) - this.props.tx.vin.reduce(this.vinReducer, 0)}</th>
                <th>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                Address
                            </th>
                            <th>
                                Amount
                            </th>
                        </tr>
                        </thead>
                        <tbody>{this.props.tx.vin ? (
                            this.props.tx.vin.map((vin, i) => {
                                return <tr key={i}>
                                    <td>{vin.addr}</td>
                                    <td>{vin.value}</td>
                                </tr>
                            })
                        ) : (null)}</tbody>
                    </table>
                </th>
                <th>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                Address
                            </th>
                            <th>
                                Amount
                            </th>
                        </tr>
                        </thead>
                        <tbody>{this.props.tx.vout ? (
                            this.props.tx.vout.map((vout, i) => {
                                return <tr key={i}>
                                    <td>{vout.scriptPubKey.addresses.join("<br />")}</td>
                                    <td>{vout.value}</td>
                                </tr>
                            })
                        ) : (null)}</tbody>
                    </table>
                </th>
                <th>{this.props.tx.confirmations}</th>
            </tr>
        )
    }
}

export default TransactionRow;