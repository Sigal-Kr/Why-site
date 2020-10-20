import React from 'react';
import logo from './mylogo.png';

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

export default StatsComponent;

  ///////////////////
  function headerRender(titleText) {
    return (
      <div>
        <img src={logo} alt="Why website logo" />
        <h1>{titleText}</h1> 
      </div>
    )
  }
