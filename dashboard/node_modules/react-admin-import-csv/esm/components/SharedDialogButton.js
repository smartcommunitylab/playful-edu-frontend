import React from "react";
import { Button, ListItem } from "@mui/material";
export function SharedDialogButton(props) {
    return (React.createElement(ListItem, { disableGutters: true },
        React.createElement(Button, { disabled: props.disabled, style: { width: "100%", backgroundColor: "#efefef", padding: "13px" }, onClick: props.onClick },
            props.icon,
            React.createElement("span", { style: { width: "100%", textAlign: "left", marginLeft: "8px" } }, props.label))));
}
//# sourceMappingURL=SharedDialogButton.js.map