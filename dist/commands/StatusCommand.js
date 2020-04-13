"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var GitBoundary_1 = __importDefault(require("../components/GitBoundary"));
var Table_1 = __importDefault(require("../components/Table"));
var Title_1 = __importDefault(require("../components/Title"));
var useGit_1 = __importDefault(require("../hooks/useGit"));
function StatusCommand() {
    var _a;
    var state = useGit_1["default"](function (git) { return git.status(); }, { runWith: true }).state;
    return (react_1["default"].createElement(GitBoundary_1["default"], { name: "git status", state: state },
        react_1["default"].createElement(Title_1["default"], null, "Status"),
        react_1["default"].createElement(Table_1["default"].Success, { data: { tracking: (_a = state.result) === null || _a === void 0 ? void 0 : _a.tracking } })));
}
exports["default"] = StatusCommand;
