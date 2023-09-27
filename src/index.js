import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Store from "./redux/Store";
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={Store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
);