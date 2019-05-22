const { Transaction } = require('./Transaction');
const { Block } = require('./Block');
const _ = require('lodash');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = {};
    this.miningReward = 100;
  }
  
  createGenesisBlock() {  
    return new Block(0, {}, '');
  }
  
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  
  minePendingTransactions (miningRewardAddress) {
    return new Promise( (resolve) => {
      //console.log(`   before: ${JSON.stringify(this.pendingTransactions)}`);
      let transactions = { ...this.pendingTransactions};
      this.pendingTransactions = _.omit(this.pendingTransactions, _.keys(transactions) );
      //console.log(`   after: ${JSON.stringify(this.pendingTransactions)}`);
      let block = new Block( Date.now(), transactions, this.getLatestBlock().hash );
      
      block.mine( this.difficulty )
      //block.approve()
      .then( () => {
        console.log(`\n\nblock: ${block.hash}\ntrx: ${_.keys(block.transactions).length}\nnonce: ${block.nonce}`);
        //console.log('trxs: ', JSON.stringify(block.transactions));
        this.chain.push(block);
        this.addTransaction(
          new Transaction({
            from: 'virtualchain',
            to: miningRewardAddress,
            amount: this.miningReward,
          })
        );
        resolve(block);
      });
    });
  }
  
  addTransaction( transaction) {
    this.pendingTransactions[transaction.trx_id] = transaction;
    //console.log('trx added: ', JSON.stringify(transaction));
  }
}

module.exports = {
  Blockchain
}