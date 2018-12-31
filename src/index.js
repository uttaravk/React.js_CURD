import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/HeaderComponent/HeaderComponent';
import Login from './components/LoginComponent/LoginComponent';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Header/>, document.getElementById('header'));
serviceWorker.unregister();
