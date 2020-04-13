"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var promise_1 = __importDefault(require("simple-git/promise"));
var env_1 = __importDefault(require("./env"));
var git = promise_1["default"](env_1["default"].rootDir);
exports["default"] = git;
