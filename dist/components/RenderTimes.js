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
function RenderTimes(_a) {
    var count = _a.count, children = _a.children;
    var _b = react_1.useState(0), renderedCount = _b[0], setCount = _b[1];
    react_1.useEffect(function () { return setCount(function (count) { return count + 1; }); }, []);
    return renderedCount >= count ? null : react_1["default"].createElement(react_1["default"].Fragment, null, children);
}
exports["default"] = RenderTimes;
