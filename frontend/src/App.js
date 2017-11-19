import React, { Component } from 'react';
import logo from './logo.svg';
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
import CheckVoucher from './CheckVoucher';
import NewVoucher from './NewVoucher';
import ShowVoucher from './ShowVoucher';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Route, Link} from 'react-router-dom';

const Main = () => (
    <div>
      <header className="App-header">
        <img src="https://png.icons8.com/?id=50284&size=280" className="App-logo" alt="logo"/>
        <div className="head-text">
          <h1>Project Name and Few Words</h1>
          <p>Any Description</p>
        </div>
      </header>
      <div className="main">
        <Col xs={5}>
          <div id="check-button">
            <p>Для проверки гарантии по Вашим покупкам, используйте номер Вашей банковской карты</p>
            <Link className="btn btn-default custom-btn" to="/check">Проверить гарантию</Link>
            <p>Для добавления новой записи в блокчейн, потребуется основная информация с чека и гарантийного талона</p>
            <Link className="btn btn-default custom-btn" to="/new">Добавить запись</Link>
          </div>
        </Col>
        <Col xs={7}>
          <img src="https://cdn.dribbble.com/users/1519660/screenshots/3449806/minnovare_04_v01.gif" height="573px" />
        </Col>
      </div>
    </div>
);

const Footer = () => (
    <footer>
      <p>Разработано на хакатоне FirstLine Software</p>
    </footer>
);

const ResponseForCheck = () => (
    <div className="response-for-check">

    </div>
);

class App extends Component {
  render() {
    return (
      //<div className="App">
      //  <header className="App-header">
      //    <img src={logo} className="App-logo" alt="logo" />
      //    <h1 className="App-title">Welcome to React</h1>
      //  </header>
      //  <p className="App-intro">
      //    To get started, edit <code>src/App.js</code> and save to reload.
      //  </p>
      //</div>
        <div className="App">
          <Route path="/" exact component={Main}/>
          <Route path="/check" component={CheckVoucher}/>
          <Route path="/new" component={NewVoucher}/>
          <Route path="/ticket/:id" component={ShowVoucher}/>
          <Footer />
        </div>
    );
  }
}

export default App;
