// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@babel/runtime/helpers/typeof.js":[function(require,module,exports) {
function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/toPrimitive.js":[function(require,module,exports) {
var _typeof = require("./typeof.js")["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./typeof.js":"node_modules/@babel/runtime/helpers/typeof.js"}],"node_modules/@babel/runtime/helpers/toPropertyKey.js":[function(require,module,exports) {
var _typeof = require("./typeof.js")["default"];
var toPrimitive = require("./toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./typeof.js":"node_modules/@babel/runtime/helpers/typeof.js","./toPrimitive.js":"node_modules/@babel/runtime/helpers/toPrimitive.js"}],"node_modules/@babel/runtime/helpers/defineProperty.js":[function(require,module,exports) {
var toPropertyKey = require("./toPropertyKey.js");
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPropertyKey.js":"node_modules/@babel/runtime/helpers/toPropertyKey.js"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/app.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/@babel/runtime/helpers/arrayLikeToArray.js":[function(require,module,exports) {
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray.js");
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return arrayLikeToArray(r);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":"node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"node_modules/@babel/runtime/helpers/iterableToArray.js":[function(require,module,exports) {
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray.js");
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
  }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":"node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"node_modules/@babel/runtime/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles.js");
var iterableToArray = require("./iterableToArray.js");
var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");
var nonIterableSpread = require("./nonIterableSpread.js");
function _toConsumableArray(r) {
  return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithoutHoles.js":"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js","./iterableToArray.js":"node_modules/@babel/runtime/helpers/iterableToArray.js","./unsupportedIterableToArray.js":"node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js","./nonIterableSpread.js":"node_modules/@babel/runtime/helpers/nonIterableSpread.js"}],"src/util.js":[function(require,module,exports) {
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
},{}],"src/state.js":[function(require,module,exports) {
"use strict";

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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
  var enteredCharacters = _objectSpread(_objectSpread({}, state.enteredCharacters), {}, (0, _defineProperty2.default)({}, enteredCharacter, true));
  if (!state.charMap[enteredCharacter]) {
    var chancesLeft = state.chancesLeft - 1;
    var _gameStatus = chancesLeft === 0 ? _util.GameStatus.LOSE : state.gameStatus;
    return _objectSpread(_objectSpread({}, state), {}, {
      chancesLeft: chancesLeft,
      gameStatus: _gameStatus,
      enteredCharacters: enteredCharacters
    });
  }
  var wordArr = (0, _toConsumableArray2.default)(state.wordArr);
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
},{"@babel/runtime/helpers/toConsumableArray":"node_modules/@babel/runtime/helpers/toConsumableArray.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","./util":"src/util.js"}],"src/assets/gallows.png":[function(require,module,exports) {
module.exports = "/gallows.b1eeaae4.png";
},{}],"src/assets/body.png":[function(require,module,exports) {
module.exports = "/body.bdfba8bf.png";
},{}],"src/assets/left-arm.png":[function(require,module,exports) {
module.exports = "/left-arm.3ec3ab5f.png";
},{}],"src/assets/right-arm.png":[function(require,module,exports) {
module.exports = "/right-arm.209606c9.png";
},{}],"src/assets/left-leg.png":[function(require,module,exports) {
module.exports = "/left-leg.afd8976a.png";
},{}],"src/assets/right-leg.png":[function(require,module,exports) {
module.exports = "/right-leg.d1b6fc5c.png";
},{}],"src/assets/head.png":[function(require,module,exports) {
module.exports = "/head.d7561c03.png";
},{}],"src/image-util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateImageSize = calculateImageSize;
exports.fetchAllImages = fetchAllImages;
exports.loadImage = loadImage;
var _gallows = _interopRequireDefault(require("./assets/gallows.png"));
var _body = _interopRequireDefault(require("./assets/body.png"));
var _leftArm = _interopRequireDefault(require("./assets/left-arm.png"));
var _rightArm = _interopRequireDefault(require("./assets/right-arm.png"));
var _leftLeg = _interopRequireDefault(require("./assets/left-leg.png"));
var _rightLeg = _interopRequireDefault(require("./assets/right-leg.png"));
var _head = _interopRequireDefault(require("./assets/head.png"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function calculateImageSize(width, height, percent) {
  var calculatedPercent = percent / 100;
  var calculatedWidth = width * calculatedPercent;
  var calculatedHeight = height * calculatedPercent;
  return [calculatedWidth, calculatedHeight];
}
var imageData = [{
  name: "right-leg",
  url: _rightLeg.default,
  dx: 242,
  dy: 290
}, {
  name: "left-leg",
  url: _leftLeg.default,
  dx: 193,
  dy: 290
}, {
  name: "right-arm",
  url: _rightArm.default,
  dx: 240,
  dy: 200
}, {
  name: "left-arm",
  url: _leftArm.default,
  dx: 135,
  dy: 200
}, {
  name: "body",
  url: _body.default,
  dx: 185,
  dy: 180
}, {
  name: "head",
  url: _head.default,
  dx: 190,
  dy: 60
}, {
  name: "gallows",
  url: _gallows.default,
  dx: 10,
  dy: 20
}];
function loadImage(url, name, dx, dy) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.src = url;
    image.addEventListener("load", function () {
      return resolve({
        image: image,
        name: name,
        dx: dx,
        dy: dy
      });
    });
    image.addEventListener("error", function () {
      return reject(new Error("Error on loading ".concat(url)));
    });
  });
}
function fetchAllImages() {
  return Promise.all(imageData.map(function (item) {
    return loadImage(item.url, item.name, item.dx, item.dy);
  }));
}
},{"./assets/gallows.png":"src/assets/gallows.png","./assets/body.png":"src/assets/body.png","./assets/left-arm.png":"src/assets/left-arm.png","./assets/right-arm.png":"src/assets/right-arm.png","./assets/left-leg.png":"src/assets/left-leg.png","./assets/right-leg.png":"src/assets/right-leg.png","./assets/head.png":"src/assets/head.png"}],"src/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = h;
exports.id = id;
function h(tag) {
  return document.createElement(tag);
}
function id(id) {
  return document.getElementById(id);
}
},{}],"src/components.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Word = exports.KeyboardLayout = exports.HangmanImage = exports.ButtonBox = void 0;
exports.render = render;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _util = require("./util");
var _imageUtil = require("./image-util");
var _dom = require("./dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var HangmanImage = exports.HangmanImage = function HangmanImage(chancesLeft, images) {
  var container = (0, _dom.id)("hangman-image");
  var context = container.getContext("2d");
  context.clearRect(0, 0, container.width, container.height);
  images.slice(chancesLeft).map(function (item, idx) {
    context.drawImage.apply(context, [item.image, item.dx, item.dy].concat((0, _toConsumableArray2.default)((0, _imageUtil.calculateImageSize)(item.image.width, item.image.height, 70))));
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
  wordText.append.apply(wordText, (0, _toConsumableArray2.default)(spans));
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
},{"@babel/runtime/helpers/toConsumableArray":"node_modules/@babel/runtime/helpers/toConsumableArray.js","./util":"src/util.js","./image-util":"src/image-util.js","./dom":"src/dom.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
require("./app.css");
var _state = require("./state");
var _components = require("./components");
var _util = require("./util");
var _imageUtil = require("./image-util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var _default = exports.default = App;
},{"@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","./app.css":"src/app.css","./state":"src/state.js","./components":"src/components.js","./util":"src/util.js","./image-util":"src/image-util.js"}],"src/index.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./index.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var run = function run() {
  window.addEventListener("DOMContentLoaded", function () {
    (0, _app.default)();
  });
};
run();
},{"./app":"src/app.js","./index.css":"src/index.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63281" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map