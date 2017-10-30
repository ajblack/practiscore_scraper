var AppContainer = require('./AppContainer');

$(document).ready(function(){

  ReactDOM.render(
    <AppContainer/>,
    document.querySelector('#shell')
  );
})
