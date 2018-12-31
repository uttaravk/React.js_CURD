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


  retrieveEmployeeData(){
      let message="";
      let reqid = (document.getElementById('empid')).value;
      let url='http://104.248.219.208:8080/cts/employee?empId='+reqid;
      axios
        .get(url)
        .then(function(response) {
          if (response.data.firstName)
          {
                      message="Message: User Found!";
                      document.getElementById('msg').innerHTML=message;
                      let empdata='Name: '+response.data.firstName+' '+response.data.lastName+'<br/>';
                      empdata+='Address: <br/>';
                      empdata+='<div id="address_contents"> ';
                      empdata+='Street: '+response.data.address.street+'<br/>';
                      empdata+='City: '+response.data.address.city+'<br/>';
                      empdata+='State: '+response.data.address.state+'<br/>';
                      empdata+='Country: '+response.data.address.country+'<br/>';
                      empdata+='</div>';
                      empdata+='Hobbies: ';
                      empdata+=response.data.hobbies;
                      document.getElementById('search_results').innerHTML=empdata;
          }
          else {
            message="Message: User not found. Create a new user.";
            document.getElementById('msg').innerHTML=message;
          }

        })
        .catch(function(error) {
          let message="Message: Error in Search Operation!";
          document.getElementById('msg').innerHTML=message;
        });
}

deleteEmployee(){
    let message="";
    let reqid = (document.getElementById('empid')).value;
    let url='http://104.248.219.208:8080/cts/employee?empId='+reqid;
    axios
      .get(url)
      .then(function(response) {
        if (response.data.firstName)
        {

                    let urldel="http://104.248.219.208:8080/cts/employee?empId="+reqid;
                    axios
                      .delete(urldel)
                      .then(function(response) {
                        if (response.status===200)
                        {
                          message="Message: User Deleted Successfully!";
                        }
                        else {
                          message="Message: Deletion Failed";
                        }
                        document.getElementById('msg').innerHTML=message;
                      })
        }
        else {
          message="Message: User not found. Cannot delete the records!";

          document.getElementById('msg').innerHTML=message;
        }

      })
      .catch(function(error) {

        let message="Message: User Not Found. Create a New User.";

        document.getElementById('msg').innerHTML=message;
      });
}
saveEmployee(){

  function validate(addfirstname, addlastname, addstreet, addcity, addstate, addcountry, addzip)
  {
    let zippattern="^[0-9]{5}$";
    let namepattern = "^[a-zA-Z' ']+$";
    let addresspattern = "^[a-zA-Z' ']*$";

    let flag=0;
    if (addfirstname===null ||  addfirstname==="" || addfirstname.match(namepattern)==null)
    {
      alert("Please Enter Valid First-Name");
      flag=1;
    }
    if (addlastname===null ||  addlastname==="" || addlastname.match(namepattern)==null)
    {
      alert("Please Enter Valid Last-Name");
      flag=1;
    }
    if(addcity.match(addresspattern)==null || addstate.match(addresspattern)==null || addcountry.match(addresspattern)==null)
    {
      alert("Please Enter Valid Address");
      flag=1;
    }
    if (addzip===null ||  addzip==="" || addzip.match(zippattern)==null)
    {
      alert("Please Enter Valid Zip Code");
      flag=1;
    }
    if (flag===0){
      return true;
    }
      return false;
  }

  function handleChangeLabel(box){
    let labelId="lab"+box.id+"2";
    if(document.getElementById(labelId)){
      box.value=document.getElementById(labelId).value;
    }
  }

  let addfirstname=document.getElementById('empnamefirst').value;
  let addlastname=document.getElementById('empnamelast').value;
  let addstreet=document.getElementById('street').value;
  let addcity=document.getElementById('city').value;
  let addstate=document.getElementById('state').value;
  let addcountry=document.getElementById('country').value;
  let addzip=document.getElementById('zip').value;
  if(validate(addfirstname, addlastname, addstreet, addcity, addstate, addcountry, addzip))
  {


    let flag=0;
    let hobbies='"hobbies":[';

    let checkboxes = document.getElementsByName("hobby");
    for (let i=0; i<checkboxes.length; i++) {
        let labelId="lab"+checkboxes[i].id;
        let box=checkboxes[i];
        handleChangeLabel(box);
    if (checkboxes[i].checked) {
        hobbies+='"';
        hobbies+=checkboxes[i].value;
        hobbies+='",';
        flag=1;
      }
    }
    if(flag===1){
      hobbies=hobbies.substring(hobbies.length-1, 0);
    }
  hobbies+=']'
    let json = '{"firstName":"'+addfirstname+'","lastName":"'+addlastname+'","address":{"street":"'+addstreet+'","city":"'+addcity+'","state":"'+addstate+'","country":"'+addcountry+'","zip":'+addzip+'}, '+hobbies+'}';
    let empdata = JSON.parse(json);
    let message="";
    let url="http://104.248.219.208:8080/cts/employee";
    axios
      .post(url, empdata)
      .then(function(response) {
        if (response.status===200)
        {

                    message="Message: New User Created";
                    document.getElementById('msg').innerHTML=message;
                    let elements = document.getElementsByTagName("input");
                    for (let i=0; i < elements.length; i++) {
                      if (elements[i].type == "text") {
                        elements[i].value = "";
                      }
                      else if(elements[i].type == "checkbox")
                      {
                        elements[i].checked=false;
                      }
                    }
        }
        else {
          message="Message: Creation Failed";

          document.getElementById('msg').innerHTML=message;
        }


      })
      .catch(function(error) {
        let message="Message: Creation Failed";
        document.getElementById('msg').innerHTML=message;
      });
  }
  else {
    let message="Message: Incorrect User Data. Please Update";
    document.getElementById('msg').innerHTML=message;
  }

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
  for (let i=0; i<checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      divId="div"+checkboxes[i].id;
      document.getElementById(divId).innerHTML="";
    }
  }
}


handleClickEdit = event => {
  let checkboxes = document.getElementsByName("hobby");
  for (let i=0; i<checkboxes.length; i++) {
    let labelId="lab"+checkboxes[i].id;
    let val=checkboxes[i].id;
    if (checkboxes[i].checked) {
      // let box=checkboxes[i];
      let hobbybox='<input type="text" class="hobbyLabel" id='+labelId+'2 placeholder="'+val+'" />';
      document.getElementById(labelId).innerHTML=hobbybox;
    }
    else {
        document.getElementById(labelId).innerHTML='<label id='+labelId+'>'+val+'</label>';
    }
  }
   }

  render() {
    return (
      <div id="main">
      <div id="user">Hi, {window.sessionStorage.getItem('loggedEmp')}</div>
      <button type="button" id="logout" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
      <div id="msg"></div>
      <div id="finder">Employee ID: <input type="text" id="empid"/>
      <button type="button" id="find" className="btn btn-primary" onClick={this.retrieveEmployeeData}>Find</button>
      <div id="search_results"></div>
      </div>
      <div id="createemp">Employee Name<sup>*</sup>: <input type="text" id="empnamefirst" placeholder="first name" onChange={this.handleChange.bind(this, "firstname")}/><input type="text" id="empnamelast" placeholder="last name" onChange={this.handleChange.bind(this, "lastname")}/><br/><br/>
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
      <td id="zipcode">Zip<sup>*</sup></td>
      <td>:</td>
      <td><label id="tooltip"><input type="text" id="zip" onChange={this.handleChange.bind(this, "zip")}/>
      <span id="tooltiptext">
        <h4 id="instr">5 Digit Valid Zip Codes are Allowed</h4>
      </span>
      </label>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div id="hobbies">
        Hobbies
        <button type="button" id="add" className="btn btn-success" onClick={this.handleClickAdd.bind(this)}>Add</button>
        <div id="hobby_checkbox"><Hobbies count={this.state.hobbycount} /></div>
        <div>
        <button type="button" id="edit" className="btn btn-warning" onClick={this.handleClickEdit.bind(this)}>Edit</button>
        <button type="button" id="del" className="btn btn-danger" onClick={this.handleClickDelete.bind(this)}>Delete</button>
        <p id="note">Select a Hobby to Edit or Delete</p>
        </div>
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
