const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publickKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log(`private: ${privateKey}`);
console.log(`\npublick: ${publickKey}`);