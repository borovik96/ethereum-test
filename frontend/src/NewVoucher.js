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

const FormForAddingNewVoucher = () => (
    <div className="form-container">
      <Form className="form-request">
        <FormGroup>
          <ControlLabel>Введите номер чека</ControlLabel>
          <FormControl type="text" placeholder="Номер чека"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Введите серийный номер</ControlLabel>
          <FormControl type="text" placeholder="Серийный номер"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Введите дату</ControlLabel>
          <FormControl type="text" placeholder="Дата"/>
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