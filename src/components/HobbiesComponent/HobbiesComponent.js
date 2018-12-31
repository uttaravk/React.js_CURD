import React, { Component } from 'react';
import './HobbiesComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Hobbies extends Component
{
  generateCheckbox()
  {
    let checkboxes = [];
    let counter=0;
    let val="";
    let divId="";
    let labelId="";
    for (let i = 0; i < parseInt(this.props.count, 10); i++) {
        counter=i+1
        val="Hobby"+counter;
        divId="div"+val;
        labelId="lab"+val;
        checkboxes.push([<div id={divId}><input type="checkbox" id={val} name={"hobby"} value={val}/><label id={labelId}>{val}</label><br/></div>]);
    }
    return (checkboxes);
  }
  render() {
    return (this.generateCheckbox());
  }
}
export default Hobbies;
