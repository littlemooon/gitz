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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var FocusProvider_1 = __importStar(require("../providers/FocusProvider"));
var Column_1 = __importDefault(require("./Column"));
var Input_1 = __importDefault(require("./Input"));
var SelectIndicator_1 = __importDefault(require("./SelectIndicator"));
function Form(_a) {
    var initialData = _a.initialData, onSubmit = _a.onSubmit;
    var focus = FocusProvider_1.useFocus();
    var _b = react_1.useState(initialData), data = _b[0], setData = _b[1];
    var nextId = react_1.useMemo(function () {
        var nextItem = Object.entries(data).find(function (_a) {
            var item = _a[1];
            return typeof item.value !== 'string';
        });
        return nextItem ? nextItem[0] : undefined;
    }, [data]);
    var readonlyForm = react_1.useMemo(function () {
        if (nextId) {
            var ids_1 = Object.keys(data);
            var nextIndex_1 = ids_1.indexOf(nextId);
            return Object.entries(data).reduce(function (acc, _a) {
                var _b;
                var id = _a[0], value = _a[1];
                return ids_1.indexOf(id) < nextIndex_1 ? __assign(__assign({}, acc), (_b = {}, _b[id] = value, _b)) : acc;
            }, {});
        }
        else {
            return data;
        }
    }, [nextId, data]);
    react_1.useEffect(function () {
        if (!nextId && onSubmit) {
            onSubmit(data);
        }
    }, [data, nextId, onSubmit]);
    var onSubmitNext = react_1.useCallback(function (value) {
        if (nextId) {
            setData(function (form) {
                var _a;
                return (__assign(__assign({}, form), (_a = {}, _a[nextId] = __assign(__assign({}, form[nextId]), { value: value }), _a)));
            });
        }
    }, [nextId]);
    return (react_1["default"].createElement(Column_1["default"], null,
        Object.entries(readonlyForm).map(function (_a) {
            var id = _a[0], item = _a[1];
            return (react_1["default"].createElement(FocusProvider_1["default"], { key: id, focus: false },
                react_1["default"].createElement(SelectIndicator_1["default"], { selected: false }),
                react_1["default"].createElement(Input_1["default"], { label: item.label, initialValue: item.value })));
        }),
        nextId ? (react_1["default"].createElement(FocusProvider_1["default"], { focus: Boolean(focus) },
            react_1["default"].createElement(SelectIndicator_1["default"], { selected: true }),
            react_1["default"].createElement(Input_1["default"], { label: data[nextId].label, initialValue: data[nextId].initialValue, onSubmit: onSubmitNext }))) : null));
}
exports["default"] = Form;
