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
var ink_spinner_1 = __importDefault(require("ink-spinner"));
var react_1 = __importStar(require("react"));
var useGit_1 = require("../hooks/useGit");
var Column_1 = __importDefault(require("./Column"));
var Json_1 = __importDefault(require("./Json"));
var Log_1 = require("./Log");
var LogText_1 = __importDefault(require("./LogText"));
var Row_1 = __importDefault(require("./Row"));
var Table_1 = __importDefault(require("./Table"));
function GitBoundaryStatus(_a) {
    var children = _a.children, state = _a.state;
    switch (state.status) {
        case useGit_1.GitStatus.loading:
            return (react_1["default"].createElement(Row_1["default"], { gap: 1 },
                react_1["default"].createElement(ink_spinner_1["default"], null),
                react_1["default"].createElement(LogText_1["default"].Default, null, name)));
        case useGit_1.GitStatus.success:
            return react_1["default"].createElement(react_1["default"].Fragment, null, children);
        default:
            return react_1["default"].createElement(react_1.Fragment, null);
    }
}
exports.GitBoundaryStatus = GitBoundaryStatus;
function GitBoundary(_a) {
    var state = _a.state, name = _a.name, children = _a.children;
    return (react_1["default"].createElement(Column_1["default"], null,
        react_1["default"].createElement(Table_1["default"].Debug, { name: name, data: __assign(__assign({ status: state.status }, (state.result && {
                result: {
                    type: Log_1.LogType.success,
                    node: react_1["default"].createElement(Json_1["default"], null, state.result)
                }
            })), (state.error && {
                error: { type: Log_1.LogType.error, node: react_1["default"].createElement(Json_1["default"], null, state.error) }
            })) }),
        react_1["default"].createElement(GitBoundaryStatus, { state: state, name: name }, children)));
}
exports["default"] = GitBoundary;
