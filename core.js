const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    
    createGenesisBlock() {
        return new Block(0, 0, '{"other":"Genesis Block"}', "0");
    }
    
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    
    isChainValid() {
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
    }
}

let Virtual = new Blockchain();
Virtual.addBlock(new Block(1, Date.now(), {amount: 4}));
Virtual.addBlock(new Block(2, Date.now(), {amount: 5}));
Virtual.addBlock(new Block(3, Date.now(), {amount: 100}));


console.log(JSON.stringify(Virtual, null, 4));

console.log( JSON.stringify(Virtual.isChainValid(), null, 4));