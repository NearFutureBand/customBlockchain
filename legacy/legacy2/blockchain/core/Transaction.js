const SHA256 = require('crypto-js/sha256');

class Transaction {
  constructor({ from, to, amount, memo }) {
    this.from = from; //required
    this.to = to;
    this.amount = amount;

    this.timestamp = Date.now();
    this.trx_id = this.calculateHash();
    this.memo = memo;
  }
  
  calculateHash() {
    const str = this.from + this.timestamp + this.to + this.amount;
    return SHA256(str).toString();
  }
}

class Transfer extends Transaction {
  constructor({ from, to, amount, memo }) {
    super({ from, to, amount, memo });
    this.type = 'transfer';
  }
}

class CreateAccount extends Transaction {
  constructor({ publicKey, nickname }) {
    super({ from: '', to: '', amount: 0, memo: '' });
    this.type = 'create_account';
    this.publicKey = publicKey;
    this.nickname = nickname;
  }
}

module.exports = {
  Transaction
}