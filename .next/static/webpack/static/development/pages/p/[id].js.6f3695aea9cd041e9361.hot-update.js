webpackHotUpdate("static/development/pages/p/[id].js",{

/***/ "./components/ShareNews.js":
/*!*********************************!*\
  !*** ./components/ShareNews.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");







var _jsxFileName = "/Users/thesugar/news-sharing/components/ShareNews.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;






var ShareNews =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(ShareNews, _Component);

  function ShareNews(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ShareNews);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(ShareNews).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "doAction", function (article, userid, e) {
      console.log('doActionの中');
      console.log('userid is');
      console.log(userid);
      var db = firebase__WEBPACK_IMPORTED_MODULE_10___default.a.firestore(); // Firestore の登録処理

      db.collection('share').add({
        title: article.title,
        description: article.description,
        image: article.urlToImage,
        url: article.url,
        sharedFrom: userid //sharedTo : 

      }).then(function (doc) {
        console.log("\u5171\u6709\u3057\u307E\u3057\u305F");
      })["catch"](function (error) {
        console.log("\u5171\u6709\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30EA\u30C8\u30E9\u30A4\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
      });

      _this.setState({
        title: '',
        description: '',
        image: '',
        url: ''
      });
    });

    if (_this.props.login == false) {
      next_router__WEBPACK_IMPORTED_MODULE_9___default.a.push('/address');
    }

    _this.state = {
      title: '',
      description: '',
      url: '',
      image: ''
    };
    _this.logined = _this.logined.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onChangeTitle = _this.onChangeTitle.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onChangeDetail = _this.onChangeDetail.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onChangeDeadline = _this.onChangeDeadline.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onChangeConcerns = _this.onChangeConcerns.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.doAction = _this.doAction.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    return _this;
  } // login, logout 処理


  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ShareNews, [{
    key: "logined",
    value: function logined() {
      console.log('logined.');
    }
  }, {
    key: "logouted",
    value: function logouted() {
      next_router__WEBPACK_IMPORTED_MODULE_9___default.a.push('/');
    } // フィールド入力処理

  }, {
    key: "onChangeTitle",
    value: function onChangeTitle(e) {
      this.setState({
        title: e.target.value
      });
    }
  }, {
    key: "onChangeDetail",
    value: function onChangeDetail(e) {
      this.setState({
        detail: e.target.value
      });
    }
  }, {
    key: "onChangeDeadline",
    value: function onChangeDeadline(e) {
      this.setState({
        deadline: e.target.value
      });
    }
  }, {
    key: "onChangeConcerns",
    value: function onChangeConcerns(e) {
      this.setState({
        concerns: e.target.value
      });
    } // データの登録処理

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var article = this.props.article;
      var userid = this.props.userid;
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        },
        __self: this
      }, __jsx("button", {
        onClick: function onClick(e) {
          return _this2.doAction(article, userid, e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }, "\u5171\u6709\u3059\u308B")) // 共有先はここでモーダル（ポータル）を表示して選べるようにする
      ;
    }
  }]);

  return ShareNews;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

ShareNews = Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(function (state) {
  return state;
})(ShareNews);
/* harmony default export */ __webpack_exports__["default"] = (ShareNews);

/***/ })

})
//# sourceMappingURL=[id].js.6f3695aea9cd041e9361.hot-update.js.map