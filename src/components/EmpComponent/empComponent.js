import React, { Component } from 'react';
import './empComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../LoginComponent/loginComponent';
import {render} from 'react-dom';
import axios from "axios";


class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
}

  handleLogout()
  {
    sessionStorage.clear();
    render(<Login/>, document.getElementById('app_content'));
  }
  retrieveEmployeeData() {
      var message="";
      var reqid = (document.getElementById('empid')).value;
      var url='http://104.248.219.208:8080/cts/employee?empId='+reqid;
      console.log(url);
      axios
        .get(url)
        .then(function(response) {
          if (response.data.firstName)
          {
                      console.log(response.data.firstName);
                      message="User Found!";
                      console.log(message)
                      document.getElementById('msg').innerHTML=message;
          }
          else {
            message="User not found. Create a new user.";
            console.log(message)
            document.getElementById('msg').innerHTML=message;
          }

          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
          var message="User Not Found. Create a New User.";
          console.log(message)
          document.getElementById('msg').innerHTML=message;
        });
}

deleteEmployee(){
    var message="";
    var reqid = (document.getElementById('empid')).value;
    var url='http://104.248.219.208:8080/cts/employee?empId='+reqid;
    console.log(url);
    axios
      .get(url)
      .then(function(response) {
        if (response.data.firstName)
        {
                    console.log(response.data.firstName);

                    var urldel="http://104.248.219.208:8080/cts/employee?empId="+reqid;
                    axios
                      .delete(urldel)
                      .then(function(response) {
                        if (response.status==200)
                        {
                          message="User Deleted Successfully!";
                          console.log(message)
                        }
                        else {
                          message="Deletion Failed";
                          console.log(response)
                        }
                        document.getElementById('msg').innerHTML=message;
                      })
        }
        else {
          message="User not found. Cannot delete the records!";
          console.log(message)
          document.getElementById('msg').innerHTML=message;
        }
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
        var message="User Not Found. Create a New User.";
        console.log(message)
        document.getElementById('msg').innerHTML=message;
      });
}
saveEmployee(){
  var addfirstname=document.getElementById('empnamefirst').value;
  var addlastname=document.getElementById('empnamelast').value;
  var addstreet=document.getElementById('street').value;
  var addcity=document.getElementById('city').value;
  var addstate=document.getElementById('state').value;
  var addcountry=document.getElementById('country').value;
  var addzip=document.getElementById('zip').value;
  // var addHobbies=document.getElementsByClassName('checkbox')
  var json = '{"firstName":"'+addfirstname+'","lastName":"'+addlastname+'","address":{"street":"'+addstreet+'","city":"'+addcity+'","state":"'+addstate+'","country":"'+addcountry+'","zip":'+addzip+'}}';
  console.log(json)
  var empdata = JSON.parse(json);
  var message="";
  var url="http://104.248.219.208:8080/cts/employee";
  console.log(url);
  axios
    .post(url, empdata)
    .then(function(response) {
      if (response.status=200)
      {
                  console.log(response.data.firstName);
                  message="New User Created";
                  console.log(message)
                  document.getElementById('msg').innerHTML=message;
      }
      else {
        message="Creation Failed";
        console.log(message)
        document.getElementById('msg').innerHTML=message;
      }

      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
      var message="Creation Failed";
      console.log(message)
      document.getElementById('msg').innerHTML=message;
    });
}
  render() {
    return (
      <div id="main">
      <div id="user">Hi, {window.sessionStorage.getItem('loggedEmp')}</div>
      <button type="button" id="logout" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
      <div id="finder">Employee ID: <input type="text" id="empid"/>
      <button type="button" id="find" className="btn btn-primary" onClick={this.retrieveEmployeeData}>Find</button>
      </div>
      <div id="msg"></div>
      <div id="msg"></div>
      <div id="createemp">Employee Name: <input type="text" id="empnamefirst" placeholder="first name"/><input type="text" id="empnamelast" placeholder="last name"/><br/><br/>
      Address:<br/>
      </div>
      <div id="address">
      <table id="addr_table">
      <tbody>
      <tr>
      <td>Street</td>
      <td>:</td>
      <td><input type="text" id="street"/></td>
      </tr>
      <tr>
      <td>City</td>
      <td>:</td>
      <td><input type="text" id="city"/></td>
      </tr>
      <tr>
      <td>State</td>
      <td>:</td>
      <td><input type="text" id="state"/></td>
      </tr>
      <tr>
      <td>Country</td>
      <td>:</td>
      <td><input type="text" id="country"/></td>
      </tr>
      <tr>
      <td>Zip</td>
      <td>:</td>
      <td><input type="text" id="zip"/></td>
      </tr>
      </tbody>
      </table>
      </div>
      <div id="hobbies">
    Hobbies
    <button type="button" id="add" className="btn btn-success" >Add</button>
    <div id="hobby_checkbox">
    <input type="checkbox" name="hobby1" value="hobby1" className="checkbox"/> Hobby 1<br/>
    <input type="checkbox" name="hobby2" value="hobby2" className="checkbox"/> Hobby 2<br/>
    <input type="checkbox" name="hobby3" value="hobby3" className="checkbox"/> Hobby 3<br/>
    </div>
    <div><button type="button" id="edit" className="btn btn-warning" >Edit</button><button type="button" id="del" className="btn btn-danger" >Delete</button></div>
      </div>
    <div>
      <button type="button" id="delemp" className="btn btn-danger" onClick={this.deleteEmployee}>Delete Employee</button>
      <button type="button" id="saveemp" className="btn btn-success" onClick={this.saveEmployee}>Save Employee</button>
    </div>
      </div>
    );
  }
}

export default Employee;
