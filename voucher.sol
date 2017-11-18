pragma solidity ^0.4.18;

contract Voucher {
  struct Ticket {
    bytes16 serialNumber;
    uint idTicket;
    uint16 fn;
    uint16 fd;
    uint16 fpd;
    uint16 guaranteeTime;
  }
  mapping (uint => Ticket) listOfTickets;
  uint idTickets;
  event setTicketEvent(address addr, uint idTicket);

  function getTicket(uint idTicket) public constant returns(Ticket ticket) {
    return (listOfTickets[idTicket]);
  }

  function setTicket(uint16 fn, uint16 fd, uint16 fpd, bytes16 serialNumber, uint16 guaranteeTime) public returns (uint){
    idTickets++;
    listOfTickets[idTickets].serialNumber = serialNumber;
    listOfTickets[idTickets].fn = fn;
    listOfTickets[idTickets].fd = fd;
    listOfTickets[idTickets].fpd = fpd;
    listOfTickets[idTickets].guaranteeTime = guaranteeTime;
    setTicketEvent(msg.sender, idTickets);
    return idTickets;
  }

  function checkGuarantee(uint idTicket, uint16 time) public constant returns(uint) {
    require(time <= listOfTickets[idTicket].guaranteeTime);
    return listOfTickets[idTicket].guaranteeTime - time;
  }

}
