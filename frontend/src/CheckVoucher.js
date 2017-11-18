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

function sendForm(e) {
  e.preventDefault();
  const form = e.target;
  var data = form.querySelector('#idVoucher');
  axios.post('http://138.68.168.208:8545', {"numberVoucher": data.value})
}

const FormForCheck = () => (
    <div className="CheckVoucher">
        <div className="form-container">
          <Form className="form-request" onSubmit={sendForm}>
            <FormGroup>
              <ControlLabel>Введите данные для проверки</ControlLabel>
              <FormControl type="text" placeholder="Введите ID" id="idVoucher"/>
            </FormGroup>

            <Button type="submit" bsStyle="primary">
              Проверить гарантию
            </Button>
          </Form>
        </div>
    </div>
);

class CheckVoucher extends Component {
  render() {
    return (
        <div>
          <FormForCheck />
        </div>
    )
  }
}

export default CheckVoucher;