"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ink_1 = require("ink");
var react_1 = require("react");
var git_1 = __importDefault(require("../lib/git"));
var useCli_1 = __importDefault(require("./useCli"));
var GitStatus;
(function (GitStatus) {
    GitStatus["initial"] = "initial";
    GitStatus["loading"] = "loading";
    GitStatus["success"] = "success";
    GitStatus["error"] = "error";
})(GitStatus = exports.GitStatus || (exports.GitStatus = {}));
var GitActionTypes;
(function (GitActionTypes) {
    GitActionTypes["loading"] = "loading";
    GitActionTypes["success"] = "success";
    GitActionTypes["error"] = "error";
})(GitActionTypes = exports.GitActionTypes || (exports.GitActionTypes = {}));
function reducer(state, action) {
    switch (action.type) {
        case GitActionTypes.loading:
            return { status: GitStatus.loading, result: undefined, error: undefined };
        case GitActionTypes.success:
            return {
                status: GitStatus.success,
                result: action.payload,
                error: undefined
            };
        case GitActionTypes.error:
            return {
                status: GitStatus.error,
                result: undefined,
                error: action.payload
            };
        default:
            return state;
    }
}
function useGit(runGit, opts) {
    var _a = opts !== null && opts !== void 0 ? opts : {}, runWith = _a.runWith, log = _a.log;
    var flags = useCli_1["default"]().flags;
    var stdoutStream = ink_1.useStdout();
    var _b = react_1.useReducer(reducer, {
        status: GitStatus.initial,
        result: undefined,
        error: undefined
    }), state = _b[0], dispatch = _b[1];
    var run = react_1.useCallback(function (args) {
        runGit(git_1["default"].outputHandler(function (_, stdout, stderr) {
            if (log || flags.debug) {
                stdout.pipe(stdoutStream.stdout);
                stderr.pipe(stdoutStream.stdout);
            }
        }), args)
            .then(function (result) {
            dispatch({ type: GitActionTypes.success, payload: result });
        })["catch"](function (error) {
            dispatch({ type: GitActionTypes.error, payload: error });
        });
    }, [flags.debug, log, runGit, stdoutStream.stdout]);
    react_1.useEffect(function () {
        if (runWith) {
            run(runWith);
        }
    }, [runWith, run]);
    return { state: state, run: run };
}
exports["default"] = useGit;
