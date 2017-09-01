$(document).ready(function(){

  var parseFromText = function(txt){
    var regy = /\(([^\)]+)\)/mg;
    var matches = new Array();
    var match;
    while((match = regy.exec(txt)) != null){
      //console.log(match);
      matches.push(match[1]);
    }
    return matches;
  }

  var crunch = function(data){
    let dict = new Map();
    data.forEach(function(d){
      var dCells = d.split('');
      let lookup = d[0]+d[1]+d[2]+d[6]+d[7];
      if(!dict.get(lookup)){
        dict.set(lookup, 1);
      }
      else{
        dict.set(lookup, dict.get(lookup)+1);
      }
    })
    return dict;
  }

  class LoadingModal extends React.Component {
    constructor(props){
      super(props);
    }

    render(){
      let divStyle;
      if(this.props.isShowing){
        divStyle = {display: 'flex'}
      }
      else{
        divStyle = {display: 'none'}
      }
      return <div className = 'loadingModal' style={divStyle}>
        <span className='loadingText'>
          Loading Data
        </span>
      </div>
    }
  }


  class DivisionContainer extends React.Component {

    constructor(props){
      super(props);
      var self = this;
      let numForClass = this.numForClass.bind(this);
    }

    numForClass(cl){
      var self = this;
      for(let n of self.props.nums){
        if(n[0] == cl){
          return n[1];
        }
      }
    }


    componentDidUpdate(){
      var self = this;

    }
    render() {
      var self = this;
      return <div className='divContainer'>
      <div className={self.props.name+'DivisionName'}>{self.props.name}</div>
      <div className={self.props.name+'DM'}>Distinguished Master: {self.numForClass('DM') > 0 ? self.numForClass('DM') : 0}</div>
      <div className={self.props.name+'MA'}>Master: {self.numForClass('MA') > 0 ? self.numForClass('MA') : 0}</div>
      <div className={self.props.name+'EX'}>Expert: {self.numForClass('EX') > 0 ? self.numForClass('EX') : 0}</div>
      <div className={self.props.name+'SS'}>Sharpshooter: {self.numForClass('SS') > 0 ? self.numForClass('SS') : 0}</div>
      <div className={self.props.name+'MM'}>Marksman: {self.numForClass('MM') > 0 ? self.numForClass('MM') : 0}</div>
      <div className={self.props.name+'NO'}>Novice: {self.numForClass('NV') > 0 ? self.numForClass('NV') : 0}</div>
      <div className={self.props.name+'UN'}>Unclassified: {self.numForClass('UN') > 0 ? self.numForClass('UN') : 0}</div>
      </div>

    }
  }


  class OutputArea extends React.Component {
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
          <DivisionContainer name='SSP' nums = {self.getMetricsForDivision('SSP')}/>
          <DivisionContainer name='ESP' nums = {self.getMetricsForDivision('ESP')}/>
          <DivisionContainer name='CDP' nums = {self.getMetricsForDivision('CDP')}/>
        </div>
        <div className='outputareacolumn' id='outputareacolumn2'>
          <DivisionContainer name='CCP' nums = {self.getMetricsForDivision('CCP')}/>
          <DivisionContainer name='BUG' nums = {self.getMetricsForDivision('BUG')}/>
          <DivisionContainer name='REV' nums = {self.getMetricsForDivision('REV')}/>
        </div>
      </div>
    }
  }

  class AppContainer extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        n:[],
        loading:false
      };
    }

    componentDidUpdate(){
      console.log('appcontainer updated with state:');
      console.log(this.state);
    }

    submitUrl(t){
      console.log('submit url hit');

      var self = t;
      var urlinput = document.querySelector('#urlinput');
      var btn = document.querySelector('#scrapebtn');
      var outputarea = document.querySelector('#outputarea');
      let data = '';

      if(urlinput){
        this.setState({loading: true});
        console.log('have urlinput');
        var urlcontent = urlinput.value;
        $.ajax({
          url: 'scraper.php',
          type: 'GET',
          data: { "callFunc1": urlinput.value},
          error:function(d)
          {
            self.setState({loading:false});
            alert("failed");
            console.log(d);
          },
          success: function(d)
          {
            self.setState({loading:false});
            console.log('success');

            data = parseFromText(d);
            var nums = crunch(data);

            self.setState({
              n:nums
            });
          }
        });
      }
    }
    render(){
      var self = this;
      return <div id='appcontainer'>
        <div id='titlecontainer'>
          <span className='titleSpan'>Practiscore Squad Scraper</span>
        </div>
        <div id="urlinputarea">
          <input id='urlinput' type='text' placeholder="Enter Squadding Url Here"/>
          <div id='scrapebtn' onClick={() => this.submitUrl(this)}>
            <i className="fa fa-search"></i>
          </div>
        </div>
        <LoadingModal isShowing = {self.state.loading}/>
        <OutputArea nums = {self.state.n}/>
      </div>
    }
  }

  ReactDOM.render(
    <AppContainer/>,
    document.querySelector('#shell')
  );
})
