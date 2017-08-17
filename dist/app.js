'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

$(document).ready(function () {

  var parseFromText = function parseFromText(txt) {
    var regy = /\(([^\)]+)\)/mg;
    var matches = new Array();
    var match;
    while ((match = regy.exec(txt)) != null) {
      //console.log(match);
      matches.push(match[1]);
    }
    return matches;
  };

  var crunch = function crunch(data, dict) {
    console.log(data);
    data.forEach(function (d) {
      var dCells = d.split('');
      var lookup = d[0] + d[1] + d[2] + d[6] + d[7];
      if (!dict[lookup]) {
        console.log('no lookup for:');
        console.log(lookup);
        dict[lookup] = 1;
      } else {
        dict[lookup]++;
      }
    });

    return dict;
  };

  var urlinput = document.querySelector('#urlinput');
  var btn = document.querySelector('#scrapebtn');
  var outputarea = document.querySelector('#outputarea');
  var data = '';

  //associative Array
  var dict = {};

  btn.addEventListener('click', function (e) {
    var urlcontent = urlinput.value;
    $.ajax({
      url: 'scraper.php',
      type: 'GET',
      data: { "callFunc1": urlinput.value },
      error: function error(d) {
        alert("failed");
        console.log(d);
      },
      success: function success(d) {
        console.log('success');

        data = parseFromText(d);
        console.log(data);
        var sspnums = crunch(data, dict);
        console.log(sspnums);
        outputarea.textContent = data;
      }
    });
  });

  var DivisionContainer = function (_React$Component) {
    _inherits(DivisionContainer, _React$Component);

    function DivisionContainer() {
      _classCallCheck(this, DivisionContainer);

      return _possibleConstructorReturn(this, (DivisionContainer.__proto__ || Object.getPrototypeOf(DivisionContainer)).apply(this, arguments));
    }

    _createClass(DivisionContainer, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            null,
            this.props.name
          ),
          React.createElement(
            'div',
            null,
            'Master: ',
            this.props.manum
          ),
          React.createElement(
            'div',
            null,
            'Expert: ',
            this.props.exnum
          ),
          React.createElement(
            'div',
            null,
            'Sharpshooter: ',
            this.props.ssnum
          ),
          React.createElement(
            'div',
            null,
            'Marksman: ',
            this.props.mmnum
          ),
          React.createElement(
            'div',
            null,
            'Novice: ',
            this.props.nonum
          )
        );
      }
    }]);

    return DivisionContainer;
  }(React.Component);

  ReactDOM.render(React.createElement(DivisionContainer, { name: 'Revolver', manum: '3', exnum: '4', ssnum: '10', mmnum: '15', nonum: '20' }), document.getElementById('sspContainer'));
});