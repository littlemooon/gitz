"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var CheckoutCommand_1 = __importDefault(require("./CheckoutCommand"));
var Panels_1 = __importDefault(require("../components/Panels"));
var Column_1 = __importDefault(require("../components/Column"));
var BranchCommand_1 = __importDefault(require("./BranchCommand"));
function IndexCommand() {
    return (react_1["default"].createElement(Column_1["default"], { gap: 2 },
        react_1["default"].createElement(Panels_1["default"], { items: [
                { id: 'branch', content: react_1["default"].createElement(BranchCommand_1["default"], null) },
                {
                    id: 'checkout',
                    content: react_1["default"].createElement(CheckoutCommand_1["default"], null)
                },
            ] })));
}
exports["default"] = IndexCommand;
