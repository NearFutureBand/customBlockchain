/**
 * paulwhite43
 * public 04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52
 * private 1eefe1060cee7c88a5f19253b11075d1d42e1fea5c8c6b65ceda1a290fdc6e16
 * 
 * blanketty46
 * public 04b87b0b0b3fd09106b5e3af3c1e176c8b47dfb1b4f540f1d8c6df85507ec35c98e20c008ac2621132f042158535c4ffac5778a14bbe4134c19581932d6208eee8
 * private d499d9ca50bdcddf75ac496e0577cb20beaff7d4248a5859f5a305caf9b92402
 * 
 * virtualchain
 * public 04f4d75d6390a9455629786fd0fa20268d30a1e989989925263808b0f722fda2e886bb347eb5811e43252816588d93334820af435317359b00637ea10b677a98ce
 * private d5db7c72e97476e3d9d2fb4a77ddbd86a68d25f61cfaf32525f4c23f3c1c4e16
 * 
 * 
 */
const { Blockchain } = require('./blockchain');
const virtualChainPublicKey = '04f4d75d6390a9455629786fd0fa20268d30a1e989989925263808b0f722fda2e886bb347eb5811e43252816588d93334820af435317359b00637ea10b677a98ce';
const virtualChainPrivateKey = 'd5db7c72e97476e3d9d2fb4a77ddbd86a68d25f61cfaf32525f4c23f3c1c4e16';

/**
 *  Instatiating the new entity of a blockchain
 */
let Virtual = new Blockchain();

module.exports = {
  Virtual,
  virtualChainPrivateKey,
  virtualChainPublicKey
}

/**
 * All connections to the blockchain's node
 */
let { clients } = require('./server');

/**
 * Calls mining function consistently to mine blocks one by one - local mining, 'one node' mode
 */
const automine = () => {
  Virtual.minePendingTransactions(virtualChainPublicKey)
  .then( (block) => {
    for(var key in clients) {
      clients[key].send( JSON.stringify( block ) );
    }
    setTimeout( () => {automine()});
  })
}

/**
 * Start automining
 */
automine();
console.log('blockchain node started');








