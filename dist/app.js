'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

  var crunch = function crunch(data) {
    var dict = new Map();
    data.forEach(function (d) {
      var dCells = d.split('');
      var lookup = d[0] + d[1] + d[2] + d[6] + d[7];
      if (!dict.get(lookup)) {
        dict.set(lookup, 1);
      } else {
        dict.set(lookup, dict.get(lookup) + 1);
      }
    });
    return dict;
  };

  var LoadingModal = function (_React$Component) {
    _inherits(LoadingModal, _React$Component);

    function LoadingModal(props) {
      _classCallCheck(this, LoadingModal);

      return _possibleConstructorReturn(this, (LoadingModal.__proto__ || Object.getPrototypeOf(LoadingModal)).call(this, props));
    }

    _createClass(LoadingModal, [{
      key: 'render',
      value: function render() {
        var divStyle = void 0;
        if (this.props.isShowing) {
          divStyle = { display: 'flex' };
        } else {
          divStyle = { display: 'none' };
        }
        return React.createElement(
          'div',
          { className: 'loadingModal', style: divStyle },
          React.createElement(
            'span',
            { className: 'loadingText' },
            'Loading Data'
          )
        );
      }
    }]);

    return LoadingModal;
  }(React.Component);

  var DivisionContainer = function (_React$Component2) {
    _inherits(DivisionContainer, _React$Component2);

    function DivisionContainer(props) {
      _classCallCheck(this, DivisionContainer);

      var _this2 = _possibleConstructorReturn(this, (DivisionContainer.__proto__ || Object.getPrototypeOf(DivisionContainer)).call(this, props));

      var self = _this2;
      var numForClass = _this2.numForClass.bind(_this2);
      return _this2;
    }

    _createClass(DivisionContainer, [{
      key: 'numForClass',
      value: function numForClass(cl) {
        var self = this;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = self.props.nums[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var n = _step.value;

            if (n[0] == cl) {
              return n[1];
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var self = this;
      }
    }, {
      key: 'render',
      value: function render() {
        var self = this;
        return React.createElement(
          'div',
          { className: 'divContainer' },
          React.createElement(
            'div',
            { className: self.props.name + 'DivisionName' },
            self.props.name
          ),
          React.createElement(
            'div',
            { className: self.props.name + 'DM' },
            'Distinguished Master: ',
            self.numForClass('DM') > 0 ? self.numForClass('DM') : 0
          ),
          React.createElement(
            'div',
            { className: self.props.name + 'MA' },
            'Master: ',
            self.numForClass('MA') > 0 ? self.numForClass('MA') : 0
          ),
          React.createElement(
            'div',
            { className: self.props.name + 'EX' },
            'Expert: ',
            self.numForClass('EX') > 0 ? self.numForClass('EX') : 0
          ),
          React.createElement(
            'div',
            { className: self.props.name + 'SS' },
            'Sharpshooter: ',
            self.numForClass('SS') > 0 ? self.numForClass('SS') : 0
          ),
          React.createElement(
            'div',
            { className: self.props.name + 'MM' },
            'Marksman: ',
            self.numForClass('MM') > 0 ? self.numForClass('MM') : 0
          ),
          React.createElement(
            'div',
            { className: self.props.name + 'NO' },
            'Novice: ',
            self.numForClass('NV') > 0 ? self.numForClass('NV') : 0
          ),
          React.createElement(
            'div',
            { className: self.props.name + 'UN' },
            'Unclassified: ',
            self.numForClass('UN') > 0 ? self.numForClass('UN') : 0
          )
        );
      }
    }]);

    return DivisionContainer;
  }(React.Component);

  var OutputArea = function (_React$Component3) {
    _inherits(OutputArea, _React$Component3);

    function OutputArea(props) {
      _classCallCheck(this, OutputArea);

      var _this3 = _possibleConstructorReturn(this, (OutputArea.__proto__ || Object.getPrototypeOf(OutputArea)).call(this, props));

      var getMetricsForDivision = _this3.getMetricsForDivision.bind(_this3);
      return _this3;
    }

    _createClass(OutputArea, [{
      key: 'getMetricsForDivision',
      value: function getMetricsForDivision(divisionName) {
        var self = this;
        var divisionNums = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = self.props.nums[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                key = _step2$value[0],
                value = _step2$value[1];

            if (key.substring(0, 3) == divisionName) {
              divisionNums.push([key.substring(3, 5), value]);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return divisionNums;
      }
    }, {
      key: 'render',
      value: function render() {
        var self = this;
        return React.createElement(
          'div',
          { id: 'outputarea' },
          React.createElement(
            'div',
            { className: 'outputareacolumn', id: 'outputareacolumn1' },
            React.createElement(DivisionContainer, { name: 'SSP', nums: self.getMetricsForDivision('SSP') }),
            React.createElement(DivisionContainer, { name: 'ESP', nums: self.getMetricsForDivision('ESP') }),
            React.createElement(DivisionContainer, { name: 'CDP', nums: self.getMetricsForDivision('CDP') })
          ),
          React.createElement(
            'div',
            { className: 'outputareacolumn', id: 'outputareacolumn2' },
            React.createElement(DivisionContainer, { name: 'CCP', nums: self.getMetricsForDivision('CCP') }),
            React.createElement(DivisionContainer, { name: 'BUG', nums: self.getMetricsForDivision('BUG') }),
            React.createElement(DivisionContainer, { name: 'REV', nums: self.getMetricsForDivision('REV') })
          )
        );
      }
    }]);

    return OutputArea;
  }(React.Component);

  var AppContainer = function (_React$Component4) {
    _inherits(AppContainer, _React$Component4);

    function AppContainer(props) {
      _classCallCheck(this, AppContainer);

      var _this4 = _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).call(this, props));

      _this4.state = {
        n: [],
        loading: false
      };
      return _this4;
    }

    _createClass(AppContainer, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        console.log('appcontainer updated with state:');
        console.log(this.state);
      }
    }, {
      key: 'submitUrl',
      value: function submitUrl(t) {
        console.log('submit url hit');

        var self = t;
        var urlinput = document.querySelector('#urlinput');
        var btn = document.querySelector('#scrapebtn');
        var outputarea = document.querySelector('#outputarea');
        var data = '';

        if (urlinput) {
          this.setState({ loading: true });
          console.log('have urlinput');
          var urlcontent = urlinput.value;
          $.ajax({
            url: 'scraper.php',
            type: 'GET',
            data: { "callFunc1": urlinput.value },
            error: function error(d) {
              self.setState({ loading: false });
              alert("failed");
              console.log(d);
            },
            success: function success(d) {
              self.setState({ loading: false });
              console.log('success');

              data = parseFromText(d);
              var nums = crunch(data);

              self.setState({
                n: nums
              });
            }
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this5 = this;

        var self = this;
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
          React.createElement(
            'div',
            { id: 'urlinputarea' },
            React.createElement('input', { id: 'urlinput', type: 'text', placeholder: 'Enter Squadding Url Here' }),
            React.createElement(
              'div',
              { id: 'scrapebtn', onClick: function onClick() {
                  return _this5.submitUrl(_this5);
                } },
              React.createElement('i', { className: 'fa fa-search' })
            )
          ),
          React.createElement(LoadingModal, { isShowing: self.state.loading }),
          React.createElement(OutputArea, { nums: self.state.n })
        );
      }
    }]);

    return AppContainer;
  }(React.Component);

  ReactDOM.render(React.createElement(AppContainer, null), document.querySelector('#shell'));
});