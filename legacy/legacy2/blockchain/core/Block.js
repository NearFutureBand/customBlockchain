const SHA256 = require('crypto-js/sha256');
const _ = require('lodash');

class Block {
  constructor(timestamp, transactions, previousHash) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    this.trxsStringified = JSON.stringify(this.transactions);
    this.miningTime = 0;
  }
  
  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + this.trxsStringified + this.nonce).toString();
  }

  mine(difficulty) {
    return new Promise( (resolve) => {
      while( this.hash.substring(0, difficulty) !== Array( difficulty + 1).join('0')) {
        this.nonce++;
        this.hash = this.calculateHash();
      }
      resolve();
    });
  }

  approve() {
    return new Promise( (resolve) => {
      setTimeout(() => {
        this.hash = this.calculateHash();
        resolve();
      }, 2000);
    });
  }
  
  show() {
    console.log(`\n------ new block is mined ------\n`);
    console.log(`block's hash: ${this.hash}`);
    console.log(`prev hash: ${this.previousHash}`)
    console.log(`trx: ${_.keys(this.transactions).length}\nnonce: ${this.nonce}\ntime: ${this.miningtTime}`);
  }
}

module.exports = {
  Block
}