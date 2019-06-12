const SHA256 = require('crypto-js/sha256');

class Transaction {
  constructor({ from, to, amount }) {
    this.from = from; //required
    this.to = to;
    this.amount = amount;

    this.timestamp = Date.now();
    this.trx_id = this.calculateHash();
  }
  
  calculateHash() {
    const str = this.from + this.timestamp + this.to + this.amount;
    return SHA256(str).toString();
  }
}

module.exports = {
  Transaction
}