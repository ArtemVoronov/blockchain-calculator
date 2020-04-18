#!/usr/bin/env node
var Web3 = require('web3');
var client = require('node-rest-client-promise').Client();

var web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/19bedf7039de478f8bf81380f92791d7'
));

var our_contract_address = "0x57034b120d342bc91db3e1bede7432b00103b2d0"; //https://ropsten.etherscan.io/address/0x57034b120d342bc91db3e1bede7432b00103b2d0

// web3.eth.getBalance(our_contract_address).then(function(balance) {
//     console.log(`Balance of ${our_contract_address}: ${balance}`);
// })

var etherescan_url = `https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${our_contract_address}`
console.log(etherescan_url); //https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0x57034b120d342bc91db3e1bede7432b00103b2d0

// Now we are going to deal with the contract from web3.js in a non-block fashion (async mode)
client.getPromise(etherescan_url)
    .then((client_promise) => {
        // Leave this two lines for fure object analisys
        //const util = require('util')
        //console.log(util.inspect(client_promise, false, null))

        // We get here our contract ABI
        var our_contract_abi = JSON.parse(client_promise.data.result);

        // And now we create a promise to consume later
        return new Promise((resolve, reject) => {
            var our_contract = new web3.eth.Contract(our_contract_abi, our_contract_address);
            try {
                // If all goes well
                resolve(our_contract);
            } catch (ex) {
                // If something goes wrong
                reject(ex);
            }
        });

    })
    .then((our_contract) => {
        // Let's see our contract address
        console.log(`Our Contract address:  ${our_contract._address}`);

        // or in this other way
        console.log(`Our Contract address in other way:  ${our_contract.options.address}`);

        // Now our contract abi
        console.log("Our contract abi: " + JSON.stringify(our_contract.options.jsonInterface));
    });