import React from 'react';
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

class ClientInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientYearOfBirth: '',
      companyName: '',
      complaintContent: '',

      pageName: 'inputForm',
    } ;
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  validateName(name){
    return true;
  } // check that there only letters inside the name, no funny figures

  validatePhone(phone){
    return true;
  } // check that the phone has a certain amount of digits, no funny figures or letters

  validateEmail(email){
    return true;
  } //check that the email has both user and domain.

  validateCompanyName(company){
    return true;
  }

  validateContent(complaintContent){
    return true;
  } //check that there is content inside the complaint submitted

  validateForm(){
    if (this.validateName(this.state.clientName) &&
      this.validatePhone(this.state.clientPhone) &&
      this.validateEmail(this.state.clientEmail) &&
      this.validateCompanyName(this.state.companyName) &&
      this.validateContent(this.state.content)) {
        return true;
    }
    return false;
  }

  handleSubmit(){
    if (this.validateForm()) {
      const jsonComplaint = this.toJson(this.state);
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
                  value = {this.state.clientEmail}
                  placeholder = {'Your email address'}
                  onChange = {this.handleInputChange}
                />
                <input
                  name= "clientPhone"
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
                value = {this.state.clientComplaint}
                placeholder = {'Type your complaint in free text here'}
                onChange = {this.handleInputChange}
              />
              <input id="submit" type="submit" value="Submit complaint" />
            </form>
          </div>
        );
        break;
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
        break;
      case 'stats':
        return(
          <div>
              {headerRender()}
              {statsPage(this.state.companyName)}
          </div>
        );
        break;
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
      clientInput: ClientInputForm,
      submitButton: null
    };
  }

  submitComplaint() {
  }

  render() {
    var bg= require('./Watercolor-Background-Image.jpg')
    return(
      <div>
        <ClientInputForm/>
      </div>

    )
  }
}


// ========================================

ReactDOM.render(<App />, document.getElementById("root"));




