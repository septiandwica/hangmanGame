"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameStatus = void 0;
exports.fetchWord = fetchWord;
exports.generateGameMessage = generateGameMessage;
exports.isGameEnded = isGameEnded;
exports.wordToMap = wordToMap;
var GameStatus = exports.GameStatus = {
  READY: "READY",
  START: "START",
  LOSE: "LOSE",
  WIN: "WIN"
};
function isGameEnded(gameStatus) {
  return gameStatus !== GameStatus.START;
}
function fetchWord() {
  return fetch("https://puzzle.mead.io/puzzle?wordCount=2").then(function (r) {
    return r.json();
  }).then(function (data) {
    return data.puzzle;
  });
}
function wordToMap(word) {
  return word.toUpperCase().split("").reduce(function (map, c, idx) {
    if (!map[c]) map[c] = [];
    map[c].push(idx);
    return map;
  }, {});
}
function generateGameMessage(gameStatus, chancesLeft) {
  if (gameStatus === GameStatus.START) {
    return "Chances left: ".concat(chancesLeft);
  } else if (gameStatus === GameStatus.READY) {
    return "Please start the game.";
  } else if (gameStatus === GameStatus.LOSE) {
    return "You lost the game. Please try again.";
  } else if (gameStatus === GameStatus.WIN) {
    return "You guessed the word! Please try again.";
  }
  return "";
}