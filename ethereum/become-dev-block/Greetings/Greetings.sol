pragma solidity ^0.6.1;

contract Greetings {
  string message;

  constructor() public {
    message = "I'm ready!";
  }

  function setGreetings(string memory _message) public {
    message = _message;
  }

  function getGreetings() public view returns (string memory) {
    return message;
  }
}
