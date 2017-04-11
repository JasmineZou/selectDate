webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 通过 require 的方式依赖 React，ReactDOM
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(32);
	// import {
	//   provinceDistrict
	// } from './provinceDistrict';

	// var year = ['2016','2017'],
	//     month = [1,2,3,4,5,6,7,8,9,10,11,12];

	//计算年份
	function caculateDate() {
	  var date = new Date();
	  var currentYear = date.getFullYear(),
	      years = [],
	      month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	  for (var i = 1940; i <= parseInt(currentYear); i++) {
	    years.push(i.toString());
	  }
	  return { year: years, month: month };
	}

	var SelectDate = React.createClass({
	  displayName: 'SelectDate',

	  getDefaultProps: function getDefaultProps() {
	    var date = new Date();
	    var year = date.getFullYear(),
	        month = date.getMonth() + 1,
	        __month = month.toString().length == 1 ? year + "0" + month : year + month.toString();
	    // console.log("year:",year,"month:",month); 

	    return {
	      year: year,
	      month: month,
	      item: __month
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      item: {
	        year: this.props.year,
	        month: this.props.month,
	        item: this.props.item
	      }
	    };
	  },

	  handleChange: function handleChange(value) {
	    // console.log("value:",value);
	    this.setState({
	      item: value
	    });
	  },
	  handleClick: function handleClick(value) {
	    // console.log("this.state.item:",this.state.item);
	    this.props.handleChange(this.state.item, value);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.setState({
	      item: newProps.date
	    });
	  },
	  // shouldComponentUpdate:function(nextProps,nextState){
	  //   return nextState.item!=this.state.item
	  // },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'select-date' },
	      React.createElement(
	        'div',
	        { className: 'select-date-content' },
	        React.createElement(
	          'div',
	          { className: 'select-date-title' },
	          React.createElement(
	            'a',
	            { onClick: this.handleClick.bind(null, true) },
	            '\u53D6\u6D88'
	          ),
	          React.createElement(
	            'a',
	            { onClick: this.handleClick.bind(null, false) },
	            '\u786E\u5B9A'
	          )
	        ),
	        React.createElement(SelectBody, { onChange: this.handleChange, year: this.state.item.year, month: this.state.item.month })
	      )
	    );
	  }

	});

	var SelectBody = React.createClass({
	  displayName: 'SelectBody',


	  getInitialState: function getInitialState() {
	    return {
	      year: this.props.year,
	      month: this.props.month,
	      monthList: []
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    // console.log("this.props.year:",this.props.year,this.props.month);
	    this.isCurrentYear(this.props.year, this.props.month);
	  },
	  isCurrentYear: function isCurrentYear(propsYear, propsMonth) {
	    var isChangeMonth = this.isChangeMonth(propsYear, propsMonth);
	    var date = new Date();
	    var year = date.getFullYear();
	    //     month = date.getMonth()+1,
	    //     changeMonth = 0,
	    //     monthList = caculateDate().month;
	    if (propsYear == year) {
	      // var k=0,valMonth=[];
	      // for(let i =0;i<monthList.length;i++){
	      //   if(monthList[i]==month){
	      //      k=i;
	      //      break;
	      //   }
	      // }
	      // valMonth = monthList.slice(0,k+1);
	      //  changeMonth=this.state.month>month?month:propsMonth;
	      //  console.log(changeMonth,this.state.month>month," ",month);
	      this.setState({
	        monthList: isChangeMonth.monthList,
	        month: isChangeMonth.month
	      });
	    } else {
	      this.setState({
	        monthList: isChangeMonth.monthList
	      });
	    }
	  },
	  isChangeMonth: function isChangeMonth(propsYear, propsMonth) {
	    var date = new Date();
	    var year = date.getFullYear(),
	        month = date.getMonth() + 1,
	        changeMonth = this.state.month,
	        monthList = caculateDate().month,
	        k = 0,
	        valMonth = [];
	    if (propsYear == year) {
	      for (var i = 0; i < monthList.length; i++) {
	        if (monthList[i] == month) {
	          k = i;
	          break;
	        }
	      }
	      monthList = monthList.slice(0, k + 1);
	      changeMonth = this.state.month > month ? month : propsMonth;
	    }
	    return {
	      monthList: monthList,
	      month: changeMonth
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.isCurrentYear(newProps.year, newProps.month);
	  },
	  handleChange: function handleChange(value, type) {
	    var year = this.state.year,
	        month = this.state.month,
	        __month;
	    // console.log("value:",value);

	    if (type == 'month') {
	      month = value.toString();
	      __month = value.toString().length == 1 ? "0" + value : value.toString();
	    } else {
	      year = value.toString();
	      month = this.isChangeMonth(year, this.state.month).month;
	      __month = month.toString().length == 1 ? "0" + month : month.toString();
	      // this.isCurrentYear(year,month);
	    }
	    this.setState({
	      year: year,
	      month: month
	    });
	    this.props.onChange({ year: year, month: month, item: year + "-" + __month });
	  },
	  render: function render() {
	    var item = caculateDate();
	    return React.createElement(
	      'div',
	      { className: 'select-date-body' },
	      React.createElement('div', { className: 'date-selected' }),
	      React.createElement(
	        'div',
	        { className: 'select-date-list' },
	        React.createElement(ListSelect, { list: caculateDate().year, onChange: this.handleChange, value: this.state.year, type: 'year' }),
	        this.state.monthList.length != 0 ? React.createElement(ListSelect, { 'class': 'select-month', list: this.state.monthList, onChange: this.handleChange, isCircle: 'true', value: this.state.month, type: 'month' }) : ""
	      )
	    );
	  }
	});
	var __select = {
	  startPos: {}, //开始位置
	  movePos: {}, //滑动位置
	  currentTop: 0, //当前高度
	  moveHeight: 0, //滑动的高度
	  activeIndex: 0, //保存滑动过后为当前第几个
	  lineHeight: 3, //行高
	  isMove: false
	};
	//年月组件
	var ListSelect = React.createClass({
	  displayName: 'ListSelect',

	  getDefaultProps: function getDefaultProps() {
	    return {
	      class: ''
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      activeIndex: 0
	    };
	  },
	  // shouldComponentUpdate:function(nextProps,nextState){
	  //   return nextState.activeIndex!=this.state.activeIndex||nextProps.lits!=this.props.list||nextProps.value!=this.props.value
	  // },
	  componentWillMount: function componentWillMount() {
	    this.changeIndex(this.props.list, this.props.value);
	  },
	  changeIndex: function changeIndex(list, value) {
	    var that = this;
	    list.map(function (item, index) {
	      if (item == value) {
	        that.setState({
	          activeIndex: -index
	        }, function () {
	          // console.log("value:",value,that.state.activeIndex);
	          ReactDOM.findDOMNode(that).setAttribute('style', 'top:' + that.state.activeIndex * 3 + 'rem'); //更新组件的top值
	        });
	      }
	    });
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.changeIndex(newProps.list, newProps.value);
	  },
	  componentDidMount: function componentDidMount() {},
	  //触摸开始
	  handleTouchStart: function handleTouchStart(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    var _touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
	    __select.startPos = {
	      x: _touch.pageX,
	      y: _touch.pageY
	    }; //取第一个touch的坐标值
	    __select.currentTop = parseInt(ReactDOM.findDOMNode(this).style.top); //获取当前高度
	    __select.isMove = false;
	  },
	  //滑动中
	  handleTouchMove: function handleTouchMove(event) {
	    event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
	    event.stopPropagation();
	    var _touch = event.targetTouches[0];
	    __select.movePos = {
	      x: _touch.pageX - __select.startPos.x,
	      y: _touch.pageY - __select.startPos.y
	    };
	    //当前被选中的为第一个并且向下滑动或当前为最后一个并且向上滑动时阻止其滑动
	    if (this.state.activeIndex === 0 && __select.movePos.y > 0 || Math.abs(this.state.activeIndex) === this.props.list.length - 1 && __select.movePos.y < 0) {
	      __select.isMove = false;
	      return;
	    }

	    //isScrolling为1时，表示纵向滑动，0为横向滑动
	    var _isScrolling = Math.abs(__select.movePos.x) < Math.abs(__select.movePos.y) ? 1 : 0;
	    if (_isScrolling === 1) {
	      __select.isMove = true;
	      //当前移动距离
	      __select.moveHeight = parseInt(__select.movePos.y) / 10;
	      __select.activeIndex = Math.floor(parseInt(Math.round(__select.moveHeight * .8) + __select.currentTop) / 3);
	      this.move();
	      ReactDOM.findDOMNode(this).setAttribute('style', 'top:' + (Math.floor(__select.moveHeight) * .6 + __select.currentTop) + 'rem'); //更新组件的top值


	      0.;
	    }
	  },
	  //移动算法
	  move: function move() {
	    var top = this.props.list.length - 1;
	    //如果滑到顶部则activeIndex为初始值，如果滑到底部则activeIndex为list的长度-1
	    if (__select.activeIndex > 0 && __select.moveHeight > 0) {
	      __select.activeIndex = 0;
	    } else if (Math.abs(__select.activeIndex) > top && __select.moveHeight < 0 && __select.activeIndex < 0) {
	      __select.activeIndex = -top;
	    }
	  },
	  //离开屏幕
	  handleTouchEnd: function handleTouchEnd(event) {
	    if (__select.isMove) {
	      //计算当前top是否
	      this.setState({
	        activeIndex: Math.abs(__select.activeIndex)
	      }, function () {
	        var that = this;
	        setTimeout(function () {
	          ReactDOM.findDOMNode(that).setAttribute('style', 'top:' + __select.activeIndex * 3 + 'rem'); //更新组件的top值
	        }, 200);
	        // ReactDOM.findDOMNode(this).setAttribute('style', 'top:' + (__select.activeIndex*3) + 'rem'); //更新组件的top值
	        //将值上传给父组件
	        this.props.onChange(this.props.list[Math.abs(__select.activeIndex)], this.props.type);
	      });
	    }
	  },
	  render: function render() {
	    var that = this;
	    return React.createElement(
	      'ul',
	      { className: 'select-year ' + this.props.class, onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd },
	      this.props.list.map(function (item, index) {
	        var className = index === Math.abs(that.state.activeIndex) ? 'active' : '';
	        return React.createElement(
	          'li',
	          { className: className, key: index },
	          item
	        );
	      })
	    );
	  }

	});

	ReactDOM.render(React.createElement(SelectDate, null), document.getElementById('Appbody'));

/***/ }
]);