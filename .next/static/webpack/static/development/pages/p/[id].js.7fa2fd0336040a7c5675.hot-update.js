webpackHotUpdate("static/development/pages/p/[id].js",{

/***/ "./components/SelectWho.js":
/*!*********************************!*\
  !*** ./components/SelectWho.js ***!
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
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/Modal */ "./components/Modal.js");







var _jsxFileName = "/Users/RyoheiSato/news-sharing/components/SelectWho.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;






var SelectWho =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(SelectWho, _Component);

  function SelectWho(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SelectWho);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(SelectWho).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "getUserList", function () {
      var self = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this);
      console.log('now inside getUserList function');
      var db = firebase__WEBPACK_IMPORTED_MODULE_10___default.a.firestore(); // firestore のオブジェクト取得

      db.collection('news-user').get().then(function (querySnapshot) {
        var userList = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          userList.push(__jsx("li", {
            key: doc.id,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            },
            __self: this
          }, __jsx("input", {
            type: "checkbox",
            onChange: function onChange(e) {
              return self.onChecked(doc.data().userid, e);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            },
            __self: this
          }), doc.data().userid));
        });
        self.setState({
          userList: userList
        });
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "onChangeText", function (e) {
      _this.setState({
        textAreaValue: e.target.value
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "doAction", function (article, userid, e) {
      console.log('doActionの中');
      console.log('userid is');
      console.log(userid);
      var db = firebase__WEBPACK_IMPORTED_MODULE_10___default.a.firestore(); // Firestore の登録処理

      if (_this.state.currentSelectedUsers.length === 0 || _this.state.currentSelectedUsers === null || _this.state.currentSelectedUsers === undefined) {
        _this.setState({
          message: '共有する相手を1人以上選択してください'
        });

        return null;
      }

      db.collection('share').add({
        title: article.title,
        description: article.description,
        image: article.urlToImage,
        url: article.url,
        sharedFrom: userid,
        sharedTo: _this.state.currentSelectedUsers,
        comment: _this.state.textAreaValue // コメントへの返信を実装するときにはcommentを配列にする（か都度フィールドを追加する？），コメントへのいいねを実装するならネストJSONにする?

      }).then(function (doc) {
        console.log("\u5171\u6709\u3057\u307E\u3057\u305F");

        _this.setState({
          message: '共有しました！続けて別の人やグループに共有することもできます。',
          textAreaValue: ''
        });

        setTimeout(function () {
          _this.setState({
            message: null
          });
        }, 2000);
      })["catch"](function (error) {
        console.log("\u5171\u6709\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30EA\u30C8\u30E9\u30A4\u3057\u3066\u304F\u3060\u3055\u3044\u3002");

        _this.setState({
          message: '共有に失敗しました。リトライしてください。',
          textAreaValue: ''
        });

        setTimeout(function () {
          _this.setState({
            message: null
          });
        }, 2000);
      });

      _this.setState({
        title: '',
        description: '',
        image: '',
        url: '',
        sharedFrom: '',
        sharedTo: '',
        comment: ''
      });
    });

    if (_this.props.login == false) {
      next_router__WEBPACK_IMPORTED_MODULE_9___default.a.push('/');
    }

    _this.state = {
      userList: [],
      textAreaValue: '',
      message: null
    };
    _this.logined = _this.logined.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onChecked = _this.onChecked.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.doAction = _this.doAction.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onChangeText = _this.onChangeText.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    return _this;
  } // login, logout 処理


  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SelectWho, [{
    key: "logined",
    value: function logined() {
      console.log('logined.');
    }
  }, {
    key: "logouted",
    value: function logouted() {
      next_router__WEBPACK_IMPORTED_MODULE_9___default.a.push('/');
    }
  }, {
    key: "onChecked",
    value: function onChecked(userid, e) {
      var currentSelectedUsers = this.state.currentSelectedUsers ? this.state.currentSelectedUsers : [];
      currentSelectedUsers.push(userid); // はまりポイント：
      // 以下で {currentSelectedUsers : currentSelectedUsers.push(userid)}としたら
      // currentSelectedUsers に 1 という数字が入って配列じゃないためpushできないという現象
      // Array.push は 戻り値として length を返すため

      e.target.checked ? this.setState({
        currentSelectedUsers: currentSelectedUsers
      }) : this.setState({
        currentSelectedUsers: currentSelectedUsers.filter(function (elem) {
          return elem !== userid;
        })
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var article = this.props.article;
      var userid = this.props.userid;
      (this.state.userList.length === 0 || this.state.userList === undefined) && this.getUserList();
      var userList = this.state.userList;
      console.log('renderの中でuserListがとれてるか');
      console.log(userList);
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }, __jsx("ul", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, userList), __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, __jsx("textarea", {
        value: this.state.textAreaValue,
        onChange: this.onChangeText,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      })), __jsx("button", {
        onClick: function onClick(e) {
          return _this2.doAction(article, userid, e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, "\u78BA\u5B9A"), __jsx("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, this.state.message)) // 共有先はここでモーダル（ポータル）を表示して選べるようにする
      ;
    }
  }]);

  return SelectWho;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

SelectWho = Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(function (state) {
  return state;
})(SelectWho);
/* harmony default export */ __webpack_exports__["default"] = (SelectWho);

/***/ })

})
//# sourceMappingURL=[id].js.7fa2fd0336040a7c5675.hot-update.js.map