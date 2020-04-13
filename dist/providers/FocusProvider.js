"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
exports.FocusContext = react_1.createContext(undefined);
function FocusProvider(_a) {
    var focus = _a.focus, children = _a.children;
    return react_1["default"].createElement(exports.FocusContext.Provider, { value: focus }, children);
}
exports["default"] = FocusProvider;
function useFocus() {
    var context = react_1.useContext(exports.FocusContext);
    return context;
}
exports.useFocus = useFocus;
