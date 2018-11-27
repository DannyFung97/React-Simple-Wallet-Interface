import React, { Component } from 'react';
import '../styles/global.css';

class TransactionRow extends Component {
    constructor(props) {
        super(props);
        this.vinAddrs = {
            /*
                addr: amount
            */
        };
        this.voutAddrs = {
            /*
                addr: amount
            */
        };
        this.vinReducer = this.vinReducer.bind(this);
        this.voutReducer = this.voutReducer.bind(this);
        this.createUniqueVinMap = this.createUniqueVinMap.bind(this);
        // this.createUniqueVoutMap = this.createUniqueVoutMap.bind(this);
    }

    vinReducer(accumulator, currentVin) {
        if (currentVin.addr === this.props.addr) {
            accumulator += currentVin.value;
        }
        return accumulator;
    }

    voutReducer(accumulator, currentVout) {
        if (currentVout.scriptPubKey.addresses.includes(this.props.addr)) {
            accumulator += parseFloat(currentVout.value);
        }
        return accumulator;
    }

    createUniqueVinMap(map, vin) {
        for (let v = 0; v < vin.length; v++) {
            if (map[vin[v].addr] === undefined) {
                map[vin[v].addr] = 0;
            }
            map[vin[v].addr] += vin[v].value;
        }
        this.vinAddrs = map;
    }

    // createUniqueVoutMap(map, vout) {
    //     for (let v = 0; v < vout.length; v++) {
    //         for (let w = 0; w < vout[v].scriptPubKey.addresses.length; w++) {
    //             if (map[vout[v].scriptPubKey.addresses[w]] === undefined) {
    //                 map[vout[v].scriptPubKey.addresses[w]] = 0;
    //             }
    //             map[vout[v].scriptPubKey.addresses[w]] += v.value;
    //         }
    //     }
    //     this.voutAddrs = map;
    // }

    render() {
        this.vinAddrs = {}; // reset vinAddrs such that after every rerender, the values are reset to 0 and are added to again.
        this.createUniqueVinMap(this.vinAddrs, this.props.tx.vin);
        // this.createUniqueVoutMap(this.voutAddrs, this.props.tx.vout);

        let vinArray = [];
        // let voutArray = [];

        for (let address in this.vinAddrs) {
            if (address === "undefined") {
                // vinArray.push({ addr: "", value: "" });
            } else {
                // console.log("vinPUSHED");
                if (isNaN(this.vinAddrs[address])) {
                    vinArray.push({ addr: address, value: "" });
                } else {
                    vinArray.push({ addr: address, value: this.vinAddrs[address] });
                }
            }
        }
        // for (let address in this.voutAddrs) {
        //     if (address === "undefined") {
        //         voutArray.push({ addr: "", value: "" });

        //     } else {
        //         // console.log("voutPUSHED");
        //         if (isNaN(this.vinAddrs[address])) {
        //             voutArray.push({ addr: address, value: "" });
        //         } else {
        //             voutArray.push({ addr: address, value: this.voutAddrs[address] });
        //         }
        //     }
        // }

        return (
            <tr>
                <th>{new Date(this.props.tx.time * 1000).toString()}</th>
                <th style={{ color: "#217DA2" }}>{this.props.tx.vout.reduce(this.voutReducer, 0) - this.props.tx.vin.reduce(this.vinReducer, 0)}</th>
                <th>{vinArray.length > 0 ? (
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
                        <tbody>{vinArray.length > 0 ? (
                            vinArray.map((vin, i) => {
                                return <tr key={i}>
                                    <td>{vin.addr}</td>
                                    <td style={{ color: "#217DA2" }}>{vin.value}</td>
                                </tr>
                            })
                        ) : (null)}</tbody>
                        {/* <tbody>{this.vinAddrs ? (
                            this.vinAddrs.map((vin, i) => {
                                console.log("Inside VIN row mapping");
                                return <tr key={i}>
                                    <td>{vin.addr}</td>
                                    <td>{vin[addr]}</td>
                                </tr>
                            })
                        ) : (null)}</tbody> */}
                    </table>
                ) : (<span style={{ color: "#e2b118" }}>Newly mined coins</span>)}
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
                        {/* <tbody>{voutArray.length > 0 ? (
                            voutArray.map((vout, i) => {
                                return <tr key={i}>
                                    <td>{vout.addr}</td>
                                    <td style={{ color: "#217DA2" }}>{vout.value}</td>
                                </tr>
                            })
                        ) : (null)}</tbody> */}
                        <tbody>{this.props.tx.vout ? (
                            this.props.tx.vout.map((vout, i) => {
                                // console.log("Inside VOUT row mapping");
                                return <tr key={i}>
                                    <td>{vout.scriptPubKey.addresses.join("<br />")}</td>
                                    <td style={{ color: "#217DA2" }}>{vout.value}</td>
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