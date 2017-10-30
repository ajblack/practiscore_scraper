const IDPADivisionContainer = require('./IDPADivisionContainer');

class IDPAOutputArea extends React.Component {
  constructor(props){
    super(props);
    let getMetricsForDivision = this.getMetricsForDivision.bind(this);
  }

  getMetricsForDivision(divisionName){
    var self = this;
    let divisionNums = [];
    for(var [key,value] of self.props.nums){
      if(key.substring(0, 3) == divisionName){
        divisionNums.push([key.substring(3,5), value]);
      }
    }
    return divisionNums;
  }


  render(){
    var self = this;
    return <div id='outputarea'>
      <div className='outputareacolumn' id='outputareacolumn1'>
        <IDPADivisionContainer name='SSP' nums = {self.getMetricsForDivision('SSP')}/>
        <IDPADivisionContainer name='ESP' nums = {self.getMetricsForDivision('ESP')}/>
        <IDPADivisionContainer name='CDP' nums = {self.getMetricsForDivision('CDP')}/>
      </div>
      <div className='outputareacolumn' id='outputareacolumn2'>
        <IDPADivisionContainer name='CCP' nums = {self.getMetricsForDivision('CCP')}/>
        <IDPADivisionContainer name='BUG' nums = {self.getMetricsForDivision('BUG')}/>
        <IDPADivisionContainer name='REV' nums = {self.getMetricsForDivision('REV')}/>
      </div>
    </div>
  }
}

module.exports = IDPAOutputArea;
