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
var _a;
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var useCli_1 = __importDefault(require("../hooks/useCli"));
var Column_1 = __importDefault(require("./Column"));
var Exit_1 = __importDefault(require("./Exit"));
var LogText_1 = __importDefault(require("./LogText"));
var RenderTimes_1 = __importDefault(require("./RenderTimes"));
var Row_1 = __importDefault(require("./Row"));
var LogType;
(function (LogType) {
    LogType["debug"] = "debug";
    LogType["info"] = "info";
    LogType["success"] = "success";
    LogType["warn"] = "warn";
    LogType["error"] = "error";
})(LogType = exports.LogType || (exports.LogType = {}));
var typeMaxLength = Math.max.apply(Math, Object.values(LogType).map(function (x) { return x.length; }));
function getTypeName(type) {
    return type.padEnd(typeMaxLength);
}
var logColorProps = (_a = {},
    _a[LogType.debug] = { cyan: true },
    _a[LogType.info] = { blue: true },
    _a[LogType.success] = { green: true },
    _a[LogType.warn] = { yellow: true },
    _a[LogType.error] = { red: true },
    _a);
function getLogColorProps(type) {
    return type ? logColorProps[type] : undefined;
}
exports.getLogColorProps = getLogColorProps;
function LogBase(_a) {
    var type = _a.type, children = _a.children;
    var flags = useCli_1["default"]().flags;
    var colorProps = getLogColorProps(type);
    return (react_1["default"].createElement(Row_1["default"], { gap: 2 },
        flags.debug ? (react_1["default"].createElement(Row_1["default"], { gap: 2 },
            react_1["default"].createElement(LogText_1["default"].Default, __assign({ type: type }, colorProps), getTypeName(type)),
            react_1["default"].createElement(LogText_1["default"].Default, null, Date.now()))) : null,
        react_1["default"].createElement(Row_1["default"], { gap: 1 }, children)));
}
var Log = {
    Debug: function (_a) {
        var children = _a.children, name = _a.name, props = __rest(_a, ["children", "name"]);
        var flags = useCli_1["default"]().flags;
        return flags.debug ? (react_1["default"].createElement(RenderTimes_1["default"], { count: 1 },
            react_1["default"].createElement(LogBase, __assign({ type: LogType.debug }, props),
                react_1["default"].createElement(Column_1["default"], null,
                    react_1["default"].createElement(LogText_1["default"].Default, { yellow: true }, name),
                    children)))) : null;
    },
    Info: function (props) {
        return react_1["default"].createElement(LogBase, __assign({ type: LogType.info }, props));
    },
    Success: function (_a) {
        var exit = _a.exit, props = __rest(_a, ["exit"]);
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(LogBase, __assign({ type: LogType.success }, props)),
            exit && react_1["default"].createElement(Exit_1["default"], null)));
    },
    Warn: function (props) {
        return react_1["default"].createElement(LogBase, __assign({ type: LogType.warn }, props));
    },
    Error: function (_a) {
        var exit = _a.exit, props = __rest(_a, ["exit"]);
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(LogBase, __assign({ type: LogType.error }, props)),
            exit && react_1["default"].createElement(Exit_1["default"], null)));
    }
};
exports["default"] = Log;
