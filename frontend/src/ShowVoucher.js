import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

const ShowVoucher = ({ ticket }) => (
		<div className="show-voucher">
			<div className="show-voucher__container">
				<table>
					<tr>
						<th>Серийный номер:</th>
						<td>{ticket.serialNumber}</td>
	              	</tr>
					<tr>
						<th>Фискальный накопитель:</th>
						<td>{ticket.fn}</td>
					</tr>
					<tr>
						<th>Фискальный документ:</th>
						<td>{ticket.fd}</td>
					</tr>
					<tr>
						<th>Фискальный признак документа:</th>
						<td>{ticket.fpd}</td>
					</tr>
					<tr>
						<th>Гарантия:</th>
						<td>{ticket.guaranteeTime}</td>
					</tr>
					{console.log(ticket)}
				</table>
			</div>
		</div>
	);	

export default ShowVoucher;