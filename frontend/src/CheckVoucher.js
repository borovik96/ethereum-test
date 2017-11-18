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

const ShowData = ({ data, loading, clearData }) => (
    loading
    ? <div>Подождите, идёт добавление информации в блокчейн</div>
    : <div>
      {data.toString()}
      <Button onClick={clearData}> Посмотреть другой товар</Button>
      </div>
);

class CheckVoucher extends Component {
  state = {
    loading: false
  };

  clearData = () => {
    this.setState({ data: null });
  };

  sendFormForCheck = (e) => {
    e.preventDefault();
    const form = e.target;
    var data = form.querySelector('#idVoucher');
    this.setState({
      loading: true,
      data: null
    });
    axios.get(`http://138.68.168.208:3000/ticket/${data.value}`)
      .then((result) => {
        this.setState({ loading: false, data: result.data });
      });
  };

  render() {
    const { data, loading } = this.state;
    return (
        <div>
          {
              data
                  ? <ShowData clearData={this.clearData} data={data} loading={loading} />
                  : <FormForCheck sendForm={this.sendFormForCheck} />
          }
        </div>
    )
  }
}

export default CheckVoucher;