"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var usePrevious_1 = __importDefault(require("./usePrevious"));
function useDebug(name, obj) {
    var prev = usePrevious_1["default"](obj);
    react_1.useEffect(function () {
        console.group(name);
        Object.entries(obj).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (prev) {
                if (value !== prev[key]) {
                    console.log(key);
                    console.log('from:', prev[key]);
                    console.log('to:', value);
                }
            }
        });
        console.groupEnd();
    }, [name, obj, prev]);
}
exports["default"] = useDebug;
