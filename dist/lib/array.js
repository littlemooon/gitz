"use strict";
exports.__esModule = true;
function arrayRotate(arr, count) {
    var x = arr.slice();
    return x.splice(-count % x.length).concat(x);
}
exports.arrayRotate = arrayRotate;
function filterArray(arr) {
    return arr.filter(function (x) { return typeof x !== 'undefined' && x !== null; });
}
exports.filterArray = filterArray;
