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
var _a;
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var BranchCommand_1 = __importDefault(require("./commands/BranchCommand"));
var CheckoutCommand_1 = __importDefault(require("./commands/CheckoutCommand"));
var CommitCommand_1 = __importDefault(require("./commands/CommitCommand"));
var IndexCommand_1 = __importDefault(require("./commands/IndexCommand"));
var StatusCommand_1 = __importDefault(require("./commands/StatusCommand"));
var useCli_1 = __importDefault(require("./hooks/useCli"));
var HelpCommand_1 = __importDefault(require("./commands/HelpCommand"));
var Command;
(function (Command) {
    Command["STATUS"] = "status";
    Command["BRANCH"] = "branch";
    Command["CHECKOUT"] = "checkout";
    Command["COMMIT"] = "commit";
    Command["HELP"] = "help";
})(Command = exports.Command || (exports.Command = {}));
var commandMap = (_a = {},
    _a[Command.STATUS] = StatusCommand_1["default"],
    _a[Command.BRANCH] = BranchCommand_1["default"],
    _a[Command.CHECKOUT] = CheckoutCommand_1["default"],
    _a[Command.COMMIT] = CommitCommand_1["default"],
    _a[Command.HELP] = HelpCommand_1["default"],
    _a);
exports.commandInputMap = {
    status: Command.STATUS,
    s: Command.STATUS,
    branch: Command.BRANCH,
    b: Command.BRANCH,
    checkout: Command.CHECKOUT,
    c: Command.CHECKOUT,
    commit: Command.COMMIT,
    m: Command.COMMIT
};
function Commands() {
    var _a;
    var cli = useCli_1["default"]();
    var Command = cli.command
        ? (_a = commandMap[cli.command]) !== null && _a !== void 0 ? _a : HelpCommand_1["default"] : IndexCommand_1["default"];
    return react_1["default"].createElement(Command, __assign({}, cli));
}
exports["default"] = Commands;
