"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var BranchSelect_1 = __importDefault(require("../components/BranchSelect"));
var Column_1 = __importDefault(require("../components/Column"));
var GitBoundary_1 = __importDefault(require("../components/GitBoundary"));
var Log_1 = __importDefault(require("../components/Log"));
var LogText_1 = __importDefault(require("../components/LogText"));
var Title_1 = __importDefault(require("../components/Title"));
var branch_1 = require("../lib/branch");
var GitBranchProvider_1 = require("../providers/GitBranchProvider");
function CheckoutCommand() {
    var gitBranches = GitBranchProvider_1.useGitBranches();
    var featureBranches = gitBranches.branches.filter(branch_1.isFeatureBranch);
    return (react_1["default"].createElement(GitBoundary_1["default"], { name: "git branch", state: gitBranches },
        react_1["default"].createElement(Column_1["default"], null,
            react_1["default"].createElement(Log_1["default"].Info, null,
                react_1["default"].createElement(Title_1["default"], null, "Switch to feature branch")),
            (featureBranches === null || featureBranches === void 0 ? void 0 : featureBranches.length) ? (react_1["default"].createElement(BranchSelect_1["default"], { branches: featureBranches, formatLabel: function (x) { return x.issueId + ": " + x.description + " (" + x.label + ")"; } })) : (react_1["default"].createElement(Log_1["default"].Warn, null,
                react_1["default"].createElement(LogText_1["default"].Warn, null, "No feature branches found"))))));
}
exports["default"] = CheckoutCommand;
