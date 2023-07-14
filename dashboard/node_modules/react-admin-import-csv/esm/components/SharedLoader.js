import React from "react";
import { CircularProgress } from "@mui/material";
export function SharedLoader(props) {
    return (React.createElement("div", { style: {
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
        } },
        React.createElement(CircularProgress, { variant: "indeterminate" }),
        React.createElement("p", { style: {
                fontFamily: "sans-serif",
            } }, props.loadingTxt)));
}
//# sourceMappingURL=SharedLoader.js.map