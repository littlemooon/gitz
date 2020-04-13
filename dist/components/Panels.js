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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ink_1 = require("ink");
var react_1 = __importStar(require("react"));
var FocusProvider_1 = __importDefault(require("../providers/FocusProvider"));
var Select_1 = __importDefault(require("./Select"));
function Panels(_a) {
    var items = _a.items;
    var _b = react_1.useState(), selected = _b[0], setSelected = _b[1];
    var focusItems = react_1.useMemo(function () {
        return items.map(function (item) {
            return __assign(__assign({}, item), { content: (react_1["default"].createElement(ink_1.Box, { paddingBottom: 1 },
                    react_1["default"].createElement(FocusProvider_1["default"], { focus: item.id === (selected === null || selected === void 0 ? void 0 : selected.id) }, item.content))) });
        });
    }, [items, selected]);
    return (react_1["default"].createElement(FocusProvider_1["default"], { focus: !selected },
        react_1["default"].createElement(Select_1["default"], { items: focusItems, onSelect: setSelected })));
}
exports["default"] = Panels;
