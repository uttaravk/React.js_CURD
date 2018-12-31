import React, { Component } from 'react';
import './EmpComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../LoginComponent/LoginComponent';
import Hobbies from '../HobbiesComponent/HobbiesComponent';
import {render} from 'react-dom';
import axios from "axios";


class Employee extends Component {
  constructor(props) {
    super(props);
    this.state={
      "hobbycount":3,
      user: {
          firstname: "",
          lastname: "",
          state: "",
          city: "",
          street: "",
          zip: 0,
          country: "",
        }
     };
}

componentDidMount()
{
  this.setState({"hobbycount":3, "name":" "});
}

  handleLogout()
  {
    sessionStorage.clear();
    render(<Login/>, document.getElementById('app_content'));
  }

  findEmployee = event => {
      let response=this.retrieveEmployeeData();
        this.setState({
          firstname: response.firstName,
          lastname: response.lastName,
         });
     }

  retrieveEmployeeData(){
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
                      return response.data;
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
          var message="Error in Search Operation!";
          console.log(message)
          document.getElementById('msg').innerHTML=message;
        });
        return null;

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
                        if (response.status===200)
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
      if (response.status===200)
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
handleClickAdd = event => {
      this.setState({ hobbycount: this.state.hobbycount+1 });
   }



 handleChange(propertyName, event) {
       const user = this.state.user;
       user[propertyName] = event.target.value;
       this.setState({ user: user });
     }

handleClickDelete = event => {
  let divId="";
  let checkboxes = document.getElementsByName("hobby");
  for (var i=0; i<checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      divId="div"+checkboxes[i].id;
      document.getElementById(divId).innerHTML="";
    }
  }
}

handleClickEdit = event => {
      this.setState({ hobbycount: this.state.hobbycount+1 });
   }

  render() {
    return (
      <div id="main">
      <div id="user">Hi, {window.sessionStorage.getItem('loggedEmp')}</div>
      <button type="button" id="logout" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
      <div id="finder">Employee ID: <input type="text" id="empid"/>
      <button type="button" id="find" className="btn btn-primary" onClick={this.findEmployee.bind(this)}>Find</button>
      </div>
      <div id="msg"></div>
      <div id="msg"></div>
      <div id="createemp">Employee Name: <input type="text" id="empnamefirst" placeholder="first name" onChange={this.handleChange.bind(this, "firstname")}/><input type="text" id="empnamelast" placeholder="last name" onChange={this.handleChange.bind(this, "lastname")}/><br/><br/>
      Address:<br/>
      </div>
      <div id="address">
      <table id="addr_table">
      <tbody>
      <tr>
      <td>Street</td>
      <td>:</td>
      <td><input type="text" id="street" onChange={this.handleChange.bind(this, "street")}/></td>
      </tr>
      <tr>
      <td>City</td>
      <td>:</td>
      <td><input type="text" id="city" onChange={this.handleChange.bind(this, "city")}/></td>
      </tr>
      <tr>
      <td>State</td>
      <td>:</td>
      <td><input type="text" id="state" onChange={this.handleChange.bind(this, "state")}/></td>
      </tr>
      <tr>
      <td>Country</td>
      <td>:</td>
      <td><input type="text" id="country" onChange={this.handleChange.bind(this, "country")}/></td>
      </tr>
      <tr>
      <td>Zip</td>
      <td>:</td>
      <td><input type="text" id="zip" onChange={this.handleChange.bind(this, "zip")}/></td>
      </tr>
      </tbody>
      </table>
      </div>
      <div id="hobbies">
    Hobbies
    <button type="button" id="add" className="btn btn-success" onClick={this.handleClickAdd.bind(this)}>Add</button>
    <div id="hobby_checkbox"><Hobbies count={this.state.hobbycount} /></div>
    <div><button type="button" id="edit" className="btn btn-warning" onClick={this.handleClickEdit.bind(this)}>Edit</button>
    <button type="button" id="del" className="btn btn-danger" onClick={this.handleClickDelete.bind(this)}>Delete</button></div>
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
