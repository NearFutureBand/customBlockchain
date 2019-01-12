const { Blockchain, Transaction } = require('./blockchain');
const _ = require('lodash');

const TestNet = new Blockchain();

TestNet.createTransaction(
    new Transaction({
      type: 'createAccount',
      publicKey: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
      nickname: 'paulWhite43',
      from: 'virtualchain'
    }),
    'd5db7c72e97476e3d9d2fb4a77ddbd86a68d25f61cfaf32525f4c23f3c1c4e16'
);

/*TestNet.createTransaction( 
    new Transaction({
        type: 'transfer',
        from: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
        to: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
        amount: 1
    }),
    '1eefe1060cee7c88a5f19253b11075d1d42e1fea5c8c6b65ceda1a290fdc6e16'
);


TestNet.createTransaction( 
    new Transaction({
        type: 'transfer',
        from: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
        to: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
        amount: 2
    }),
    '1eefe1060cee7c88a5f19253b11075d1d42e1fea5c8c6b65ceda1a290fdc6e16'
);*/

TestNet.minePendingTransactions(
    'virtualchain'
).then(() => {
    TestNet.minePendingTransactions(
        'virtualchain'
    )/*.then(() => {
        TestNet.minePendingTransactions(
            '04f4d75d6390a9455629786fd0fa20268d30a1e989989925263808b0f722fda2e886bb347eb5811e43252816588d93334820af435317359b00637ea10b677a98ce'
        )
    })*/
})



setTimeout(() => {
   
    console.log( TestNet.chain ); 
    
}, 4000);


