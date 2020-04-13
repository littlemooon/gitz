"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_1 = __importStar(require("react"));
var Column_1 = __importDefault(require("./Column"));
var Exit_1 = __importDefault(require("./Exit"));
var LogText_1 = __importDefault(require("./LogText"));
var Row_1 = __importDefault(require("./Row"));
var Table_1 = __importDefault(require("./Table"));
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            error: undefined,
            errorInfo: undefined
        };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        this.setState({ error: error, errorInfo: errorInfo });
    };
    ErrorBoundary.prototype.render = function () {
        var _a, _b;
        var _c = this.state, error = _c.error, errorInfo = _c.errorInfo;
        return error ? (react_1["default"].createElement(Column_1["default"], null,
            react_1["default"].createElement(Row_1["default"], null,
                react_1["default"].createElement(LogText_1["default"].Error, null, error.name),
                react_1["default"].createElement(LogText_1["default"].Default, null, (_a = error.message) === null || _a === void 0 ? void 0 : _a.replace('error: ', '')),
                react_1["default"].createElement(Exit_1["default"], null)),
            react_1["default"].createElement(Table_1["default"].Debug, { name: "error boundary", data: { componentStack: (_b = errorInfo.componentStack) === null || _b === void 0 ? void 0 : _b.trim() } }))) : (react_1["default"].createElement(react_1["default"].Fragment, null, this.props.children));
    };
    return ErrorBoundary;
}(react_1.Component));
exports["default"] = ErrorBoundary;
