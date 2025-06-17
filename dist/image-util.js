"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
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
function calculateImageSize(width, height, percent) {
  var calculatedPercent = percent / 100;
  var calculatedWidth = width * calculatedPercent;
  var calculatedHeight = height * calculatedPercent;
  return [calculatedWidth, calculatedHeight];
}
var imageData = [{
  name: "right-leg",
  url: _rightLeg["default"],
  dx: 242,
  dy: 290
}, {
  name: "left-leg",
  url: _leftLeg["default"],
  dx: 193,
  dy: 290
}, {
  name: "right-arm",
  url: _rightArm["default"],
  dx: 240,
  dy: 200
}, {
  name: "left-arm",
  url: _leftArm["default"],
  dx: 135,
  dy: 200
}, {
  name: "body",
  url: _body["default"],
  dx: 185,
  dy: 180
}, {
  name: "head",
  url: _head["default"],
  dx: 190,
  dy: 60
}, {
  name: "gallows",
  url: _gallows["default"],
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