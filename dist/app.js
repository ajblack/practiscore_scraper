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

  var DivisionContainer = function (_React$Component) {
    _inherits(DivisionContainer, _React$Component);

    function DivisionContainer(props) {
      _classCallCheck(this, DivisionContainer);

      return _possibleConstructorReturn(this, (DivisionContainer.__proto__ || Object.getPrototypeOf(DivisionContainer)).call(this, props));
    }

    _createClass(DivisionContainer, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'divContainer' },
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

  var UrlInputArea = function (_React$Component2) {
    _inherits(UrlInputArea, _React$Component2);

    function UrlInputArea() {
      _classCallCheck(this, UrlInputArea);

      return _possibleConstructorReturn(this, (UrlInputArea.__proto__ || Object.getPrototypeOf(UrlInputArea)).apply(this, arguments));
    }

    _createClass(UrlInputArea, [{
      key: 'submitUrl',
      value: function submitUrl() {

        var urlinput = document.querySelector('#urlinput');
        var btn = document.querySelector('#scrapebtn');
        var outputarea = document.querySelector('#outputarea');
        var data = '';

        //associative Array
        var dict = {};

        if (urlinput) {
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
              var nums = crunch(data, dict);

              console.log(nums);
              //outputarea.textContent = data;
            }
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { id: 'urlinputarea' },
          React.createElement('input', { id: 'urlinput', type: 'text', placeholder: 'Enter Squadding Url Here' }),
          React.createElement(
            'div',
            { id: 'scrapebtn', onClick: this.submitUrl },
            React.createElement('i', { className: 'fa fa-search' })
          )
        );
      }
    }]);

    return UrlInputArea;
  }(React.Component);

  var OutputArea = function (_React$Component3) {
    _inherits(OutputArea, _React$Component3);

    function OutputArea(props) {
      _classCallCheck(this, OutputArea);

      return _possibleConstructorReturn(this, (OutputArea.__proto__ || Object.getPrototypeOf(OutputArea)).call(this, props));
    }

    _createClass(OutputArea, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { id: 'outputarea' },
          React.createElement(
            'div',
            { className: 'outputareacolumn', id: 'outputareacolumn1' },
            React.createElement(DivisionContainer, { name: 'SSP' }),
            React.createElement(DivisionContainer, { name: 'ESP' }),
            React.createElement(DivisionContainer, { name: 'CDP' })
          ),
          React.createElement(
            'div',
            { className: 'outputareacolumn', id: 'outputareacolumn2' },
            React.createElement(DivisionContainer, { name: 'CCP' }),
            React.createElement(DivisionContainer, { name: 'BUG' }),
            React.createElement(DivisionContainer, { name: 'REV' })
          )
        );
      }
    }]);

    return OutputArea;
  }(React.Component);

  var AppContainer = function (_React$Component4) {
    _inherits(AppContainer, _React$Component4);

    function AppContainer() {
      _classCallCheck(this, AppContainer);

      return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
    }

    _createClass(AppContainer, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { id: 'appcontainer' },
          React.createElement(
            'div',
            { id: 'titlecontainer' },
            React.createElement(
              'span',
              { className: 'titleSpan' },
              'Practiscore Squad Scraper'
            )
          ),
          React.createElement(UrlInputArea, null),
          React.createElement(OutputArea, null)
        );
      }
    }]);

    return AppContainer;
  }(React.Component);

  ReactDOM.render(
  /*<DivisionContainer name='Revolver' manum='3' exnum='4' ssnum='10' mmnum='15' nonum='20'/>,
  document.getElementById('sspContainer')*/
  React.createElement(AppContainer, null), document.querySelector('#shell'));
});