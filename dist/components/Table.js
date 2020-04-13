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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var useCli_1 = __importDefault(require("../hooks/useCli"));
var Column_1 = __importDefault(require("./Column"));
var Log_1 = require("./Log");
var LogText_1 = __importDefault(require("./LogText"));
var Row_1 = __importDefault(require("./Row"));
function parseRow(tableData) {
    if (tableData && typeof tableData === 'object' && 'node' in tableData) {
        return tableData;
    }
    else {
        return { node: tableData };
    }
}
function TableBase(_a) {
    var data = _a.data, type = _a.type;
    var keys = Object.keys(data);
    var maxKey = react_1.useMemo(function () { return Math.max.apply(Math, keys.map(function (x) { return x.length; })); }, [keys]);
    return (react_1["default"].createElement(Column_1["default"], null, Object.entries(data).map(function (_a) {
        var key = _a[0], value = _a[1];
        var _b;
        var row = parseRow(value);
        return (react_1["default"].createElement(Row_1["default"], { key: key },
            react_1["default"].createElement(LogText_1["default"].Default, { type: (_b = row.type) !== null && _b !== void 0 ? _b : type, bold: true }, key.padEnd(maxKey)),
            row.node));
    })));
}
var Table = {
    Base: TableBase,
    Debug: function (_a) {
        var name = _a.name, props = __rest(_a, ["name"]);
        var flags = useCli_1["default"]().flags;
        return flags.debug ? (react_1["default"].createElement(Column_1["default"], null,
            react_1["default"].createElement(LogText_1["default"].Default, { yellow: true }, name),
            react_1["default"].createElement(TableBase, __assign({ type: Log_1.LogType.debug }, props)))) : null;
    },
    Info: function (props) {
        return react_1["default"].createElement(TableBase, __assign({ type: Log_1.LogType.info }, props));
    },
    Success: function (props) {
        return react_1["default"].createElement(TableBase, __assign({ type: Log_1.LogType.success }, props));
    },
    Warn: function (props) {
        return react_1["default"].createElement(TableBase, __assign({ type: Log_1.LogType.warn }, props));
    },
    Error: function (props) {
        return react_1["default"].createElement(TableBase, __assign({ type: Log_1.LogType.error }, props));
    }
};
exports["default"] = Table;
