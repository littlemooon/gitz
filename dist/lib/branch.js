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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var env_1 = __importDefault(require("./env"));
var string_1 = require("./string");
function isFeatureBranch(branch) {
    return branch ? 'issueId' in branch : false;
}
exports.isFeatureBranch = isFeatureBranch;
function createFeatureBranch(input) {
    if (!input.issueId) {
        throw new Error('Issue ID required');
    }
    if (!env_1["default"].issueRegex.exec(input.issueId)) {
        throw new Error("Issue ID must be of form: " + env_1["default"].issueRegex);
    }
    if (!input.description) {
        throw new Error('Description required');
    }
    var issueId = input.issueId.replace(/\s+/g, '-').toUpperCase();
    var description = string_1.capitalize(input.description.replace(/\s+/g, '_'));
    return {
        issueId: issueId,
        description: description,
        name: ['feature', issueId, description].join('-').toLowerCase()
    };
}
exports.createFeatureBranch = createFeatureBranch;
function parseBranch(branch) {
    var _a;
    if (branch) {
        var featureBranch = env_1["default"].featureBranchRegex.exec((_a = branch.name) !== null && _a !== void 0 ? _a : '');
        if (featureBranch) {
            return __assign(__assign({}, branch), { issueId: featureBranch[1].toUpperCase(), description: string_1.capitalize(featureBranch[2].replace(/_/g, ' ')), name: featureBranch[0] });
        }
        return branch;
    }
}
exports.parseBranch = parseBranch;
