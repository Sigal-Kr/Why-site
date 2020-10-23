import React from 'react';
import logo from './mylogo.png';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';

class InputForm extends React.Component {
    constructor(props){
      super();
      this.state = {
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientYearOfBirth: '',
        companyName: [],
        complaintContent: '',
        govList: [],
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.assignByType = this.assignByType.bind(this);
      this.typeahead = null;
    }

    handleChange(e) {
      this.typeahead.getInstance().clear();
    }

    assignByType(companyName){
      if (typeof companyName[0] == "string"){ 
        this.setState({companyName});
      }
      else if (companyName[0]!==undefined && companyName[0]['label'] !== undefined) {      
        this.setState({companyName: [companyName[0]['label']]});
      }
    }

    validatePhone(phone){
      let phoneRegex = /^\d{10}$/;
      if(phone.match(phoneRegex)){
        return true;}
      alert("Phone number invalid!");
      return false;
    }
  
    validateEmail(email){
      let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ ;
      if (email.match(emailRegex)){
        return true;}
      alert("Email address is invalid!");
      return false;
    }
  
    
    validateForm(){
      if (this.validateEmail(this.state.clientEmail) &&
          this.validatePhone(this.state.clientPhone)) {
          return true;
      }
      return false;
    }
  
    handleInputChange(event) {
      const name = event.target.name;
      this.setState({[name]: event.target.value});
    }
  
    handleSubmit(event){
      let dict = {clientName: this.state.clientName,
                  clientPhone: this.state.clientPhone,
                  clientEmail: this.state.clientEmail,
                  clientYearOfBirth: this.state.clientYearOfBirth,
                  companyName: this.state.companyName,
                  complaintContent: this.state.complaintContent, }
      if (this.validateForm()) {
        fetch('/submit',{
            method: "POST",
            cache: "no-cache", 
            headers:{"content_type":"application/json",}, 
            body:JSON.stringify(dict)
            }
        ).then(res => res.json()).then(newres => this.props.submitted(newres))
        event.preventDefault(); 
      }
    }
    
    componentDidMount(){
      fetch('/suggest',{
        method: "GET",
        cache: "no-cache", 
        headers:{"content_type":"application/json",},
        }
        ).then(res => res.json()).then(newres => this.setState({govList : newres}))
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
                placeholder = {'Name'}
                onChange = {this.handleInputChange}
              />
              <input
                name= "clientEmail"
                required
                value = {this.state.clientEmail}
                placeholder = {'Email'}
                onChange = {this.handleInputChange}
              />
              <input
                name= "clientPhone"
                required
                value = {this.state.clientPhone}
                placeholder = {'Phone'}
                onChange = {this.handleInputChange}
              />
              <select
                name="clientYearOfBirth"
                onChange = {this.handleInputChange}>
                {generateYearList()}
              </select>
            </div>
            <Typeahead      
              allowNew  
              ref={(ref) => this.typeahead = ref}        
              id= "companyName"
              onChange={selected => this.assignByType(selected)}
              options={this.state.govList}
              placeholder={"Company name / identifier"}
              selected={this.state.companyName}
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

  export default InputForm;

  /////////////////////////////////////////////////////////////////////

  function generateYearList() {
    const thisYear = new Date().getFullYear();
    const numList = []
    for (let i = thisYear; i>thisYear - 120 ; i--){
      numList.push(i);
    }
    const yearList = numList.map((number,index)=>
      <option key={index.toString()}> {number} </option> );
    yearList.unshift(<option key='pick' > Birth year </option>);
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

  