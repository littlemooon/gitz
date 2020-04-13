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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var ink_1 = require("ink");
var react_1 = __importStar(require("react"));
function Column(_a) {
    var children = _a.children, _b = _a.gap, gap = _b === void 0 ? 0 : _b, props = __rest(_a, ["children", "gap"]);
    return (react_1["default"].createElement(ink_1.Box, __assign({ flexDirection: "column" }, props), react_1.Children.map(children, function (c, i) { return (react_1["default"].createElement(ink_1.Box, { paddingBottom: i === react_1.Children.count(children) - 1 ? 0 : gap }, c)); })));
}
exports["default"] = Column;
