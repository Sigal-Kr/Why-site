import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './mylogo.png';

function generateYearList() {
  const thisYear = Number(new Date().toLocaleDateString().slice(6,11));
  const numList = []
  for (let i = thisYear; i>thisYear - 120 ; i--){
    numList.push(i);
  }
  const yearList = numList.map((number,index)=>
    <option key={index.toString()}> {number} </option> );
  yearList.splice(0,0,<option key='pick'> Pick your birth year </option>);
  return yearList;
}

class ClientInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientYearOfBirth: '',
      clientComplaint: '',
      companyName: '',
      complaintContent: '',
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
    if (this.validateForm()){
      const jsonComplaint = this.toJson(this.state);
      return jsonComplaint; //to be continued..
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
    return(
      <div className= "webPage">
        <label>
          <img src={logo} alt="Logo" />
          <h1 > We Hear You, Bro. </h1>
        </label>
        <form className= "details">
          <input
            required
            name= "clientName"
            type="text"
            value = {this.state.clientName}
            placeholder = {'Your name*'}
            onChange = {this.handleInputChange}
          />

          <input
            name= "clientEmail"
            type="text"
            value = {this.state.clientEmail}
            placeholder = {'Your email address'}
            onChange = {this.handleInputChange}
          />
          <input
            name= "clientPhone"
            type="text"
            value = {this.state.clientPhone}
            placeholder = {'Your phone number'}
            onChange = {this.handleInputChange}
          />
          <select
              Name="clientYearOfBirth">
              {generateYearList()}
          </select>
        </form>
            <textarea
              name= "companyName"
              required
              type="text"
              value = {this.state.companyName}
              placeholder = {'Who pissed you off, dude? (Company Name OR any other identifier)'}
              onChange = {this.handleInputChange}
            />

            <textarea
              id="complaint"
              name= "clientComplaint"
              type="text"
              placeholder = {'Type your complaint in free text here'}
              onChange = {this.handleInputChange}
            />
        <input type="submit" value="Submit complaint"/>
      </div>
    )
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
      <html>
        <head>
          <title>Why Website</title>
        </head>
        <body>
          <ClientInputForm/>
        </body>
      </html>
    )
  }
}


// ========================================

ReactDOM.render(<App />, document.getElementById("root"));




