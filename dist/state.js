"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkGameStatus = checkGameStatus;
exports.decreaseTimer = decreaseTimer;
exports.initialState = void 0;
exports.initializeState = initializeState;
exports.selectCharacter = selectCharacter;
exports.setWordLoading = setWordLoading;
exports.startGame = startGame;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _util = require("./util");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var initialState = exports.initialState = {
  enteredCharacters: {},
  charMap: {},
  wordArr: [],
  charsLeft: 0,
  chancesLeft: 7,
  timer: 60,
  gameStatus: _util.GameStatus.READY,
  wordLoading: false
};
function startGame(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    gameStatus: _util.GameStatus.START
  });
}
function initializeState(state, word) {
  var charMap = (0, _util.wordToMap)(word);
  var wordArr = Array.from({
    length: word.length
  }).map(function (_, idx) {
    return word[idx] === " " ? " " : "*";
  });
  var charsLeft = Object.keys(charMap).length - 1;
  return _objectSpread(_objectSpread({}, initialState), {}, {
    charMap: charMap,
    wordArr: wordArr,
    charsLeft: charsLeft,
    gameStatus: _util.GameStatus.START,
    originalWord: word.toUpperCase() // ← tambahkan ini
  });
}
function decreaseTimer(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    timer: state.timer - 1
  });
}
function checkGameStatus(state) {
  if (state.charsLeft === 0) {
    return _objectSpread(_objectSpread({}, state), {}, {
      gameStatus: _util.GameStatus.WIN
    });
  } else if (state.chancesLeft === 0 || state.timer === 0) {
    return _objectSpread(_objectSpread({}, state), {}, {
      gameStatus: _util.GameStatus.LOSE
    });
  }
  return state;
}
function selectCharacter(state, enteredCharacter) {
  var enteredCharacters = _objectSpread(_objectSpread({}, state.enteredCharacters), {}, (0, _defineProperty2["default"])({}, enteredCharacter, true));
  if (!state.charMap[enteredCharacter]) {
    var chancesLeft = state.chancesLeft - 1;
    var _gameStatus = chancesLeft === 0 ? _util.GameStatus.LOSE : state.gameStatus;
    return _objectSpread(_objectSpread({}, state), {}, {
      chancesLeft: chancesLeft,
      gameStatus: _gameStatus,
      enteredCharacters: enteredCharacters
    });
  }
  var wordArr = (0, _toConsumableArray2["default"])(state.wordArr);
  state.charMap[enteredCharacter].forEach(function (i) {
    wordArr[i] = enteredCharacter;
  });
  var charsLeft = state.charsLeft - 1;
  var gameStatus = charsLeft === 0 ? _util.GameStatus.WIN : state.gameStatus;
  return _objectSpread(_objectSpread({}, state), {}, {
    wordArr: wordArr,
    charsLeft: charsLeft,
    gameStatus: gameStatus,
    enteredCharacters: enteredCharacters
  });
}
function setWordLoading(state, wordLoading) {
  return _objectSpread(_objectSpread({}, state), {}, {
    wordLoading: wordLoading
  });
}