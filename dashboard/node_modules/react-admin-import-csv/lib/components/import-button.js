"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportButton = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var material_1 = require("@mui/material");
var GetApp_1 = __importDefault(require("@mui/icons-material/GetApp"));
var translateWrapper_1 = require("../translateWrapper");
function ImportButton(props) {
    var variant = props.variant, label = props.label, clickImportButton = props.clickImportButton, onFileAdded = props.onFileAdded, onRef = props.onRef;
    var translate = (0, translateWrapper_1.translateWrapper)();
    return (react_1.default.createElement(material_1.Tooltip, { title: translate("csv.buttonMain.tooltip") },
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_admin_1.Button, { color: "primary", component: "span", variant: variant, label: label, onClick: clickImportButton },
                react_1.default.createElement(GetApp_1.default, { style: { transform: "rotate(180deg)", fontSize: "20" } })),
            react_1.default.createElement("input", { ref: onRef, type: "file", style: { display: "none" }, onChange: onFileAdded, accept: ".csv,.tsv" }))));
}
exports.ImportButton = ImportButton;
//# sourceMappingURL=import-button.js.map