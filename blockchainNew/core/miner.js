const { parentPort, workerData } = require('worker_threads');
const SHA256 = require('crypto-js/sha256');

parentPort.on('message', (msg) => {
  //console.log('data', msg);
  parentPort.postMessage(msg.block);
  /*const { previousHash, timestamp, trxsStringified } = msg.block;
  
  const { difficulty } = msg;
  let { hash, nonce } = msg.block;

  const calculateHash = (nonce) => {
    return SHA256(previousHash + timestamp + trxsStringified + nonce).toString();
  }

  while( hash.substring(0, difficulty) !== Array( difficulty + 1).join('0')) {
    nonce++;
    hash = calculateHash();
  }
  console.log('mined');
  msg.block.hash = hash;*/
  parentPort.postMessage(msg.block);
});

//console.log('worker data: ', workerData);

/*try {
  const { previousHash, timestamp, trxsStringified } = workerData.block;
  
  const { difficulty } = workerData;
  let { hash, nonce } = workerData.block;

  const calculateHash = (nonce) => {
    return SHA256(previousHash + timestamp + trxsStringified + nonce).toString();
  }

  while( hash.substring(0, difficulty) !== Array( difficulty + 1).join('0')) {
    nonce++;
    hash = calculateHash();
    console.log(nonce);
  }
  console.log('mined');
  workerData.block.hash = hash;
  parentPort.postMessage(workerData.block);
} catch ( err ) {
  console.log(err);
};*/



/*function random(min, max) {
    return Math.random() * (max - min) + min
}

const sorter = require("./list-sorter");

const start = Date.now()
let bigList = Array(1000000).fill().map( (_) => random(1,10000))*/


/**
//вот как получить сообщение из главного потока:
parentPort.on('message', (msg) => {
    console.log("Main thread finished on: ", (msg.timeDiff / 1000), " seconds...");
})
*/

//sorter.sort(bigList);
//parentPort.postMessage({ val: sorter.firstValue, timeDiff: Date.now() - start});