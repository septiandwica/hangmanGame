"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
require("./app.css");
var _state = require("./state");
var _components = require("./components");
var _util = require("./util");
var _imageUtil = require("./image-util");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var App = function App() {
  var state = _objectSpread({}, _state.initialState);
  var imageSources = null;
  function changeState(callback) {
    state = callback(state);
    (0, _components.render)(state, onClickItem, onClickStart, imageSources);
  }
  function initializeData() {
    return (0, _imageUtil.fetchAllImages)().then(function (images) {
      imageSources = images;
    });
  }
  function onClickItem(c) {
    changeState(function (state) {
      return (0, _state.selectCharacter)(state, c);
    });
  }
  function onClickStart() {
    if (state.wordLoading) return;
    changeState(function (state) {
      return (0, _state.setWordLoading)(state, true);
    });
    (0, _util.fetchWord)().then(function (word) {
      var intervalId = setInterval(function () {
        if ((0, _util.isGameEnded)(state.gameStatus)) {
          clearInterval(intervalId);
          return;
        }
        changeState(function (state) {
          return (0, _state.checkGameStatus)((0, _state.decreaseTimer)(state));
        });
      }, 1000);
      changeState(function (state) {
        return (0, _state.startGame)((0, _state.initializeState)((0, _state.setWordLoading)(state, false), word));
      });
    });
  }
  initializeData().then(function () {
    return (0, _components.render)(state, onClickItem, onClickStart, imageSources);
  });
};
var _default = exports["default"] = App;