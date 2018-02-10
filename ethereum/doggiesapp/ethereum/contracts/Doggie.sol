pragma solidity ^0.4.18;

contract DoggieFactory {
    address[] public createdDoggiesList;

    function createDoggies(uint minimumContrib) public {
        address newDoggie = new Doggie(minimumContrib, msg.sender);
        createdDoggiesList.push(newDoggie);
    }

    function getCreatedDoggiesList() public view returns (address[]) {
        return createdDoggiesList;
    } 
}

contract Doggie {
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    function Doggie(uint minimumContrib, address creator) public {
        manager = creator;
        minimumContribution = minimumContrib;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function getSummary()  public view returns (
        uint, uint, address
    ) {
        return (
            minimumContribution,
            this.balance,
            manager
        );
    }
}