"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Word = exports.KeyboardLayout = exports.HangmanImage = exports.ButtonBox = void 0;
exports.render = render;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _util = require("./util");
var _imageUtil = require("./image-util");
var _dom = require("./dom");
var HangmanImage = exports.HangmanImage = function HangmanImage(chancesLeft, images) {
  var container = (0, _dom.id)("hangman-image");
  var context = container.getContext("2d");
  context.clearRect(0, 0, container.width, container.height);
  images.slice(chancesLeft).map(function (item, idx) {
    context.drawImage.apply(context, [item.image, item.dx, item.dy].concat((0, _toConsumableArray2["default"])((0, _imageUtil.calculateImageSize)(item.image.width, item.image.height, 70))));
  });
};
var Word = exports.Word = function Word(gameStatus, chancesLeft, wordArr, originalWord) {
  var container = (0, _dom.id)("word");
  container.innerHTML = "";
  if ((0, _util.isGameEnded)(gameStatus)) {
    var message = (0, _dom.h)("p");
    message.innerText = (0, _util.generateGameMessage)(gameStatus, chancesLeft);
    container.appendChild(message);
    if (gameStatus === _util.GameStatus.LOSE) {
      var answer = (0, _dom.h)("p");
      answer.innerText = "Jawaban yang benar: ".concat(originalWord);
      answer.style.color = "var(--color-accent-light)";
      answer.style.marginTop = "10px";
      answer.style.fontWeight = "bold";
      container.appendChild(answer);
    }
    return;
  }
  var wordText = (0, _dom.h)("div");
  wordText.classList.add("word-text");
  var spans = wordArr.map(function (c) {
    var span = (0, _dom.h)("span");
    if (c !== " ") {
      span.classList.add("character");
    }
    span.innerText = c;
    return span;
  });
  wordText.append.apply(wordText, (0, _toConsumableArray2["default"])(spans));
  container.appendChild(wordText);
};
var KeyboardLayout = exports.KeyboardLayout = function KeyboardLayout(gameStatus, enteredCharacters, onClickItem) {
  var container = (0, _dom.id)("keyboard-layout");
  container.innerHTML = "";
  var ul = (0, _dom.h)("ul");
  ul.classList.add("keyboard-layout");
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(function (c) {
    var li = (0, _dom.h)("li");
    var button = (0, _dom.h)("button");
    button.addEventListener("click", function () {
      return onClickItem(c);
    });
    button.classList.add("keyboard-button");
    button.innerText = c;
    button.disabled = (0, _util.isGameEnded)(gameStatus) || enteredCharacters[c];
    li.appendChild(button);
    return li;
  }).forEach(function (node) {
    return ul.appendChild(node);
  });
  container.appendChild(ul);
};
var ButtonBox = exports.ButtonBox = function ButtonBox(wordLoading, gameStatus, chancesLeft, timer, onClickStart) {
  var container = (0, _dom.id)("button-box");
  container.innerHTML = "";

  // chances text
  var chances = (0, _dom.h)("div");
  chances.classList.add("chances-text");
  chances.innerText = "Chances: ".concat(chancesLeft);

  // timer
  var timerText = (0, _dom.h)("div");
  timerText.classList.add("timer-text");
  timerText.innerText = timer;

  // Game start button
  var button = (0, _dom.h)("button");
  button.classList.add("start-button");
  button.innerText = "START";
  button.disabled = wordLoading || !(0, _util.isGameEnded)(gameStatus);
  button.addEventListener("click", onClickStart);
  container.append(chances, timerText, button);
};
function render(state, onClickItem, onClickStart, imageSources) {
  KeyboardLayout(state.gameStatus, state.enteredCharacters, onClickItem);
  Word(state.gameStatus, state.chancesLeft, state.wordArr, state.originalWord);
  ButtonBox(state.wordLoading, state.gameStatus, state.chancesLeft, state.timer, onClickStart);
  HangmanImage(state.chancesLeft, imageSources);
}