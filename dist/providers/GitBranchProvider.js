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
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var useGit_1 = __importStar(require("../hooks/useGit"));
var array_1 = require("../lib/array");
var branch_1 = require("../lib/branch");
exports.GitBranchContext = react_1.createContext({
    status: useGit_1.GitStatus.initial,
    branches: [],
    current: undefined,
    result: undefined,
    error: undefined,
    run: function () {
        throw new Error('GitBranchContext has not been initialised');
    }
});
function GitBranchProvider(_a) {
    var children = _a.children;
    var gitBranch = useGit_1["default"](function (git) { return git.branch(); });
    var _b = react_1.useState(__assign(__assign({}, gitBranch.state), { branches: [] })), state = _b[0], setState = _b[1];
    react_1.useEffect(function () {
        var _a, _b;
        var branches = array_1.filterArray(Object.values((_b = (_a = gitBranch.state.result) === null || _a === void 0 ? void 0 : _a.branches) !== null && _b !== void 0 ? _b : {}).map(branch_1.parseBranch));
        setState(__assign(__assign({}, gitBranch.state), { branches: branches, current: branches.find(function (x) { return x.current; }) }));
    }, [gitBranch.state]);
    return (react_1["default"].createElement(exports.GitBranchContext.Provider, { value: __assign(__assign({}, state), gitBranch) }, children));
}
exports["default"] = GitBranchProvider;
function useGitBranches() {
    var context = react_1.useContext(exports.GitBranchContext);
    react_1.useEffect(function () {
        if (context.status === useGit_1.GitStatus.initial) {
            context.run(undefined);
        }
    }, [context]);
    return context;
}
exports.useGitBranches = useGitBranches;
