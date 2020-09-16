import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './mylogo.png';

function generateYearList() {
  const thisYear = new Date().getFullYear();
  const numList = []
  for (let i = thisYear; i>thisYear - 120 ; i--){
    numList.push(i);
  }
  const yearList = numList.map((number,index)=>
    <option key={index.toString()}> {number} </option> );
  yearList.unshift(<option key='pick' > Pick your birth year </option>);
  return yearList;
}

function headerRender(titleText) {
  return (
    <div>
      <img src={logo} alt="Why website logo" />
      <h1>{titleText}</h1>
    </div>
  )
}

function statsPage(companyName) {
  return(
    <div>
      <h1> here you will see the stats about {companyName}: </h1>
      <ul>
        <li> sumOfComplaints(companyName) </li>
        <li> sumDistinctClients(companyName) </li>
        <li> topFiveCompanies() </li>
        <li> listOfComplaints(companyName) </li>
      </ul>
{/*      {sumOfComplaints(companyName)}
      {sumDistinctClients(companyName)}
      {topFiveCompanies()}
      {listOfComplaints(companyName)}*/}
    </div>
  )
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientYearOfBirth: '',
      companyName: '',
      complaintContent: '',
      time : 0,
      pageName: 'inputForm',
    } ;
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.getMyData=this.getMyData.bind(this);


  }

  getMyData(){
    fetch('/time').then(res => res.json()).then(data => {this.setState({time: data.time})});
  }

  validatePhone(phone){
    let phoneRegex = /^\d{10}$/;
    if(phone.match(phoneRegex)){
      return true;
      }
    alert("phone invalid!");
    return false;
  }

  validateEmail(email){
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (email.match(emailRegex)){
      return true;
    }
    alert("email invalid~~~");
    return false;
  }

  validateCompanyName(company){ ///to be continued....
    return true;
  }

  validateForm(){
    if (this.validatePhone(this.state.clientPhone) &&
      this.validateEmail(this.state.clientEmail) &&
      this.validateCompanyName(this.state.companyName)) {
        return true;
    }
    return false;
  }

  handleSubmit(){
    if (this.validateForm()) {
      fetch('/submit',{
        method: "POST",
        cache: "no-cache",
        headers:{
          "content_type":"application/json",
        },
        body:JSON.stringify(this.state)
        }
      ).then(res => console.log(res))
      // const jsonComplaint = this.toJson(this.state);
      // console.log(jsonComplaint); //i do not understand tojson function
      this.setState({pageName: 'thankYou'}); //jumps back to 'inputForm right after alternating to 'thankYou' --bug
/*
      return jsonComplaint;
*/
    }
  }

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  toJson() {
    return true; //to be continued...
  }

  render() {
    switch (this.state.pageName) {
      case 'inputForm':
        return(
          <div>
            {headerRender("We Hear You, Bro.")}
            <button onClick= {this.getMyData}>the time is: {this.state.time}</button>
            <form onSubmit={this.handleSubmit} > {/*need to learn more about onSubmit structure*/}
              <div id="userInfoSection" >
                <input
                  required
                  name= "clientName"
                  value = {this.state.clientName}
                  placeholder = {'Your name*'}
                  onChange = {this.handleInputChange}
                />
                <input
                  name= "clientEmail"
                  required
                  value = {this.state.clientEmail}
                  placeholder = {'Your email address'}
                  onChange = {this.handleInputChange}
                />
                <input
                  name= "clientPhone"
                  required
                  value = {this.state.clientPhone}
                  placeholder = {'Your phone number'}
                  onChange = {this.handleInputChange}
                />
                <select
                  name="clientYearOfBirth">
                  {generateYearList()}
                </select>
              </div>
              <textarea
                name= "companyName"
                required
                value = {this.state.companyName}
                placeholder = {'Who pissed you off, dude? (Company Name OR any other identifier)'}
                onChange = {this.handleInputChange}
              />
              <textarea
                id="complaint"
                name= "clientComplaint"
                required
                value = {this.state.clientComplaint}
                placeholder = {'Type your complaint in free text here'}
                onChange = {this.handleInputChange}
              />
              <input id="submit" type="submit" value="Submit complaint" />
            </form>
          </div>
        );
      case 'thankYou':
        return(
          <div>
            {headerRender("Thanks! we'll be in touch")}
            <form>
              <div id="userInfoSection" >
                <input
                  name= "clientName"
                  value = {'Your name*'}
                  disabled = {true}
                />
                <input
                  name= "clientEmail"
                  value = {'Your email address'}
                  disabled = {true}
                />
                <input
                  name= "clientPhone"
                  value = {'Your phone number'}
                  disabled = {true}
                />
                <select
                  name="clientYearOfBirth"
                  disabled = {true}
                  >
                  {<option> Pick your birth year </option>}
                </select>
              </div>
              <textarea
                name= "companyName"
                value = {'I know man, that company sucks...'}
                disabled = {true}
              />
              <textarea
                id="complaint"
                name= "clientComplaint"
                value = {'Type your complaint in free text here'}
                disabled = {true}
              />
              <input id="submit" type="submit" value="Submit complaint" disabled = {true} />
            </form>
          </div>
        );
      case 'stats':
        return(
          <div>
              {headerRender()}
              {statsPage(this.state.companyName)}
          </div>
        );
      default:
        return ({headerRender})
    }
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      logo: null,
      submitButton: null
    };
  }

  submitComplaint() {
  }

  render() {
    return(
      <div>
        <HomePage/>
      </div>

    )
  }
}


// ========================================

ReactDOM.render(<App />, document.getElementById("root"));




