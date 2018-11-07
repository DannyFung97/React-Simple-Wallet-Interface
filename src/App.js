import React, { Component } from 'react';
import './App.css';
import WalletComponent from "./components/Wallet.js";

/* WalletComponent handles everything, balance, address menu, transaction server, etc */
class App extends Component {
  render() {
    return (
      <div className="App">
          <WalletComponent mnemonic={"abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"}/>
      </div>
    );
  }
}

export default App;
