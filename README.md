# Blockchain example made from scratch

This project contains a locally working node. The core code (Block, Transaction, Blockchain classes) were written according to [this video](https://www.youtube.com/watch?v=zVqczFZr124).
Also I've added a front-end part, a client, to give the possibility to watch how blockchain works in realtime.

## Getting Started

Follow this instruction to run all the system on your machine.

Clone the repo
```
git clone git@github.com:NearFutureBand/customBlockchain.git
cd customBlockchain/
```

Install dependencies for the blockchain
```
cd blockchain/ && npm install
```

First run the blockchain's node
```
node core
```
It immediately starts to produce blocks in automining mode and shows hashes in the console

Then open the client by just clicking on the index.html file in the /client/dist folder.
You'll see that all the information about blocks and transactions inside them comes to you in realtime.

Also you can run the development server to set some experiment in the front-end part.
Open another console in client folder and install the dependencies
```
npm install
```

Then start the dev server
```
npm start
```

Notice that dev server should be launched on some port that is not equal to 8080 or 8081!

## Built With

* [Node.js]()
* [ws](https://www.npmjs.com/package/ws) - The WebSockets library for Node.js
* [crypto-js](https://www.npmjs.com/package/crypto-js) - Library with hash functions and many other connected with cryptography
* [React.js]()

## Contributing


## Authors

Pavel Belyakov (Paul White)
* [GitHub](https://github.com/NearFutureBand)
* [LinkedIn](https://www.linkedin.com/in/%D0%BF%D0%B0%D0%B2%D0%B5%D0%BB-%D0%B1%D0%B5%D0%BB%D1%8F%D0%BA%D0%BE%D0%B2-035b1b162/)
* Telegram - @paulWhite43


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
