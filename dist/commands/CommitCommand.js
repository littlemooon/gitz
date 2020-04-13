"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Column_1 = __importDefault(require("../components/Column"));
var GitBoundary_1 = __importDefault(require("../components/GitBoundary"));
var Log_1 = __importDefault(require("../components/Log"));
var LogText_1 = __importDefault(require("../components/LogText"));
var branch_1 = require("../lib/branch");
var env_1 = __importDefault(require("../lib/env"));
var GitBranchProvider_1 = require("../providers/GitBranchProvider");
function CommitCommand() {
    var _a, _b;
    var gitBranches = GitBranchProvider_1.useGitBranches();
    var isFeature = branch_1.isFeatureBranch(gitBranches.current);
    return (react_1["default"].createElement(GitBoundary_1["default"], { name: "git branch", state: gitBranches }, isFeature ? (react_1["default"].createElement(Log_1["default"].Success, { exit: true },
        react_1["default"].createElement(LogText_1["default"].Success, null, "Current branch:"),
        react_1["default"].createElement(LogText_1["default"].Default, null, (_a = gitBranches.current) === null || _a === void 0 ? void 0 : _a.name))) : (react_1["default"].createElement(Log_1["default"].Error, null,
        react_1["default"].createElement(Column_1["default"], null,
            react_1["default"].createElement(LogText_1["default"].Error, null, "Must be on a feature branch to commit"),
            react_1["default"].createElement(LogText_1["default"].Default, null, (_b = gitBranches.current) === null || _b === void 0 ? void 0 :
                _b.name,
                " is not of form",
                ' ',
                env_1["default"].featureBranchRegex.toString()))))));
}
exports["default"] = CommitCommand;
