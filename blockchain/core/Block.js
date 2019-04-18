class Block {
  constructor(timestamp, transactions, previousHash) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    this.trxsStringified = JSON.stringify(this.transactions);
  }
  
  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + this.trxsStringified + this.nonce).toString();
  }

  /** this function should go to the web worker */
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





  hasValidTransactions() {
    /*for( const trx of this.transactions) {
      if(!this.transactions[trx].isValid()){
        return false;
      }
    }
    return true;*/
  }
}

module.exports = {
  Block
}