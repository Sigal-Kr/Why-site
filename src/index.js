import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './mylogo.png'; //need to change so the logo will be drawn from the server, not sure how.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    };
  }

  render() {
    return(
      <div>
        <HomePage/>
      </div>
    )
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      complaintId: '23232',
      pageName: 'formPage',
    } ;
    this.updateId = this.updateId.bind(this);
  }

  updateId(newId) {
    this.setState({complaintId: newId, pageName: "summarizePage"});
  }

  render() {
    switch (this.state.pageName) {
      case 'formPage':
        return( <InputForm submitted={this.updateId}/>)
      case 'summarizePage':
        return( <SummarizeForm complaintId= {this.state.complaintId}/> );
      case 'statsPage':
        return( <StatsComponent companyName= {null}/> );
      default:
        return ({headerRender})
    }
  }
}

class InputForm extends React.Component {
  constructor(props){
    super();
    this.state = {
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientYearOfBirth: '',
      companyName: '',
      complaintContent: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  validatePhone(phone){
    let phoneRegex = /^\d{10}$/;
    if(phone.match(phoneRegex)){
      return true;}
    alert("*****Phone number invalid!*****");
    return false;
  }

  validateEmail(email){
    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ ;
    if (email.match(emailRegex)){
      return true;}
    alert("~~ Invalid email!~~");
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

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event){
    if (this.validateForm()) {
      fetch('/submit',{
          method: "POST",
          cache: "no-cache", //maybe it needs to have cache?
          headers:{"content_type":"application/json",}, //not sure what the header means.
          body:JSON.stringify(this.state)
          }
      ).then(res => res.json()).then(newres => this.props.submitted(newres))
      event.preventDefault(); 
    }
  }

  render() {
    return(
      <div>
        {headerRender("We Hear You, Bro.")}
        <form onSubmit={this.handleSubmit} >
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
              name="clientYearOfBirth"
              onChange = {this.handleInputChange}>
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
            name= "complaintContent"
            required
            value = {this.state.complaintContent}
            placeholder = {'Type your complaint in free text here'}
            onChange = {this.handleInputChange}
          />
          <input id="submit" type="submit" value="Submit complaint" />
        </form>
      </div>
    );
  }
}

class SummarizeForm extends React.Component {
  constructor(props){
    super();
    this.state={
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientYearOfBirth: '',
      companyName: '',
      complaintContent: '',        
      }
      this.pullComplaintData=this.pullComplaintData.bind(this);
      console.log(props);
    }

  pullComplaintData(){
    fetch('/pull',{
      method: "POST",
      cache: "no-cache", //maybe it needs to have cache?
      headers:{"content_type":"application/json",}, //not sure what the header means.
      body:JSON.stringify(this.props.complaintId)
      }
    ).then(res => res.json()).then(newres => this.setState(newres))
  }

  componentDidMount(){
    this.pullComplaintData();
  }

  render() {
    return (
      <div>
        <div>
          <img src={logo} alt="Why website logo" />
          <h1>Thanks! we'll be in touch.</h1> 
          <h2>Your complaint Id is: {this.props.complaintId}</h2>
        </div>
        <form>
          <div id="userInfoSection" >
            <input
              name= "clientName"
              value = {this.state.clientName}
              disabled = {true}
            />
            <input
              name= "clientEmail"
              value = {this.state.clientEmail}
              disabled = {true}
            />
            <input
              name= "clientPhone"
              value = {this.state.clientPhone}
              disabled = {true}
            />
            <select
              name="clientYearOfBirth"
              disabled = {true}
              >
                <option>{this.state.clientYearOfBirth} </option>
            </select>
          </div>
          <textarea
            name= "companyName"
            value = {this.state.companyName}
            disabled = {true}
          />
          <textarea
            id="complaint"
            name= "complaintContent"
            value = {this.state.complaintContent}
            disabled = {true}
          />
          <input id="submit" type="submit" value="Submit complaint" disabled = {true} />
        </form>
    </div>
    )
  }
}


class StatsComponent extends React.Component { 
  constructor(props){
    super();
  }

  render(){
    return (
      <div>
        {headerRender()}
        <h1> here you will see the stats about {this.props.companyName}: </h1>
        <ul>
          <li> sumOfComplaints(companyName) </li>
          <li> sumDistinctClients(companyName) </li>
          <li> topFiveCompanies() </li>
          <li> listOfComplaints(companyName) </li>
        </ul>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

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
