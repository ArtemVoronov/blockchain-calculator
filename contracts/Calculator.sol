pragma solidity ^0.4.26;

contract Owned {
  address owner;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }
}

contract Mortal is Owned {
  function destroy() public onlyOwner {
    selfdestruct(owner);
  }
}

library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // This holds in all cases
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

contract Calculator is Mortal {
  using SafeMath for uint; // use the library for uint type
  event Add(string operation, uint256 a, uint256 b, uint256 result);
  event Sub(string operation, uint256 a, uint256 b, uint256 result);
  event Mul(string operation, uint256 a, uint256 b, uint256 result);
  event Div(string operation, uint256 a, uint256 b, uint256 result);

  function add(uint256 a, uint256 b) public returns (uint256) {
    uint256 result = a.add(b);
    emit Add("add", a, b, result);
    return result;
  }

  function sub(uint256 a, uint256 b) public returns (uint256) {
    uint256 result = a.sub(b);
    emit Sub("sub", a, b, result);
    return result;
  }

  function mul(uint256 a, uint256 b) public returns (uint256) {
    uint256 result = a.mul(b);
    emit Mul("mul", a, b, result);
    return result;
  }

  function div(uint256 a, uint256 b) public returns (uint256) {
    uint256 result = a.div(b);
    emit Div("div", a, b, result);
    return result;
  }

  function withdraw(uint withdraw_amount) public onlyOwner {
    require(withdraw_amount <= 1 ether);
    msg.sender.transfer(withdraw_amount);
  }

  function () external payable {}
}