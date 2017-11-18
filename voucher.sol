pragma solidity ^0.4.18;

contract Voucher {

  struct Ticket {
    bytes16 serialNumber;
    bytes16 warrantyCase;
    uint fn;
    uint fd;
    uint fpd;
    uint guaranteeTime;
  }

  struct Buyer {
    uint amountOfTickets;
    mapping (uint => Ticket) listOfTickets;
  }

  mapping (uint => Buyer) listOfBuyers;
  uint countBuyers;
  event setTicketEvent(address addr, uint idTicket);

  function getAmountOfTickets(uint cardNumber) public constant returns(uint amount) {
    Buyer storage buyer = listOfBuyers[cardNumber];
    return buyer.amountOfTickets;
  }

  function getTickets(uint cardNumber, uint idTicket) public constant returns(
                                                            bytes16 _serialNumber,
                                                            uint _fn,
                                                            uint _fd,
                                                            uint _fpd,
                                                            uint _guaranteeTime,
                                                            bytes16 _warrantyCase
                                                            ) {
    Buyer storage buyer = listOfBuyers[cardNumber];
    return (buyer.listOfTickets[idTicket].serialNumber,
            buyer.listOfTickets[idTicket].fn,
            buyer.listOfTickets[idTicket].fd,
            buyer.listOfTickets[idTicket].fpd,
            buyer.listOfTickets[idTicket].guaranteeTime,
            buyer.listOfTickets[idTicket].warrantyCase);
  }

  function setTicket(uint cardNumber, uint fn, uint fd, uint fpd, bytes16 serialNumber, uint guaranteeTime, bytes16 warrantyCase) public returns (uint idTicket){
    Buyer storage buyer = listOfBuyers[cardNumber];
    buyer.amountOfTickets++;
    Ticket storage ticket = buyer.listOfTickets[buyer.amountOfTickets];
    ticket.serialNumber = serialNumber;
    ticket.fn = fn;
    ticket.fd = fd;
    ticket.fpd = fpd;
    ticket.guaranteeTime = guaranteeTime;
    ticket.warrantyCase = warrantyCase;
    return buyer.amountOfTickets;
  }

  function checkGuarantee(uint cardNumber, uint idTicket, uint time) public constant returns(uint restGuaranteeTime) {
    Buyer storage buyer = listOfBuyers[cardNumber];
    Ticket storage ticket = buyer.listOfTickets[idTicket];
    uint guaranteeTime = ticket.guaranteeTime;
    require(time <= guaranteeTime);
    return guaranteeTime - time;
  }

}
