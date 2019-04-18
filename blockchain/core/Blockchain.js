class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = {};
    this.miningReward = 100;
  }
  
  createGenesisBlock() {
    /*let firstTransaction = new Transaction({
      type: 'createAccount',
      from: 'virtualchain',
      nickname: 'virtualchain',
      publicKey: virtualChainPublicKey
    });
    firstTransaction.sign(virtualChainPublicKey, virtualChainPrivateKey );*/

    return new Block(0, {
      //firstTransaction
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
        this.addTransaction(
          new Transaction({
            type: 'transfer',
            from: 'virtualchain',
            to: miningRewardAddress,
            amount: this.miningReward,
            memo: 'mining reward'
          }),
          virtualChainPrivateKey 
        );
        resolve(block);
      });
    });
  }
  
  /**
   * Transaction sould be already signed
   * @param {*} transaction 
   */
  addTransaction( transaction) {
    if( this.validateIncomingTransaction( transaction, privateKey ) ) {
      this.pendingTransactions[transaction.trx_id] = transaction;
    }
  }

  validateIncomingTransaction(transaction, privateKey) {
    /*const account = this.getAccount(transaction.from);
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
    }*/

    return true;
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

  getBalanceOfAddress( address) {
    /*let balance = 0;
    
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
    
    return balance;*/
  }
  
  isChainValid() {
    /*let status = {
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
    return status;*/
  }
}

module.exports = {
  Blockchain
}