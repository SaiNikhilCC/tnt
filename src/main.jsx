import React, {useState,Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/responsive.css"
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';




import './index.css'

import { Provider } from "react-redux";
import store from "./redux/store";
import Context from './Pages/Usecontext/Context.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Fragment >
  
    <Provider store={store}>
    <Context>
    <App />
    </Context>
    </Provider>
   
  </Fragment>,
)
