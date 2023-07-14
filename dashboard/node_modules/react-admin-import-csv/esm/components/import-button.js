import React from "react";
import { Button as RAButton } from "react-admin";
import { Tooltip } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { translateWrapper } from "../translateWrapper";
export function ImportButton(props) {
    var variant = props.variant, label = props.label, clickImportButton = props.clickImportButton, onFileAdded = props.onFileAdded, onRef = props.onRef;
    var translate = translateWrapper();
    return (React.createElement(Tooltip, { title: translate("csv.buttonMain.tooltip") },
        React.createElement("div", null,
            React.createElement(RAButton, { color: "primary", component: "span", variant: variant, label: label, onClick: clickImportButton },
                React.createElement(GetAppIcon, { style: { transform: "rotate(180deg)", fontSize: "20" } })),
            React.createElement("input", { ref: onRef, type: "file", style: { display: "none" }, onChange: onFileAdded, accept: ".csv,.tsv" }))));
}
//# sourceMappingURL=import-button.js.map