import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/HeaderComponent/headerComponent';
import Login from './components/LoginComponent/loginComponent';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Header/>, document.getElementById('header'));
serviceWorker.unregister();
