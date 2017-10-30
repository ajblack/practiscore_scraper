var IDPAOutputArea = require('./IDPAOutputArea');
var LoadingModal = require('./LoadingModal');

class AppContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      n:[],
      loading:false,
      comp:'idpa'
    };
  }

  componentDidUpdate(){
    console.log('appcontainer updated with state:');
    console.log(this.state);
  }

  changeComp(newComp){
    this.setState({comp:newComp});
  }

  parseFromText(txt){
    var regy = /\(([^\)]+)\)/mg;
    var matches = new Array();
    var match;
    while((match = regy.exec(txt)) != null){
      //console.log(match);
      matches.push(match[1]);
    }
    return matches;
  }

  crunch(data){
    let dict = new Map();
    data.forEach(function(d){
      var dCells = d.split('');
      //add a shim here to look up 'Revolver'
      let lookup = '';
      if(d[0]=='R' && d[1]=='e' &&d[2]=='v'){
        console.log('revolver found');
        lookup = d[0]+d[1]+d[2]+d[11]+d[12];
        lookup = lookup.toUpperCase();
        console.log(lookup);
      }
      else{
        lookup = d[0]+d[1]+d[2]+d[6]+d[7];
      }
      if(!dict.get(lookup)){
        dict.set(lookup, 1);
      }
      else{
        dict.set(lookup, dict.get(lookup)+1);
      }
    })
    return dict;
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

          data = self.parseFromText(d);
          var nums = self.crunch(data);

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
      <div id='compoptions'>
        <span type='button' onClick={() => this.changeComp('idpa')}>
          IDPA
        </span>
        <span type='button' onClick={() => this.changeComp('uspsa')}>
          USPSA
        </span>
      </div>
      <div id='titlecontainer'>
        <span className='titleSpan'>Practiscore Squad Scraper</span>
      </div>
      <div id="urlinputarea">
        <input id='urlinput' type='text' placeholder="Enter Squadding Url Here"/>
        <div id='scrapebtn' onClick={() => this.submitUrl(this)}>x
        </div>
      </div>
      <LoadingModal isShowing = {self.state.loading}/>
      <IDPAOutputArea nums = {self.state.n}/>


    </div>
  }
}

module.exports = AppContainer;
