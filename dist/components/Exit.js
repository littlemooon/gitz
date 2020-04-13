"use strict";
exports.__esModule = true;
var ink_1 = require("ink");
var react_1 = require("react");
function Exit() {
    var exit = ink_1.useApp().exit;
    react_1.useEffect(function () {
        exit();
    }, [exit]);
    return null;
}
exports["default"] = Exit;
