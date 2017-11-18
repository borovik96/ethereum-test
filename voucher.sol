pragma solidity ^0.4.18;

contract Voucher {
  struct ticket {
    bytes16 serialNumber;
    uint idTicket;
    uint8 numberVoucher;
    uint16 time;
  }
  mapping (uint => ticket) listOfTickets;
  uint idTickets;
  event setTicketEvent(address addr, uint idTicket);

  function getTicket(uint idTicket) public constant returns(bytes16 , uint8 , uint16) {
    return (listOfTickets[idTicket].serialNumber, listOfTickets[idTicket].numberVoucher, listOfTickets[idTicket].time);
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
