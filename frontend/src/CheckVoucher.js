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
import ok from './checkmark.png';
import wrong from './cross.png';
import { Route, Link, Switch} from 'react-router-dom';
import ShowVoucher from './ShowVoucher';

const FormForCheck = ({sendForm}) => (
    <div className="CheckVoucher">
      <div className="form-container">
        <Form className="form-request" id="check-form" onSubmit={sendForm}>
          <FormGroup>
            <ControlLabel>Введите данные для проверки</ControlLabel>
            <FormControl type="text" placeholder="Номер карты" id="cardNumber"/>
          </FormGroup>

          <Button type="submit" bsStyle="primary" className="custom-btn">
            Проверить гарантию
          </Button>
        </Form>
      </div>
    </div>
);

function checkData(date) {
  console.log(parseInt(date));
  return parseInt(date) > Date.now();
}

//{serialNumber: "test", fn: "125546", fd: "123165", fpd: "5486423", guaranteeTime: "54512"}
const ShowData = ({ data, loading, clearData }) => (
    loading
        ? <div>Подождите, идёт добавление информации в блокчейн</div>
        : <div>
      <Col xs={12} className="response-for-check">
        <div className="response-for-check__window">
          <div className="response-data">
            <table>
              <tr>
                <th>Название продукта</th>
                <th>Действительная гарантия</th>
              </tr>
              {
                data.tickets.sort((a, b) => {
                  return b.ticketId - a.ticketId;
                }).map(ticket => (
                  <tr key={ticket.ticketId}>
                    <td><Link to={`/check/ticket/${ticket.ticketId}`}>{ticket.productName}</Link></td>
                    <td className="td-img"><img src={checkData(ticket.guaranteeTime) ? ok : wrong} height="30px" /></td>
                  </tr>
                ))
              }
            </table>
          </div>
          <br/>
          <div>
            <Button onClick={clearData}> Ввести другой номер карты</Button>
          </div>
        </div>
      </Col>
    </div>
);

class CheckVoucher extends Component {
  state = {
    loading: false
  };

  clearData = () => {
    this.setState({data: null});
  };

  sendFormForCheck = (e) => {
    e.preventDefault();
    const form = e.target;
    var data = form.querySelector('#cardNumber');
    this.setState({
      loading: true,
      data: null
    }, () => {
      axios.get(`http://138.68.168.208:3000/account/${data.value}`)
          .then((result) => {
            console.log(result);
            this.setState({loading: false, data: result.data});
          });
    });

  };

  render() {
    const { data, loading } = this.state;
    return (
        <div>
          <Switch>
            <Route path="/check/ticket/:id" component={(rout) => {
              return <ShowVoucher 
                ticket={data && data.tickets && data.tickets.find((el) => rout.match.params.id === el.ticketId)} 
              />
            }} />
            <Route component={() => {
              return data
                  ? <ShowData clearData={this.clearData} data={data} loading={loading}/>
                  : <FormForCheck sendForm={this.sendFormForCheck}/>
            }} />
          </Switch>
          
        </div>
    )
  }
}

export default CheckVoucher;