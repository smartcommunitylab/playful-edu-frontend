"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedLoader = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
function SharedLoader(props) {
    return (react_1.default.createElement("div", { style: {
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
        } },
        react_1.default.createElement(material_1.CircularProgress, { variant: "indeterminate" }),
        react_1.default.createElement("p", { style: {
                fontFamily: "sans-serif",
            } }, props.loadingTxt)));
}
exports.SharedLoader = SharedLoader;
//# sourceMappingURL=SharedLoader.js.map