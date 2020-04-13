"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var useCli_1 = __importDefault(require("../hooks/useCli"));
function HelpCommand() {
    var showHelp = useCli_1["default"]().showHelp;
    react_1.useEffect(function () {
        showHelp(0);
    }, [showHelp]);
    return null;
}
exports["default"] = HelpCommand;
