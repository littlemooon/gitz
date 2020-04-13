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
var Form_1 = __importDefault(require("../components/Form"));
var GitBoundary_1 = __importDefault(require("../components/GitBoundary"));
var Log_1 = __importDefault(require("../components/Log"));
var LogText_1 = __importDefault(require("../components/LogText"));
var useGit_1 = __importDefault(require("../hooks/useGit"));
var branch_1 = require("../lib/branch");
var env_1 = __importDefault(require("../lib/env"));
function BranchCommand() {
    var _a = react_1.useState(), branch = _a[0], setBranch = _a[1];
    var _b = useGit_1["default"](function (git, _a) {
        var name = _a.name;
        return git.checkoutBranch(name, env_1["default"].masterBranch);
    }), state = _b.state, run = _b.run;
    react_1.useEffect(function () {
        if (branch)
            run(branch);
    }, [branch, run]);
    var onSubmit = react_1.useCallback(function (newForm) {
        setBranch(branch_1.createFeatureBranch({
            issueId: newForm.issueId.value,
            description: newForm.description.value
        }));
    }, []);
    return branch ? (react_1["default"].createElement(GitBoundary_1["default"], { name: "Creating branch: " + branch.name, state: state },
        react_1["default"].createElement(Log_1["default"].Success, { exit: true },
            react_1["default"].createElement(LogText_1["default"].Success, null, "Branch created:"),
            react_1["default"].createElement(LogText_1["default"].Default, null, branch.name)))) : (react_1["default"].createElement(Log_1["default"].Info, null,
        react_1["default"].createElement(Form_1["default"], { title: "Create a new feature branch", initialData: {
                issueId: { label: 'Issue ID' },
                description: { label: 'Branch Description' }
            }, onSubmit: onSubmit })));
}
exports["default"] = BranchCommand;
