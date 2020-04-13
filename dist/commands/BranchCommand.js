"use strict";
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
var Column_1 = __importDefault(require("../components/Column"));
var Exit_1 = __importDefault(require("../components/Exit"));
var Form_1 = __importDefault(require("../components/Form"));
var GitBoundary_1 = __importDefault(require("../components/GitBoundary"));
var LogText_1 = __importDefault(require("../components/LogText"));
var Title_1 = __importDefault(require("../components/Title"));
var useGit_1 = __importStar(require("../hooks/useGit"));
var branch_1 = require("../lib/branch");
var env_1 = __importDefault(require("../lib/env"));
function BranchCommand() {
    var _a = react_1.useState(), branch = _a[0], setBranch = _a[1];
    var gitCheckoutBranch = useGit_1["default"](function (git, _a) {
        var name = _a.name;
        return git.checkoutBranch(name, env_1["default"].masterBranch);
    });
    react_1.useEffect(function () {
        if (branch && gitCheckoutBranch.state.status === useGit_1.GitStatus.initial) {
            gitCheckoutBranch.run(branch);
        }
    }, [branch, gitCheckoutBranch]);
    var onSubmit = react_1.useCallback(function (newForm) {
        setBranch(branch_1.createFeatureBranch({
            issueId: newForm.issueId.value,
            description: newForm.description.value
        }));
    }, []);
    return (react_1["default"].createElement(Column_1["default"], null,
        react_1["default"].createElement(Title_1["default"], null, "Create a new feature branch"),
        branch ? (react_1["default"].createElement(GitBoundary_1["default"], { name: "Creating branch: " + branch.name, state: gitCheckoutBranch.state },
            react_1["default"].createElement(LogText_1["default"].Success, null, "Branch created:"),
            react_1["default"].createElement(LogText_1["default"].Default, null, branch.name),
            react_1["default"].createElement(Exit_1["default"], null))) : (react_1["default"].createElement(Form_1["default"], { initialData: {
                issueId: { label: 'Issue ID' },
                description: { label: 'Branch Description' }
            }, onSubmit: onSubmit }))));
}
exports["default"] = BranchCommand;
