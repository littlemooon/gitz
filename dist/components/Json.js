"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
function Json(_a) {
    var children = _a.children;
    return react_1["default"].createElement(react_1["default"].Fragment, null, JSON.stringify(children, undefined, 2));
}
exports["default"] = Json;
