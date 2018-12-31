import React, { Component } from 'react';
import './HeaderComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
  render() {
    return (
<div className="jumbotron jumbotron-fluid">
      <div id="title" align="center">
          <h1>Canyon Technologies</h1>
          <h4>Project: Verizon </h4>
          <h4>Assignment: React CURD Operations </h4>
          </div>
</div>
    );
  }
}

export default Header;
