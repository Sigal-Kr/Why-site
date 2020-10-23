import React from 'react';
import logo from './mylogo.png';
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
        cache: "no-cache", 
        headers:{"content_type":"application/json",},
        body:JSON.stringify(this.props.complaintId)
        }
      ).then(res => res.json()).then(newres => this.setState(newres))
    }
  
    componentDidMount(){
      this.pullComplaintData();
    }
  
    render() {
      return (
        <div >
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
  