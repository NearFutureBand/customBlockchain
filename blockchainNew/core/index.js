const { Blockchain } = require('./Blockchain');
const { Transaction } = require('./Transaction');

let Virtual = new Blockchain();
console.log(`blockchain's started`);

const mineOnce = async (miner) => {
  console.log('mining...');
  const newBlock = await Virtual.minePendingTransactions(miner);
  return newBlock;
}

const automine = async () => {
  while(true) {
    const newBlock = await mineOnce('virtualchain');
    console.log(newBlock);
  }
}

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
})();
