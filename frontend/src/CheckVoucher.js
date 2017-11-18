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

const FormForCheck = ({sendForm}) => (
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
                <th>Серийный номер:</th>
                <td>{data.serialNumber}</td>
              </tr>
              <tr>
                <th>Фискальный накопитель:</th>
                <td>{data.fn}</td>
              </tr>
              <tr>
                <th>Фискальный документ:</th>
                <td>{data.fd}</td>
              </tr>
              <tr>
                <th>Фискальный признак документа:</th>
                <td>{data.fpd}</td>
              </tr>
              <tr>
                <th>Гарантия:</th>
                <td>{data.guaranteeTime}</td>
              </tr>
            </table>
          </div>
          <br/>
          <div>
            <Button onClick={clearData}> Посмотреть другой товар</Button>
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
    var data = form.querySelector('#idVoucher');
    this.setState({
      loading: true,
      data: null
    }, () => {
      axios.get(`http://138.68.168.208:3000/ticket/${data.value}`)
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
          {
            data
                ? <ShowData clearData={this.clearData} data={data} loading={loading}/>
                : <FormForCheck sendForm={this.sendFormForCheck}/>
          }
        </div>
    )
  }
}

export default CheckVoucher;