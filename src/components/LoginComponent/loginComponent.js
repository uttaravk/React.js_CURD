import React, { Component } from 'react';
import './LoginComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {render} from 'react-dom';
import Employee from '../EmpComponent/EmpComponent';


class Login extends Component {
  LoggedIn()
  {
    let flag=0;
    let empname = (document.getElementById('username')).value;
    let namepattern = "^[a-zA-Z0-9]+$";
    if (empname===null || empname==="" || empname.match(namepattern)==null)
    {
      alert("Please Enter Valid Username");
      flag=1;
    }
    let emppswd = (document.getElementById('pswd')).value;
    let pswdpattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    if (emppswd===null || emppswd==="" || emppswd.match(pswdpattern)==null)
    {
      alert("Please Enter Valid Password");
      flag=1;
    }
    if (flag===0){
      window.sessionStorage.setItem('loggedEmp',empname)
      render(<Employee/>, document.getElementById('app_content'));
    }
    else
    {
      render(<Login/>, document.getElementById('app_content'));
    }

  }
  render() {
    return (
      <div id="login_form" align="center">
      <h1>Employee Login</h1><br/>
      <label id="tooltip">
        Username: <input type="text" id="username"/>
        <span id="tooltiptext">
          <h4 id="instr">Only Alphanumeric Characters are Allowed</h4>
        </span>
      </label>
          <br/><br/>
          <label id="tooltip">
          Password: <input type="password" id="pswd"/>
            <span id="tooltiptext">
            <h4 id="instr2" align="left">Password Requirements: <br/> - Minimum 8 characters<br/> - At least one upper case English letter, <br/> - At least one lower case English letter, <br/> - At least one digit, <br/> - At least one special character</h4>
            </span>
            </label>
          <div id="buttons" align="center">
          <button type="button" id="login_button_2" className="btn btn-success" onClick={this.LoggedIn}>Login</button>
          </div>
          </div>
      );
  }
}
export default Login;
render(<Login/>, document.getElementById('app_content'));
