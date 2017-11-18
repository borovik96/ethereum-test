pragma solidity ^0.4.18;

contract Voucher {
  struct ticket {
    string serialNumber;
    uint idTicket;
    uint numberVoucher;
    uint time;
  }
  mapping (uint => ticket) listOfTickets;
  uint idTickets;
  event gettingTicket(address addr, uint ticketId);
  event settingTicket(address addr, uint idTicket);

  function getTicket(uint idTicket) public constant returns(string , uint , uint) {
    gettingTicket(msg.sender, idTicket);
    return (listOfTickets[idTicket].serialNumber, listOfTickets[idTicket].numberVoucher, listOfTickets[idTicket].time);
  }

  function setTicket(uint numberVoucher, string serialNumber, uint time) public returns (uint){
    idTickets++;
    listOfTickets[idTickets].serialNumber = serialNumber;
    listOfTickets[idTickets].numberVoucher = numberVoucher;
    listOfTickets[idTickets].time = time;
    settingTicket(msg.sender, idTickets);
    return idTickets;
  }

}
