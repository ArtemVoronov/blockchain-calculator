# Blockchain Calculator

It's just a simple prototype of calculator that uses smart contract on Ethereum as math engine. It consists of:
1. Front-end part: web UI based on React library.
2. Back-end part: HTTP client that sends requests to smart contract via web3.js library and Infura platform (https://infura.io)
3. And the following smart contract that was made using Solidiry and that was published here: https://ropsten.etherscan.io/address/0x57034b120d342bc91db3e1bede7432b00103b2d0
   The source code of it could be viewed at the above link or here https://github.com/ArtemVoronov/blockchain-calculator/blob/master/contracts/Calculator.sol

# How to use it
1. Run the following commands in a terminal:
```
git clone git@github.com:ArtemVoronov/blockchain-calculator.git
cd blockchain-calculator
npm install
npm start
```
2. Then open http://localhost:8080
