pragma solidity ^0.4.18;

contract DoggieFactory {
    address[] public createdDoggiesList;

    function createDoggie(uint minimum, string name) public {
        address newDoggie = new Doggie(minimum, name, msg.sender);
        createdDoggiesList.push(newDoggie);
    }

    function getCreatedDoggiesList() public view returns (address[]) {
        return createdDoggiesList;
    } 
}

contract Doggie {
    address public manager;
    uint public minimumContribution;
    string public name;
    mapping(address => bool) public approvers;
    uint public approversCount;

    function Doggie(uint minimum, string dogname, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        name = dogname;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function getSummary()  public view returns (
        uint, string, uint, address
    ) {
        return (
            minimumContribution,
            name,
            this.balance,
            manager
        );
    }
}