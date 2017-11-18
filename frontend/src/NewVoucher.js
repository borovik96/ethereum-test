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

const FormForAddingNewVoucher = ({sendForm}) => (
    <div className="form-container">
      <Form className="form-request" onSubmit={sendForm}>
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

const ShowData = ({ data, loading, clearData }) => {
  if (loading) return <div>Loading</div>;
  return <div>
    <p>Id: {data.id}</p>
  </div>
}

class NewVoucher extends Component {
  state = {
    loading: false,
    data: null
  }

  sendForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const serialNumber = form.querySelector('#serialNumber').value;
    const dateVoucher = form.querySelector('#date').value;
    const fn = form.querySelector('#fn').value;
    const fd = form.querySelector('#fd').value;
    const fpd = form.querySelector('#fpd').value;
    const guarantee = form.querySelector('#guarantee').value;
    this.setState({ loading: true });
    axios.post(
        'http://138.68.168.208:3000/ticket',
        {serialNumber, "guaranteeTime": dateVoucher, fn, fd, fpd, guarantee}
    ).then((res) => {
        this.setState({ loading: false, data: res.data });
    });
  };

  clearData = () => {
    this.setState({ data: null });
  };

  render() {
    const { loading, data } = this.state;
    return (
        <div>
          {
              data
                ? <ShowData loading={loading} data={data} clearData={this.clearData} />
                : <FormForAddingNewVoucher sendForm={this.sendForm} />
          }
        </div>
    )
  }
}

export default NewVoucher;