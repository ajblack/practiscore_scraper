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

  var crunch = function(data, dict){
    console.log(data);
    data.forEach(function(d){
      var dCells = d.split('');
      let lookup = d[0]+d[1]+d[2]+d[6]+d[7];
      if(!dict[lookup]){
        console.log('no lookup for:');
        console.log(lookup);
        dict[lookup] = 1;
      }
      else{
        dict[lookup]++;
      }
    })

    return dict;

  }




  class DivisionContainer extends React.Component {

    constructor(props){
      super(props);
    }

    render() {
      return <div className='divContainer'>
      <div>{this.props.name}</div>
      <div>Master: {this.props.manum}</div>
      <div>Expert: {this.props.exnum}</div>
      <div>Sharpshooter: {this.props.ssnum}</div>
      <div>Marksman: {this.props.mmnum}</div>
      <div>Novice: {this.props.nonum}</div>
      </div>


    }
  }

  class UrlInputArea extends React.Component {

    submitUrl(){

      var urlinput = document.querySelector('#urlinput');
      var btn = document.querySelector('#scrapebtn');
      var outputarea = document.querySelector('#outputarea');
      let data = '';

      //associative Array
      let dict = {};

      if(urlinput){
        var urlcontent = urlinput.value;
        $.ajax({
          url: 'scraper.php',
          type: 'GET',
          data: { "callFunc1": urlinput.value},
          error:function(d)
          {
            alert("failed");
            console.log(d);
          },
          success: function(d)
          {
            console.log('success');

            data = parseFromText(d);
            var nums = crunch(data, dict);

            console.log(nums);
            //outputarea.textContent = data;
          }
        });
      }
    }
    render(){
      return <div id="urlinputarea">
        <input id='urlinput' type='text' placeholder="Enter Squadding Url Here"/>
        <div id='scrapebtn' onClick={this.submitUrl}>
          <i className="fa fa-search"></i>
        </div>
      </div>
    }
  }

  class OutputArea extends React.Component {
    constructor(props){
      super(props);

    }
    render(){
      return <div id='outputarea'>
        <div className='outputareacolumn' id='outputareacolumn1'>
          <DivisionContainer name='SSP'/>
          <DivisionContainer name='ESP'/>
          <DivisionContainer name='CDP'/>
        </div>
        <div className='outputareacolumn' id='outputareacolumn2'>
          <DivisionContainer name='CCP'/>
          <DivisionContainer name='BUG'/>
          <DivisionContainer name='REV'/>
        </div>
      </div>
    }
  }

  class AppContainer extends React.Component {
    render(){
      return <div id='appcontainer'>
        <div id='titlecontainer'>
          <span className='titleSpan'>Practiscore Squad Scraper</span>
        </div>
        <UrlInputArea/>
        <OutputArea/>
      </div>
    }
  }

  ReactDOM.render(
    /*<DivisionContainer name='Revolver' manum='3' exnum='4' ssnum='10' mmnum='15' nonum='20'/>,
    document.getElementById('sspContainer')*/
    <AppContainer/>,
    document.querySelector('#shell')
  );
})
