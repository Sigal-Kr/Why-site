import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './mylogo.png'; //need to change so the logo will be drawn from the server, not sure how.
import './index.css';
import InputForm from "./InputForm";
import SummarizeForm from "./SummarizeForm";
import StatsComponent from "./StatsComponent";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      complaintId: '',
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
        return ;
    }
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));