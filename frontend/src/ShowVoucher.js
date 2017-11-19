import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

const ShowVoucher = ({ ticket, history }) => (

	<Col xs={12} className="response-for-check">
        
          <div className="response-data">
            <h2>Информация о последних покупках</h2>
			<table>
				<tr>
					<th id="serialNumber__text">Серийный номер:</th>
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
			</table>
          </div>
          <br/>
        	<Button onClick={history.goBack} className="custom-btn">Назад</Button>

      </Col>
	);	

export default ShowVoucher;