import React, { useEffect } from "react";
import { SharedDialogWrapper } from "./SharedDialogWrapper";
import { SharedLoader } from "./SharedLoader";
import { translateWrapper } from "../translateWrapper";
import { List } from "@mui/material";
import { Done, Undo, FileCopy } from "@mui/icons-material";
import { SharedDialogButton } from "./SharedDialogButton";
export var ImportCsvDialogStrategy = function (props) {
    var count = props.count, disableImportOverwrite = props.disableImportOverwrite, resourceName = props.resourceName, fileName = props.fileName, handleClose = props.handleClose, handleReplace = props.handleReplace, handleSkip = props.handleSkip, handleAskDecide = props.handleAskDecide, open = props.open, isLoading = props.isLoading, idsConflicting = props.idsConflicting;
    var _a = React.useState({}), messages = _a[0], setMessages = _a[1];
    var translate = translateWrapper();
    useEffect(function () {
        setMessages({
            title: translate("csv.dialogImport.title", {
                resource: resourceName,
            }),
            subTitle: translate("csv.dialogCommon.subtitle", {
                count: count,
                fileName: fileName,
                resource: resourceName,
            }),
            loadingTxt: translate("csv.loading"),
            labelSkip: translate("csv.dialogImport.buttons.skipAllConflicts"),
            labelReplace: translate("csv.dialogImport.buttons.replaceAllConflicts"),
            labelDecide: translate("csv.dialogImport.buttons.letmeDecide"),
            messageHtml: translate("csv.dialogCommon.conflictCount", {
                resource: resourceName,
                conflictingCount: idsConflicting && idsConflicting.length,
            }),
        });
    }, [count, resourceName, fileName, idsConflicting]);
    return (React.createElement(SharedDialogWrapper, { title: messages.title, subTitle: messages.subTitle, open: open, handleClose: handleClose },
        isLoading && React.createElement(SharedLoader, { loadingTxt: messages.loadingTxt }),
        idsConflicting && idsConflicting.length > 0 && !isLoading && (React.createElement("div", null,
            React.createElement("p", { style: { fontFamily: "sans-serif", margin: "0" }, dangerouslySetInnerHTML: {
                    __html: messages.messageHtml,
                } }),
            React.createElement(List, null,
                React.createElement(SharedDialogButton, { disabled: disableImportOverwrite, onClick: handleReplace, icon: React.createElement(Done, { htmlColor: "#29c130" }), label: messages.labelReplace }),
                React.createElement(SharedDialogButton, { onClick: handleSkip, icon: React.createElement(FileCopy, { htmlColor: "#3a88ca" }), label: messages.labelSkip }),
                React.createElement(SharedDialogButton, { onClick: handleAskDecide, icon: React.createElement(Undo, { htmlColor: "black" }), label: messages.labelDecide }))))));
};
//# sourceMappingURL=import-csv-dialog-strategy.js.map