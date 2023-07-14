import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
export function SharedDialogWrapper(props) {
    return (React.createElement(Dialog, { open: props.open, onClose: props.handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
        React.createElement(DialogTitle, { id: "alert-dialog-title" }, props.title),
        React.createElement(DialogContent, null,
            React.createElement("div", { style: { width: "400px", maxWidth: "100%" } },
                React.createElement("p", { style: {
                        fontFamily: "sans-serif",
                        margin: "0",
                        fontSize: "0.9em",
                        marginBottom: "10px",
                        marginTop: "-7px",
                        color: "#555",
                    } }, props.subTitle),
                props.children))));
}
//# sourceMappingURL=SharedDialogWrapper.js.map