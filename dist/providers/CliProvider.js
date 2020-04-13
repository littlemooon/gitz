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
var ErrorBoundary_1 = __importDefault(require("../components/ErrorBoundary"));
var Json_1 = __importDefault(require("../components/Json"));
var Table_1 = __importDefault(require("../components/Table"));
var useCli_1 = require("../hooks/useCli");
var env_1 = __importDefault(require("../lib/env"));
var cli_1 = __importDefault(require("../lib/cli"));
function CliProvider(_a) {
    var children = _a.children;
    var _b;
    var _c = react_1.useState(cli_1["default"]), state = _c[0], setState = _c[1];
    var setCli = react_1.useCallback(function (_a) {
        var command = _a.command, flags = _a.flags, args = _a.args;
        setState(function (state) { return (__assign(__assign({}, state), { command: command !== null && command !== void 0 ? command : state.command, args: args !== null && args !== void 0 ? args : state.args, flags: flags !== null && flags !== void 0 ? flags : state.flags })); });
    }, []);
    return (react_1["default"].createElement(useCli_1.CliContext.Provider, { value: state },
        react_1["default"].createElement(ErrorBoundary_1["default"], null,
            react_1["default"].createElement(useCli_1.CliDispatchContext.Provider, { value: setCli },
                react_1["default"].createElement(Table_1["default"].Debug, { name: "env", data: Object.entries(env_1["default"]).reduce(function (acc, _a) {
                        var _b;
                        var key = _a[0], value = _a[1];
                        return (__assign(__assign({}, acc), (_b = {}, _b[key] = value.toString(), _b)));
                    }, {}) }),
                react_1["default"].createElement(Table_1["default"].Debug, { name: "cli input", data: {
                        command: (_b = state.command) !== null && _b !== void 0 ? _b : 'index',
                        args: react_1["default"].createElement(Json_1["default"], null, state.args),
                        flags: react_1["default"].createElement(Json_1["default"], null, state.flags)
                    } }),
                children))));
}
exports["default"] = CliProvider;
