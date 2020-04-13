"use strict";
exports.__esModule = true;
var react_1 = require("react");
function usePrevious(value) {
    var ref = react_1.useRef();
    react_1.useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
}
exports["default"] = usePrevious;
