"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ink_1 = require("ink");
var react_1 = __importDefault(require("react"));
var useCli_1 = __importDefault(require("../hooks/useCli"));
var Log_1 = require("./Log");
function LogTextBase(_a) {
    var type = _a.type, children = _a.children, props = __rest(_a, ["type", "children"]);
    return (react_1["default"].createElement(ink_1.Text, null,
        react_1["default"].createElement(ink_1.Color, __assign({}, Log_1.getLogColorProps(type), props), children)));
}
var LogText = {
    Default: function (props) {
        return react_1["default"].createElement(LogTextBase, __assign({}, props));
    },
    Debug: function (props) {
        var flags = useCli_1["default"]().flags;
        return flags.debug ? react_1["default"].createElement(LogTextBase, __assign({ type: Log_1.LogType.debug }, props)) : null;
    },
    Info: function (props) {
        return react_1["default"].createElement(LogTextBase, __assign({ type: Log_1.LogType.info }, props));
    },
    Success: function (props) {
        return react_1["default"].createElement(LogTextBase, __assign({ type: Log_1.LogType.success }, props));
    },
    Warn: function (props) {
        return react_1["default"].createElement(LogTextBase, __assign({ type: Log_1.LogType.warn }, props));
    },
    Error: function (props) {
        return react_1["default"].createElement(LogTextBase, __assign({ type: Log_1.LogType.error }, props));
    }
};
exports["default"] = LogText;
