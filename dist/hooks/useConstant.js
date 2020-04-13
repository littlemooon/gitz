"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useConstant(fn) {
    var ref = react_1.useRef();
    if (!ref.current) {
        ref.current = { v: fn() };
    }
    return ref.current.v;
}
exports["default"] = useConstant;
