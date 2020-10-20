import React from 'react';
import logo from './mylogo.png';
// import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';

class SummarizeForm extends React.Component {
    constructor(props){
      super();
      this.state={
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientYearOfBirth: '',
        companyName: [],
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
            <h1><strong>Thanks! we'll be in touch.</strong></h1> 
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
            {/*<Autocomplete
              freeSolo
              id="autocomplete"
              disableClearable
              options={this.state.govList}
              renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                variant="outlined"
                value = {this.state.companyName}
                disabled = {true}
              />)}
            />
            <Autocomplete
                name= "companyName"
                placeholder = {this.state.companyName}
                disabled = {true}
            />
            <Typeahead                
                id= "companyName"
                placeholder={"Who pissed you off, dude? (Company Name OR any other identifier)"}
                selected={this.state.companyName}
                disabled = {true}
                options={[]}
                onChange ={selected => console.log("selelcted")}
            />*/}
            
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

  export default SummarizeForm;
  