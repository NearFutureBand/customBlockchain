const SHA256 = require('crypto-js/sha256');
const http = require('http');
const Static = require('node-static');
const WebSocketServer = new require('ws');
const _ = require('lodash');

class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.trx_id = SHA256(from + to + amount).toString();
        this.timestamp = Date.now();
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
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
            }, 2000);
        });
    }
    
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
        return new Block(0, {});
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
                this.createTransaction( new Transaction('virtual', miningRewardAddress, this.miningReward) );
                resolve(block);
            });            
        });
    }
    
    createTransaction( transaction) {
        this.pendingTransactions[transaction.trx_id] = transaction;
    }
    
    getBalanceOfAddress( address) {
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
let clients = {};
let webSocketServer = new WebSocketServer.Server({port: 8081});

webSocketServer.on('connection', function(ws) {
  let id = Math.random();
  clients[id] = ws;
  console.log(`New connection ${id}`);

  ws.on('close', () => {
    console.log(`Connection closed ${id}`);
    delete clients[id];
  });

  ws.on('message', (req) => {
    const trx = JSON.parse(req);
    Virtual.createTransaction(new Transaction(trx.from, trx.to, trx.amount) );
    console.log(`\nnew transaction: ${req}`);
  });
});

let fileServer = new Static.Server('.');
http.createServer(function (req, res) {
  fileServer.serve(req, res);
}).listen(8080);

console.log(`Blockchain runs on 8080, 8081 ports`);


/*let amount = 10;
let transactionsFlow = setInterval(async () => {
    Virtual.createTransaction(new Transaction('jollyRoger55', 'blanketty46', amount++) );
    console.log('\nnew transaction: ', JSON.stringify( Virtual.pendingTransactions ));
}, 3000);*/

function automine(){
    Virtual.minePendingTransactions('')
    .then( (block) => {
        for(var key in clients) {
            clients[key].send( JSON.stringify( block ) );
        }
        setTimeout( () => {automine()});
    })
}

automine();








