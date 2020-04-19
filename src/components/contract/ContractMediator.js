import React from 'react';
import Web3 from "web3";
import {Client} from "node-rest-client-promise"

class ContractMediator {

  /**
   * @param props {Object}  infuraProjectId: "string", contractAddress: "string"
   * @param {string} props.infuraNetworkName - The name of the network in the https://infura.io.
   * @param {string} props.infuraProjectId - The prject ID in the https://infura.io
   * @param {string} props.contractAddress - The smart contract address that imlements basic four arithmetic operations
   */
  constructor(props) {
    let self = this;

    self.state = {
      infuraNetworkName: props.infuraNetworkName,
      infuraProjectId: props.infuraProjectId,
      contractAddress: props.contractAddress,
      web3: new Web3(new Web3.providers.HttpProvider(`https://${props.infuraNetworkName}.infura.io/v3/${props.infuraProjectId}`)),
      etherescanURL : `https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${props.contractAddress}`,
      contractInitialized: false,
      contract: undefined
    }

    const client = Client();
    client.getPromise(self.state.etherescanURL)
        .then((client_promise) => {
          let contractABI = JSON.parse(client_promise.data.result);

          return new Promise((resolve, reject) => {
            let contract = new self.state.web3.eth.Contract(contractABI, self.state.contractAddress);
            try {
              resolve(contract);
            } catch (ex) {
              reject(ex);
            }
          });

        })
        .then((contract) => {
          self.state = {
            contract: contract,
            contractInitialized: true
          }
        });
  }

  /**
   *
   * @param a
   * @param b
   * @returns {Promise<*>}
   */
  add = (a, b) => {
    let self = this;
    if (!this.state.contractInitialized)
      throw new Error("contract is not initialized");

    return self.state.contract.methods.add(a,b).call();
  }

  /**
   *
   * @param a
   * @param b
   * @returns {Promise<*>}
   */
  sub = (a, b) => {
    let self = this;
    if (!this.state.contractInitialized)
      throw new Error("contract is not initialized");

    return self.state.contract.methods.sub(a,b).call();
  }

  /**
   *
   * @param a
   * @param b
   * @returns {Promise<*>}
   */
  mul = (a, b) => {
    let self = this;
    if (!this.state.contractInitialized)
      throw new Error("contract is not initialized");

    return self.state.contract.methods.mul(a,b).call();
  }

  /**
   *
   * @param a
   * @param b
   * @returns {Promise<*>}
   */
  div = (a, b) => {
    let self = this;
    if (!this.state.contractInitialized)
      throw new Error("contract is not initialized");

    return self.state.contract.methods.div(a,b).call();
  }
}

export default ContractMediator