const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {

  constructor( { from, to, amount, memo }) {
    this.from = from;   
    this.to = to;
    this.amount = amount;

    this.memo = memo;
    this.timestamp = Date.now();
    this.trxId = this.calculateHash();

    this.signature = null;
  }

  calculateHash() {
    const { to, from, amount, timestamp, memo } = this;
    return SHA256(`${from}${to}${amount}${timestamp}${memo}`).toString();
  }

  sign(publicKey, privateKey) {
    const signingKey = ec.keyFromPrivate(privateKey);
    if(signingKey.getPublic('hex') !== publicKey) throw new Error('One cannot sign transactions for other wallets!');

    const sig = signingKey.sign(this.trxId, 'base64');
    this.signature = sig.toDER('hex');
  }



  // =======  not in use for now  =======
  validateProps() {
    if( ! this.from ) throw new Error('Property "from" is not provided!');

    if(this.type === 'transfer') {
      if( ! this.to ) throw new Error('Property "to" is not provied!');
      if( ! this.amount ) throw new Error('Property "amount" is not provided!');

      return true;
    } else if (this.type === 'createAccount') {

      if( ! this.publicKey ) throw new Error('Public key is not provided for new account!')
      if( ! this.nickname ) throw new Error('Property "nickname" is not provied!');

      return true;
    }
  }
  // on development
  validateStructure(trx) {
    if( ! trx.type ) throw new Error('Transaction should contain type!');

    const test = { ...this.transactionTypes[trx.type], ...trx };
    for(const prop of test) {
      if( !test[prop] ) throw new Error(`The required '${prop}' property is not provided!`);
    }

    return true;
  }
};

module.exports = {
  Transaction
}