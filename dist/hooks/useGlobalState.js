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
var Commands_1 = require("../Commands");
var Json_1 = __importDefault(require("../components/Json"));
var Table_1 = __importDefault(require("../components/Table"));
exports.GlobalContext = react_1.createContext({
    command: undefined,
    args: [],
    flags: {},
    showHelp: function () {
        throw new Error('InputContext has not been initialised');
    },
    showVersion: function () {
        throw new Error('InputContext has not been initialised');
    }
});
exports.GlobalDispatchContext = react_1.createContext(function () {
    throw new Error('GlobalDispatchContext has not been initialized');
});
function parseCommand(command) {
    if (command) {
        var c = Commands_1.commandInputMap[command];
        if (c) {
            return c;
        }
        else {
            throw new Error("Unknown command: " + command + " [" + Object.keys(Commands_1.commandInputMap).join(', ') + "]");
        }
    }
}
function parseGlobalInput(GlobalInput) {
    var _a = GlobalInput.input, command = _a[0], args = _a.slice(1);
    return {
        command: parseCommand(command),
        args: args,
        flags: GlobalInput.flags,
        showHelp: GlobalInput.showHelp,
        showVersion: GlobalInput.showVersion
    };
}
function GlobalProvider(_a) {
    var GlobalInput = _a.GlobalInput, children = _a.children;
    var _b;
    var _c = react_1.useState(parseGlobalInput(GlobalInput)), state = _c[0], setState = _c[1];
    var setGlobal = react_1.useCallback(function (_a) {
        var command = _a.command, flags = _a.flags, args = _a.args;
        setState(function (state) { return (__assign(__assign({}, state), { command: command !== null && command !== void 0 ? command : state.command, args: args !== null && args !== void 0 ? args : state.args, flags: flags !== null && flags !== void 0 ? flags : state.flags })); });
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(exports.GlobalContext.Provider, { value: state },
            react_1["default"].createElement(exports.GlobalDispatchContext.Provider, { value: setGlobal },
                react_1["default"].createElement(Table_1["default"].Debug, { name: "Global input", data: {
                        command: (_b = state.command) !== null && _b !== void 0 ? _b : 'index',
                        args: react_1["default"].createElement(Json_1["default"], null, state.args),
                        flags: react_1["default"].createElement(Json_1["default"], null, state.flags)
                    } }),
                children))));
}
exports.GlobalProvider = GlobalProvider;
function useGlobal() {
    return react_1.useContext(exports.GlobalContext);
}
exports["default"] = useGlobal;
function useSetGlobal() {
    return react_1.useContext(exports.GlobalDispatchContext);
}
exports.useSetGlobal = useSetGlobal;
