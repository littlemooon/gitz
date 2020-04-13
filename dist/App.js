"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Commands_1 = __importDefault(require("./Commands"));
var ErrorBoundary_1 = __importDefault(require("./components/ErrorBoundary"));
var CliProvider_1 = __importDefault(require("./providers/CliProvider"));
var GitBranchProvider_1 = __importDefault(require("./providers/GitBranchProvider"));
function App() {
    return (react_1["default"].createElement(ErrorBoundary_1["default"], null,
        react_1["default"].createElement(CliProvider_1["default"], null,
            react_1["default"].createElement(GitBranchProvider_1["default"], null,
                react_1["default"].createElement(Commands_1["default"], null)))));
}
exports["default"] = App;
