import {  jssPreset, StylesProvider } from '@material-ui/core';
import { create } from 'jss';
import rtl from "jss-rtl";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider jss={jss}>
      <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
