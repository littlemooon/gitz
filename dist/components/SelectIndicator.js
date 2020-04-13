"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ink_1 = require("ink");
var react_1 = __importDefault(require("react"));
var FocusProvider_1 = require("../providers/FocusProvider");
function SelectIndicator(_a) {
    var selected = _a.selected;
    var focus = FocusProvider_1.useFocus();
    return (react_1["default"].createElement(ink_1.Box, { marginRight: 1 }, selected && focus ? react_1["default"].createElement(ink_1.Color, { cyan: true }, '>') : ' '));
}
exports["default"] = SelectIndicator;
