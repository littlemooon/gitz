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
var useGit_1 = __importDefault(require("../hooks/useGit"));
var GitBoundary_1 = __importDefault(require("./GitBoundary"));
var Log_1 = __importDefault(require("./Log"));
var LogText_1 = __importDefault(require("./LogText"));
var Select_1 = __importDefault(require("./Select"));
function BranchSelect(_a) {
    var branches = _a.branches, formatLabel = _a.formatLabel;
    var _b = react_1.useState(), branch = _b[0], setBranch = _b[1];
    var gitCheckout = useGit_1["default"](function (git, branch) { return git.checkout(branch.name); });
    react_1.useEffect(function () {
        if (branch) {
            gitCheckout.run(branch);
        }
    }, [branch, gitCheckout]);
    var handleSelect = react_1.useCallback(function (item) {
        var branch = branches.find(function (x) { return x.name === item.id; });
        if (branch) {
            setBranch(branch);
        }
    }, [branches, setBranch]);
    var items = react_1.useMemo(function () {
        var _a;
        return ((_a = branches.map(function (branch) { return ({
            label: formatLabel
                ? formatLabel(branch)
                : branch.name + ": " + branch.label,
            id: branch.name,
            current: branch.current
        }); })) !== null && _a !== void 0 ? _a : []);
    }, [branches, formatLabel]);
    return branch ? (react_1["default"].createElement(GitBoundary_1["default"], { name: "git checkout", state: gitCheckout.state },
        react_1["default"].createElement(Log_1["default"].Success, { exit: true },
            react_1["default"].createElement(LogText_1["default"].Success, null, "Switched to"),
            react_1["default"].createElement(LogText_1["default"].Default, null, branch.name)))) : (react_1["default"].createElement(Select_1["default"], { onSelect: handleSelect, items: items }));
}
exports["default"] = BranchSelect;
