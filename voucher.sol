pragma solidity ^0.4.18;

contract Voucher {
  struct Ticket {
    bytes16 serialNumber;
    uint idTicket;
    uint8 numberVoucher;
    uint16 time;
  }
  mapping (uint => Ticket) listOfTickets;
  uint idTickets;
  event setTicketEvent(address addr, uint idTicket);

  function getTicket(uint idTicket) public constant returns(Ticket ticket) {
    return (listOfTickets[idTicket]);
  }

  function setTicket(uint8 numberVoucher, bytes16 serialNumber, uint16 time) public returns (uint){
    idTickets++;
    listOfTickets[idTickets].serialNumber = serialNumber;
    listOfTickets[idTickets].numberVoucher = numberVoucher;
    listOfTickets[idTickets].time = time;
    setTicketEvent(msg.sender, idTickets);
    return idTickets;
  }

}
