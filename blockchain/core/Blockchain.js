const { Worker } = require('worker_threads');
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

      let miner = new Worker(
        __dirname + '/miner.js',
        {
          workerData: {
            block,
            difficulty: this.difficulty
          }
        }
      );
      
      miner.on('message', block => {
        console.log(`\n------ new block is mined ------\n`);
        console.log(`block's hash: ${block.hash}`);
        console.log(`prev hash: ${block.previousHash}`)
        console.log(`trx: ${_.keys(block.transactions).length}\nnonce: ${block.nonce}\ntime: ${block.miningtTime}`);

        this.chain.push(block);
        this.addTransaction(
          new Transaction({
            from: 'virtualchain',
            to: miningRewardAddress,
            amount: this.miningReward,
          })
        );
        miner.terminate();
        resolve(block);
      });      
    });
  }
  
  addTransaction( transaction) {
    this.pendingTransactions[transaction.trx_id] = transaction;
  }

  show() {
    console.log('\nblockchain: ');
    this.chain.forEach( block => {
      console.log(`hash: ${block.hash}
      prevHash: ${block.previousHash}\n`);
    });
  }

}

module.exports = {
  Blockchain
}