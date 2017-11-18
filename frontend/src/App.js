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

const Main = () => (
    <div>
      <header className="App-header">
        <img src="https://png.icons8.com/?id=50284&size=280" className="App-logo" alt="logo"/>
        <div className="head-text">
          <h1>Project Name and Few Words</h1>
          <p>Any Description</p>
        </div>
      </header>
      <div className="description">
        <Col xs={12}>
          <h2>About Us</h2>
          <p>Какой-нибудь текст о компании и о проекте</p>
        </Col>
      </div>
      <div className="main">
        <Col xs={6}>
          <div id="check-button">
            <p>Что-то</p>
            <ButtonToolbar>
              <Button bsStyle="primary" bsSize="large">Проверить гарантию</Button>
            </ButtonToolbar>
          </div>
        </Col>
        <Col xs={6}>
          Image
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
          <Main />
          <CheckVoucher />
          <Footer />
        </div>
    );
  }
}

export default App;
