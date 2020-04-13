"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var meow_1 = __importDefault(require("meow"));
var Commands_1 = require("../Commands");
exports.cliHelpText = "\nUsage\n  $ gitet\n\nOptions\n  --name Your name\n\nExamples\n  $ gitet --name=Jane\n  Hello, Jane\n";
function parseCommand(command) {
    if (command) {
        var c = Commands_1.commandInputMap[command];
        if (c) {
            return c;
        }
        else {
            throw new Error("Unknown command: " + command + " [" + Object.keys(Commands_1.commandInputMap).join(', ') + "]");
        }
    }
}
function parseCliInput(cliInput) {
    var _a = cliInput.input, command = _a[0], args = _a.slice(1);
    return {
        command: parseCommand(command),
        args: args,
        flags: cliInput.flags,
        showHelp: cliInput.showHelp,
        showVersion: cliInput.showVersion
    };
}
var cliInput = meow_1["default"](exports.cliHelpText, {
    flags: { debug: { type: 'boolean', "default": false, alias: 'd' } }
});
var cli = parseCliInput(cliInput);
exports["default"] = cli;
