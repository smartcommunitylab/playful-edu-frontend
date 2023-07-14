"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedDialogWrapper = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
function SharedDialogWrapper(props) {
    return (react_1.default.createElement(material_1.Dialog, { open: props.open, onClose: props.handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
        react_1.default.createElement(material_1.DialogTitle, { id: "alert-dialog-title" }, props.title),
        react_1.default.createElement(material_1.DialogContent, null,
            react_1.default.createElement("div", { style: { width: "400px", maxWidth: "100%" } },
                react_1.default.createElement("p", { style: {
                        fontFamily: "sans-serif",
                        margin: "0",
                        fontSize: "0.9em",
                        marginBottom: "10px",
                        marginTop: "-7px",
                        color: "#555",
                    } }, props.subTitle),
                props.children))));
}
exports.SharedDialogWrapper = SharedDialogWrapper;
//# sourceMappingURL=SharedDialogWrapper.js.map