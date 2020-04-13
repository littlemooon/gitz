"use strict";
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
var ink_1 = require("ink");
var react_1 = __importStar(require("react"));
var array_1 = require("../lib/array");
var Column_1 = __importDefault(require("./Column"));
var LogText_1 = __importDefault(require("./LogText"));
var SelectIndicator_1 = __importDefault(require("./SelectIndicator"));
var FocusProvider_1 = __importStar(require("../providers/FocusProvider"));
function Select(props) {
    var _a, _b;
    var focus = FocusProvider_1.useFocus();
    var _c = react_1.useState({
        rotateIndex: 0,
        selectedIndex: (_a = props.initialIndex) !== null && _a !== void 0 ? _a : 0
    }), state = _c[0], setState = _c[1];
    var hasLimit = typeof props.limit === 'number' && props.items.length > props.limit;
    var limit = hasLimit
        ? Math.min((_b = props.limit) !== null && _b !== void 0 ? _b : 0, props.items.length)
        : props.items.length;
    var items = react_1.useMemo(function () {
        var slicedItems = hasLimit
            ? array_1.arrayRotate(props.items, state.rotateIndex).slice(0, limit)
            : props.items;
        return slicedItems.sort(function (x) { return (x.current ? -1 : 1); });
    }, [props.items, state.rotateIndex, limit, hasLimit]);
    ink_1.useInput(function (input, key) {
        if (focus) {
            if (key.upArrow) {
                var lastIndex = (hasLimit ? limit : props.items.length) - 1;
                var atFirstIndex = state.selectedIndex === 0;
                var nextIndex = hasLimit ? state.selectedIndex : lastIndex;
                var nextRotateIndex = atFirstIndex
                    ? state.rotateIndex + 1
                    : state.rotateIndex;
                var nextSelectedIndex = atFirstIndex
                    ? nextIndex
                    : state.selectedIndex - 1;
                setState({
                    rotateIndex: nextRotateIndex,
                    selectedIndex: nextSelectedIndex
                });
                var slicedItems = hasLimit
                    ? array_1.arrayRotate(props.items, nextRotateIndex).slice(0, limit)
                    : props.items;
                if (props.onHighlight) {
                    props.onHighlight(slicedItems[nextSelectedIndex]);
                }
            }
            else if (key.downArrow) {
                var atLastIndex = state.selectedIndex === (hasLimit ? limit : props.items.length) - 1;
                var nextIndex = hasLimit ? state.selectedIndex : 0;
                var nextRotateIndex = atLastIndex
                    ? state.rotateIndex - 1
                    : state.rotateIndex;
                var nextSelectedIndex = atLastIndex
                    ? nextIndex
                    : state.selectedIndex + 1;
                setState({
                    rotateIndex: nextRotateIndex,
                    selectedIndex: nextSelectedIndex
                });
                var slicedItems = hasLimit
                    ? array_1.arrayRotate(props.items, nextRotateIndex).slice(0, limit)
                    : props.items;
                if (props.onHighlight) {
                    props.onHighlight(slicedItems[nextSelectedIndex]);
                }
            }
            else if (key["return"]) {
                var slicedItems = hasLimit
                    ? array_1.arrayRotate(props.items, state.rotateIndex).slice(0, limit)
                    : props.items;
                if (props.onSelect) {
                    props.onSelect(slicedItems[state.selectedIndex]);
                }
            }
        }
    });
    return (react_1["default"].createElement(Column_1["default"], null, items.map(function (item, index) {
        var selected = index === state.selectedIndex;
        return (react_1["default"].createElement(FocusProvider_1["default"], { key: item.id, focus: Boolean(focus && selected) },
            react_1["default"].createElement(ink_1.Box, null,
                react_1["default"].createElement(SelectIndicator_1["default"], { selected: selected }),
                react_1["default"].createElement(Column_1["default"], null,
                    item.label ? (react_1["default"].createElement(LogText_1["default"].Default, { bold: item.current, cyan: focus && selected }, item.label)) : null,
                    item.content))));
    })));
}
exports["default"] = Select;
