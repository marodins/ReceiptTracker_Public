import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import "semantic-ui-css/semantic.min.css";
import "./css/root.css";

axios.defaults.baseURL = process.env.REACT_APP_BASE;
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
