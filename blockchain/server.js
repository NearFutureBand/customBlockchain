const WebSocketServer = new require('ws');
const { Blockchain } = require('./core/Blockchain');
const { Transaction } = require('./core/Transaction');
const _ = require('lodash');
const fs = require('fs');


let Virtual = new Blockchain();
console.log(`blockchain's started`);
fs.open('miner-logs.txt', 'w', () => {});

let clients = {};
let webSocketServer = new WebSocketServer.Server({port: 8081});

webSocketServer.on('connection', (ws) => {
  let id = Math.random();
  clients[id] = ws;
  console.log(`New connection ${id}`);

  ws.on('close', () => {
    console.log(`Connection closed ${id}`);
    delete clients[id];
  });

  ws.on('message', (req) => {
    const trx = JSON.parse(req);
    const { from, to, amount } = trx;
    Virtual.addTransaction(
      new Transaction({
        from,
        to,
        amount
      })
    );
    console.log(`\nnew transaction: ${req}`); 
  });

  console.log(`Websocket connection: 8081`);
});

const sendNewBlockToClients = (block) => {
  for(let key in clients) {
    clients[key].send( JSON.stringify( block ) );
  }
}
const showTransactions = (block) => {
  console.log('trxs: ');
  _.forIn(block.transactions, (trx) =>{
    console.log(`   from: ${trx.from}, to: ${trx.to}, amount: ${trx.amount}`);
  });
}
const mineOnce = async (miner) => {
  console.log('mining...');
  const newBlock = await Virtual.minePendingTransactions(miner);
  return newBlock;
}
const automine = async () => {
  while(true) {
    const newBlock = await mineOnce('virtualchain');
    // new block is here
    showTransactions(newBlock);
    sendNewBlockToClients(newBlock);
    console.log('');
  }
}
automine();

/**this is test function */
(async() => {
  Virtual.addTransaction(
    new Transaction({
      from: 'One',
      to: 'Two',
      amount: '100 BTC'
    })
  );
  const newBlock = await mineOnce();
  Virtual.addTransaction(
    new Transaction({
      from: 'Two',
      to: 'Three',
      amount: '150 BTC'
    })
  );
  Virtual.addTransaction(
    new Transaction({
      from: 'Four',
      to: 'Five',
      amount: '1 BTC'
    })
  );
  await mineOnce();
  return 0;
});

module.exports = {  
  webSocketServer,
  clients,
  Virtual
}