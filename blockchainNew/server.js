const WebSocketServer = new require('ws');
const { Virtual } = require('./core/index');
const { Transaction } = require('./core/Transaction');

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
});

console.log(`Websocket connection: 8081`);

module.exports = {  
  webSocketServer,
  clients
}