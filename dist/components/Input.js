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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var ink_text_input_1 = __importDefault(require("ink-text-input"));
var react_1 = __importStar(require("react"));
var LogText_1 = __importDefault(require("./LogText"));
var Row_1 = __importDefault(require("./Row"));
var useConstant_1 = __importDefault(require("../hooks/useConstant"));
var FocusProvider_1 = require("../providers/FocusProvider");
function Input(_a) {
    var onSubmit = _a.onSubmit, _b = _a.initialValue, initialValue = _b === void 0 ? '' : _b, label = _a.label, props = __rest(_a, ["onSubmit", "initialValue", "label"]);
    var focus = FocusProvider_1.useFocus();
    var initial = useConstant_1["default"](function () { return initialValue; });
    var _c = react_1.useState(initial), value = _c[0], setValue = _c[1];
    react_1.useEffect(function () {
        setValue(initial);
    }, [initial, label]);
    var handleChange = react_1.useCallback(function (value) {
        setValue(value);
    }, []);
    var handleSubmit = react_1.useCallback(function (value) {
        if (onSubmit) {
            onSubmit(value);
        }
    }, [onSubmit]);
    return (react_1["default"].createElement(Row_1["default"], { gap: 1 },
        react_1["default"].createElement(LogText_1["default"].Default, null,
            label,
            ":"),
        react_1["default"].createElement(ink_text_input_1["default"], __assign({ value: value, onChange: handleChange, onSubmit: handleSubmit }, props, { focus: focus }))));
}
exports["default"] = Input;
