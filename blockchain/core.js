const SHA256 = require('crypto-js/sha256');
const http = require('http');
const Static = require('node-static');
const WebSocketServer = new require('ws');

class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mine(difficulty) {
        while( this.hash.substring(0, difficulty) !== Array( difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        
        console.log('Block mined: ' + this.hash);
        
    }
    
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.timer = 2000;
        this.pendingTransactions = [];
        this.miningReward = 10;
    }
    
    createGenesisBlock() {
        return new Block(0, 0, '{"other":"Genesis Block"}', "0");
    }
    
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    
    minePendingTransactions(miningRewardAddress) {
        console.log('\n Starting the miner...');
        
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mine( this.difficulty);
        
        console.log('Block successfully mined!');
        this.chain.push(block);
        
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }
    
    createTransaction( transaction) {
        this.pendingTransactions.push( transaction);
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


/*let Virtual = new Blockchain();
Virtual.createTransaction(new Transaction('white43', 'blanketty46', 100));
Virtual.createTransaction(new Transaction('jollyRoger55', 'white43', 50));


Virtual.minePendingTransactions('white43');
console.log('\n Balance of miner is ', Virtual.getBalanceOfAddress('white43'));

Virtual.createTransaction(new Transaction('blanketty46', 'jollyRoger55', 50));

Virtual.minePendingTransactions('white43');
console.log('\n Balance of miner is ', Virtual.getBalanceOfAddress('white43'));
*/


// подключенные клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8081});

webSocketServer.on('connection', function(ws) {
  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  /*ws.on('message', function(message) {
    console.log('получено сообщение ' + message);

    for(var key in clients) {
      clients[key].send(message);
    }
  });*/

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});


// обычный сервер (статика) на порту 8080
var fileServer = new Static.Server('.');
http.createServer(function (req, res) {
  
  fileServer.serve(req, res);

}).listen(8080);

console.log("Блокчейн запущен на портах 8080, 8081");

let blocks = setInterval(() => {
  let hash = JSON.stringify( Date.now() );
  console.log(hash);
  for(var key in clients) {
    clients[key].send( hash );
  }
}, 2000);

