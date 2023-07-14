"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedDialogButton = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
function SharedDialogButton(props) {
    return (react_1.default.createElement(material_1.ListItem, { disableGutters: true },
        react_1.default.createElement(material_1.Button, { disabled: props.disabled, style: { width: "100%", backgroundColor: "#efefef", padding: "13px" }, onClick: props.onClick },
            props.icon,
            react_1.default.createElement("span", { style: { width: "100%", textAlign: "left", marginLeft: "8px" } }, props.label))));
}
exports.SharedDialogButton = SharedDialogButton;
//# sourceMappingURL=SharedDialogButton.js.map