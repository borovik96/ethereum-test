import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/lib/Button';
//import Grid from 'react-bootstrap/lib/Grid';
import Jumbotron   from 'react-bootstrap/lib/Jumbotron';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Loader from './Loader';
import { Route, Link, Switch} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import newImage from './new-background.jpg';

const FormForAddingNewVoucher = ({sendForm, loading, calendarOnChange, calendar}) => {
  if (loading) return <Loader />;
  return (
    <div className="form-container">

        <Form className="form-request" onSubmit={sendForm}>
          <FormGroup>
            <ControlLabel>Введите номер карты</ControlLabel>
            <FormControl type="text" placeholder="Номер карты" id="cardNumber"/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Введите название продукта</ControlLabel>
            <FormControl type="text" placeholder="Имя продукта" id="productName"/>
          </FormGroup>
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
            <ControlLabel>Введите срок гарантии</ControlLabel>
            <FormControl type="text" placeholder="Срок гарантии" id="guarantee"/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Опишите гарантийные случаи</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Гарантийные случаи" id="warrantyCase"/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Введите дату</ControlLabel>
            <DatePicker className="form-control" selected={calendar} onChange={calendarOnChange} />
          </FormGroup>

          <Button type="submit" bsStyle="primary" className="custom-btn">
            Создать контракт
          </Button>
        </Form>

    </div>
)};

const ShowData = ({ data, loading, clearData }) => {
  if (loading) return <div>Loading</div>;
  return <div>
          <Jumbotron>
            <h1>Данные записаны в Blockchain</h1>
            <p>Вы всегда можете их восстановить по номеру Вашей банковской карты!</p>
            <a className="btn btn-default custom-btn" href={`https://ropsten.etherscan.io/tx/${data.transactionHash}`}>Посмотреть транзакцию</a>
          </Jumbotron>
        </div>
};

class NewVoucher extends Component {
  state = {
    loading: false, 
    data: null,
    calendar: moment()
  };

  calendarOnChange = (date) => {
    this.setState({calendar: date});
  }

  sendForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const serialNumber = form.querySelector('#serialNumber').value;
    const dateOfBuying = this.state.calendar.format('x');
    const fn = form.querySelector('#fn').value;
    const fd = form.querySelector('#fd').value;
    const fpd = form.querySelector('#fpd').value;
    const during = form.querySelector('#guarantee').value;
    const cardNumber = form.querySelector('#cardNumber').value;
    const productName = form.querySelector('#productName').value;
    const warrantyCase = form.querySelector('#warrantyCase').value;
    this.setState({loading: true});
    axios.post(
        'http://138.68.168.208:3000/ticket',
        {productName, cardNumber, serialNumber, dateOfBuying, fn, fd, fpd, during, warrantyCase}
    ).then((res) => {
      this.setState({loading: false, data: res.data});
    });
  };

  clearData = () => {
    this.setState({data: null});
  };

  render() {
    const { loading, data, calendar } = this.state;
    window.cal = calendar;
    // const data = {
    //   args: {
    //     idTicket: 1
    //   }
    // }, loading = false;
    return (
        <div>
          {
            data
                ? <ShowData data={data} clearData={this.clearData}/>
                : <FormForAddingNewVoucher 
                    calendarOnChange={this.calendarOnChange} 
                    loading={loading} 
                    calendar={calendar}
                    sendForm={this.sendForm}/>
          }
        </div>
    )
  }
}

export default NewVoucher;