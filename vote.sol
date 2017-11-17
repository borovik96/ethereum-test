pragma solidity ^0.4.18;

import "./stringUtils.sol";
//import "https://github.com/ethereum/dapp-bin/library/stringUtils.sol";

contract Ownership {

    address owner;

    function Ownership() public {
        require(owner == 0);
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }

}

contract Voting is Ownership {

    //Структура кандидата
    struct Candidate {
      string name;
      uint32 numberOfVotes;
    }

    struct Ballot {
      uint8 id;
      string name;
      mapping (string => Candidate) listOfCandidates;//массив с кандидатами
      mapping (address => bool) allow; // массив голосовавших
    }

    mapping (uint8 => Ballot) listOfBallots;
    uint8 ballotsIndex = 1;


    event ballotAdded(string name, uint8 id);
    function addBallot(string name) public onlyOwner returns(uint8) { // TODO Is possible same name
      listOfBallots[ballotsIndex].id = ballotsIndex;
      listOfBallots[ballotsIndex].name = name;
      ballotsIndex++;
      ballotAdded(name, id);
      return ballotsIndex - 1;
    }

    function addCandidate(uint8 ballotId, string name) public onlyOwner  returns (string id) {
        Ballot storage ballot = listOfBallots[ballotId];
        require(!StringUtils.equal(ballot.listOfCandidates[name].name, name));
        ballot.listOfCandidates[name].name = name;
        ballot.listOfCandidates[name].numberOfVotes = 0;
        return ballot.listOfCandidates[name].name;
    }

    function voting(uint8 ballotId, string name) public returns (uint32) {
        Ballot storage ballot = listOfBallots[ballotId];
        require(!ballot.allow[msg.sender]);
        require(StringUtils.equal(ballot.listOfCandidates[name].name, name));
        ballot.allow[msg.sender] = true;
        ballot.listOfCandidates[name].numberOfVotes++;
        return ballot.listOfCandidates[name].numberOfVotes;
    }
}
