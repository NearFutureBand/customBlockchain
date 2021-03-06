const WebSocketServer = new require('ws');
const express = require('express');
const { Virtual} = require('./core');
const { Transaction } = require('./blockchain');

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

    if(trx.type === 'transfer') {

      Virtual.addTransaction(
        new Transaction({
          type: 'transfer',
          from: trx.from, 
          to: trx.to, 
          amount: trx.amount,
          memo: trx.memo
        }),
        trx.privateKey
      );

    } else if( trx.type === 'createAccount') {

      Virtual.addTransaction(
        new Transaction({
          type: 'createAccount',
          from: trx.from,
          nickname: trx.nickname,
          publicKey: trx.publicKey,
          memo: trx.memo
        }),
        trx.privateKey
      );
    }

    console.log(`\nnew transaction: ${req}`);    
  });
});

console.log(`Websocket connection: 8081`);

const app = express();
app.listen(8080);
console.log('Static server: 8080');
app.get('/chain-info', (req, res) => res.send('Virtual chain 2.0'));

/*app.post('/transaction', (req, res) => {
})*/

module.exports = {  
  webSocketServer,
  app,
  clients
}