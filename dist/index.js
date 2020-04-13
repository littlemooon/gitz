"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ink_1 = require("ink");
var chalk_1 = __importDefault(require("chalk"));
var react_1 = require("react");
var App_1 = __importDefault(require("./App"));
var update_notifier_1 = __importDefault(require("update-notifier"));
var pkg = require(process.cwd() + "/package.json");
update_notifier_1["default"]({ pkg: pkg }).notify();
ink_1.render(react_1.createElement(App_1["default"]));
process.on('uncaughtException', function (err) {
    console.error(chalk_1["default"](chalk_1["default"].red('Uncaught Exception') + ": " + chalk_1["default"].red(err.name) + " " + err.message));
});
