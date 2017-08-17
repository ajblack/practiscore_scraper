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

  var urlinput = document.querySelector('#urlinput');
  var btn = document.querySelector('#scrapebtn');
  var outputarea = document.querySelector('#outputarea');
  let data = '';

  //associative Array
  let dict = {};


  btn.addEventListener('click', function(e){
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
        console.log(data);
        var sspnums = crunch(data, dict);
        console.log(sspnums);
        outputarea.textContent = data;
      }
    });
  })

  class DivisionContainer extends React.Component {
    render() {
      return <div>
      <div>{this.props.name}</div>
      <div>Master: {this.props.manum}</div>
      <div>Expert: {this.props.exnum}</div>
      <div>Sharpshooter: {this.props.ssnum}</div>
      <div>Marksman: {this.props.mmnum}</div>
      <div>Novice: {this.props.nonum}</div>
      </div>


    }
  }

  ReactDOM.render(
    <DivisionContainer name='Revolver' manum='3' exnum='4' ssnum='10' mmnum='15' nonum='20'/>,
    document.getElementById('sspContainer')
  );
})
