import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './mylogo.png';

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
    } ;
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  validateName(){

  } // check that there only letters inside the name, no funny figures

  validatePhone(){
  } // check that the phone has a certain amount of digits, no funny figures or letters

  validateEmail(){
  } //check that the email has both user and domain.

  validateContent(){
  } //check that there is content inside the complaint submitted

  validateCompanyName(){
  }

  validateForm(){
  }

  handleSubmit(){
  }

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  toJson() {
  }

  myNEWfunc(){}

  render() {
    const thisYear = Number(new Date().toLocaleDateString().slice(6,11));
    const numList = []
    for (let i = thisYear; i>thisYear - 120 ; i--){
        numList.push(i);
    }
    const yearList = numList.map((number,index)=>
      <option key={index.toString()}> {number} </option> );
    yearList.splice(0,0,<option key='pick'> Pick your birth year </option>);
    return (
      <div className= "webPage">
        <label>
          <img src={logo} alt="Logo" />
          <h1 className="details" > We Hear You, Bro. </h1>
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
              {yearList}
          </select>
        </form>
          <div className="freeText">
            <textArea
              name= "companyName"
              required
              type="text"
              value = {this.state.companyName}
              placeholder = {'Who pissed you off, dude? (Company Name OR any other identifier)'}
              onChange = {this.handleInputChange}
            />

            <textArea
              name= "clientComplaint"
              type="text"
              placeholder = {'Type your complaint in free text here'}
              onChange = {this.handleInputChange}
            />
          </div>
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
    return(
      <>
        <head>WHY! website</head>
        <body>
          <ClientInputForm/>
        </body>
      </>
    )
  }
}


// ========================================

ReactDOM.render(<App />, document.getElementById("root"));




