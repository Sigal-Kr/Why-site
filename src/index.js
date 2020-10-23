import React from 'react';
import ReactDOM from 'react-dom';
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
        return(<div id="form"> 
                <InputForm submitted={this.updateId}/>
               </div>)
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