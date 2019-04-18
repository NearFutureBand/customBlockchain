class Transaction {
  constructor( { type, from, to, amount, nickname, publicKey, memo }) {
  //constructor( trx ) {
    this.transactionTypes = {
      transfer: {
        from: null,
        publicKey: null,
        nickname: null,
        timestamp: null
      },
      createAccount: {
        from: null,
        to: null,
        amount: null
      }
    }

    if(!type) throw new Error('Type of transcation is required!');
    this.type = type; //required
    this.from = from; //required
   

    this.nickname = nickname;
    this.publicKey = publicKey
    
    this.to = to;
    this.amount = amount;

    
    this.memo = memo;
    this.timestamp = Date.now();
    this.trx_id = this.calculateHash();
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

  calculateHash() {
    if( this.validateProps() ) {
      const str = this.from + this.timestamp + this.memo;
      if(this.type === 'transfer') return SHA256(this.to + this.amount + str).toString();
      else if (this.type === 'createAccount') return SHA256(this.nickname + this.publicKey + str).toString();
    }
  }

  sign(publicKey, privateKey) {
    const signingKey = ec.keyFromPrivate(privateKey);
    if(signingKey.getPublic('hex') !== publicKey) {
      throw new Error('One cannot sign transactions for other wallets!');
    }

    const sig = signingKey.sign(this.trx_id, 'base64');
    this.signature = sig.toDER('hex');
  }

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
};

module.exports = {
  Transaction
}