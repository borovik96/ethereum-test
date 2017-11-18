import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/lib/Button';
//import Grid from 'react-bootstrap/lib/Grid';
//import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';

function sendFormForAdd(e) {
  e.preventDefault();
  const form = e.tagret;
  const idVoucher = form.querySelector('#idVoucher');
  const serialNumber = form.querySelector('#serialNumber');
  const dateVoucher = form.querySelector('#date');
  const fn = form.querySelector('#fn');
  const fd = form.querySelector('#fd');
  const fpd = form.querySelector('#fpd');
  const guarantee = form.querySelector('#guarantee');
  axios.post('http://138.68.168.208:8545', {serialNumber, "guaranteeTime": dateVoucher, fn, fd, fpd, guarantee})
}

const FormForAddingNewVoucher = () => (
    <div className="form-container">
      <Form className="form-request" onSubmit={sendFormForAdd}>
        <FormGroup>
          <ControlLabel>Введите серийный номер</ControlLabel>
          <FormControl type="text" placeholder="Серийный номер" id="serialNumber"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Введите ФН</ControlLabel>
          <FormControl type="text" placeholder="ФН" id="fn"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Введите ФД</ControlLabel>
          <FormControl type="text" placeholder="ФД" id="fd"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Введите ФПД</ControlLabel>
          <FormControl type="text" placeholder="ФПД" id="fpd"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Введите дату</ControlLabel>
          <FormControl type="text" placeholder="Дата" id="date"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Введите срок гарантии</ControlLabel>
          <FormControl type="text" placeholder="Срок гарантии" id="guarantee"/>
        </FormGroup>

        <Button type="submit" bsStyle="primary">
          Создать контракт
        </Button>
      </Form>
    </div>
);

class NewVoucher extends Component {
  render() {
    return (
        <div>
          <FormForAddingNewVoucher />
        </div>
    )
  }
}

export default NewVoucher;