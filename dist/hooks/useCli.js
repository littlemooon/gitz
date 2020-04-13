"use strict";
exports.__esModule = true;
var react_1 = require("react");
exports.CliContext = react_1.createContext({
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
exports.CliDispatchContext = react_1.createContext(function () {
    throw new Error('CliDispatchContext has not been initialized');
});
function useCli() {
    return react_1.useContext(exports.CliContext);
}
exports["default"] = useCli;
function useSetCli() {
    return react_1.useContext(exports.CliDispatchContext);
}
exports.useSetCli = useSetCli;
