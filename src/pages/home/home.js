import React, {Component} from 'react';
import classes from './home.css';
import ContractMediator from "../../components/contract/ContractMediator";

class HomePage extends Component {
  constructor(props) {
    super(props);

    let self = this;
    let contractMediator = new ContractMediator({
      infuraNetworkName: 'ropsten',
      infuraProjectId: '19bedf7039de478f8bf81380f92791d7',
      contractAddress: '0x57034b120d342bc91db3e1bede7432b00103b2d0'
    });

    self.state = {
      contractMediator: contractMediator,
      value1: '0',
      value2: '0',
      result: '0'
    };
  }

  doMath = (operation, value1, value2) => {
    if (!operation || isNaN(value1) || isNaN(value2))
      return

    let self = this;
    operation(value1, value2).then(function(result){
      console.log(`result of operation: ${result}`);
      self.setState({result: result});
    }).catch(function(err) {
      console.log(err);
    });
  }

  handleChangeValue1 = (event) => {
    this.setState({value1: event.target.value});
  }

  handleChangeValue2 = (event) => {
    this.setState({value2: event.target.value});
  }

  render() {
    let self = this;
    return (
        <div className={classes.wrapper}>
          <h1>Welcome to blockchain calculator!</h1>
          <h2>Actually it is not real calculator, just a prototype!</h2>
          <h3>For now it can perform operations with integer numbers only! And it unable to work with negative numbers!</h3>
          <h4>And it can't substract bigger numbers from smaller numbers! But it still have some useful use cases!</h4>
          <div className={classes.calculatorPanel}>
            <div>
              <input type="text" value={self.state.value1} onChange={this.handleChangeValue1}/>
            </div>
            <div className={classes.operationButtons}>
              <button onClick={() => self.doMath(self.state.contractMediator.add, Number.parseInt(self.state.value1),  Number.parseInt(self.state.value2))}>+</button>
              <button onClick={() => self.doMath(self.state.contractMediator.sub, Number.parseInt(self.state.value1),  Number.parseInt(self.state.value2))}>-</button>
              <button onClick={() => self.doMath(self.state.contractMediator.mul, Number.parseInt(self.state.value1),  Number.parseInt(self.state.value2))}>*</button>
              <button onClick={() => self.doMath(self.state.contractMediator.div, Number.parseInt(self.state.value1),  Number.parseInt(self.state.value2))}>/</button>
            </div>
            <div>
              <input type="text" value={self.state.value2} onChange={this.handleChangeValue2}/>
            </div>
            <div>
              =
            </div>
            <div>
              {self.state.result}
            </div>
          </div>
        </div>
    );
  }
}

export default HomePage;

