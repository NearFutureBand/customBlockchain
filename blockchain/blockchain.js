const SHA256 = require('crypto-js/sha256');
const _ = require('lodash');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const virtualChainPublicKey = '04f4d75d6390a9455629786fd0fa20268d30a1e989989925263808b0f722fda2e886bb347eb5811e43252816588d93334820af435317359b00637ea10b677a98ce';
const virtualChainPrivateKey = 'd5db7c72e97476e3d9d2fb4a77ddbd86a68d25f61cfaf32525f4c23f3c1c4e16';


class Transaction {
  constructor( { type, from, to, amount, nickname, publicKey }) {

    if(!type) throw new Error('Type of transcation is required!');
    this.type = type; //required

    this.nickname = nickname;
    this.publicKey = publicKey
    this.from = from;
    this.to = to;
    this.amount = amount;

    this.trx_id = this.calculateHash();
    this.timestamp = Date.now();
  }

  calculateHash() {
    if( ! this.from ) throw new Error('Property "from" is not provided!');

    if(this.type === 'transfer') {  
      if( ! this.to ) throw new Error('Property "to" is not provied!');
      if( ! this.amount ) throw new Error('Property "amount" is not provided!');

      return SHA256(this.from + this.to + this.amount).toString();

    } else if (this.type === 'createAccount') {

      if( ! this.publicKey ) throw new Error('Public key is not provided for new account!')
      if( ! this.nickname ) throw new Error('Property "nickname" is not provied!');

      return SHA256(this.from + this.nickname + this.publicKey).toString();
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

  /*isValid(publicKey) {

    if( !this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }

    return publicKey.verify(this.calculateHash(), this.signature);
  }*/
}

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
      }, 1000);
    });
  }

  /*hasValidTransactions() {
    for( const trx of this.transactions) {
      if(!this.transactions[trx].isValid()){
        return false;
      }
    }
    return true;
  }*/
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.timer = 2000;
    this.pendingTransactions = {};
    this.miningReward = 100;
  }
  
  createGenesisBlock() {
    let firstTransaction = new Transaction({
      type: 'createAccount',
      from: 'virtualchain',
      nickname: 'virtualchain',
      publicKey: virtualChainPublicKey
    });
    firstTransaction.sign(virtualChainPublicKey, virtualChainPrivateKey );

    return new Block(0, {
      firstTransaction
    },'');
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
      
      //block.mine( this.difficulty )
      block.approve()
      .then( () => {
        console.log(`\n\nblock: ${block.hash}\ntrx: ${_.keys(block.transactions).length}\nnonce: ${block.nonce}`);
        this.chain.push(block);
        this.createTransaction(
          new Transaction({
            type: 'transfer',
            from: 'virtualchain',
            to: miningRewardAddress,
            amount: this.miningReward
          }),
          virtualChainPrivateKey 
        );
        resolve(block);
      });
    });
  }
  
  createTransaction( transaction, privateKey) {
    
    const account = this.getAccount(transaction.from);
    if( !account ) {
      throw new Error(`This account ${transaction.from} doesn\'t exist!`);
    }

    if( transaction.type === 'transfer' && !this.getAccount(transaction.to) ) {
      throw new Error('Recevier\'s account doesn\'t exist!');
    }

    transaction.sign(account.publicKey, privateKey);

    if( ! transaction.signature || transaction.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }

    const key = ec.keyFromPublic( account.publicKey, 'hex' );
    if( ! key.verify(transaction.calculateHash(), transaction.signature) ) {
      throw new Error('Transaction verifying failed');
    }

    this.pendingTransactions[transaction.trx_id] = transaction;
  }

  getAccount(nickname) {
    for(const block of this.chain) {
      for(const trx in block.transactions) {
        const tr = block.transactions[trx];
        if( tr.type === 'createAccount' && tr.nickname === nickname ) {
          return tr;
        }
      }
    }
    return null;
  }
  
  /*getBalanceOfAddress( address) {
    let balance = 0;
    
    for(let i = 0; i < this.chain.length; i++) {
      for(let j = 0; j < this.chain[i].transactions.length; j++) {
          if( this.chain[i].transactions[j].from === address) {
              balance -= this.chain[i].transactions[j].amount;
          }
          
          if( this.chain[i].transactions[j].to === address) {
              balance += this.chain[i].transactions[j].amount;
          }
      }
    }
    
    return balance;
  }*/
  
  /*isChainValid() {
    let status = {
        isValid: true,
    }
    
    for( let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i-1];
      
      if(currentBlock.hash !== currentBlock.calculateHash() ||
        currentBlock.previousHash !== prevBlock.hash) {
        status.brokenBlockIndex = i;
        status.isValid = false;
      }
    }
    return status;
  }*/
}

module.exports = {
  Blockchain,
  Transaction
}