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