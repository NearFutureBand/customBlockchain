const { Blockchain } = require('./Blockchain');
const _ = require('lodash');
const { Transaction } = require('./Transaction');

let Virtual = new Blockchain();
console.log(`blockchain's started`);

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
    //console.log(newBlock);
    showTransactions(newBlock);
    console.log('');
  }
}
automine();

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
  Virtual
};
