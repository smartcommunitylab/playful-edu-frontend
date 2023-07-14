import React from "react";
import { SharedDialogButton } from "./SharedDialogButton";
import { SharedDialogWrapper } from "./SharedDialogWrapper";
import { SharedLoader } from "./SharedLoader";
import { translateWrapper } from "../translateWrapper";
import { List } from "@mui/material";
import { Done, Undo, Clear, Add } from "@mui/icons-material";
export var ImportCsvDialogEachItem = function (props) {
    var disableImportNew = props.disableImportNew, disableImportOverwrite = props.disableImportOverwrite, currentValue = props.currentValue, resourceName = props.resourceName, values = props.values, fileName = props.fileName, openAskDecide = props.openAskDecide, handleClose = props.handleClose, handleAskDecideReplace = props.handleAskDecideReplace, handleAskDecideAddAsNew = props.handleAskDecideAddAsNew, handleAskDecideSkip = props.handleAskDecideSkip, handleAskDecideSkipAll = props.handleAskDecideSkipAll, isLoading = props.isLoading, idsConflicting = props.idsConflicting;
    var translate = translateWrapper();
    return (React.createElement(SharedDialogWrapper, { title: translate("csv.dialogDecide.title", {
            id: currentValue && currentValue.id,
            resource: resourceName,
        }), subTitle: translate("csv.dialogCommon.subtitle", {
            count: values && values.length,
            fileName: fileName,
            resource: resourceName,
        }), open: openAskDecide, handleClose: handleClose },
        isLoading && React.createElement(SharedLoader, { loadingTxt: translate("csv.loading") }),
        !isLoading && (React.createElement("div", null,
            React.createElement("p", { style: { fontFamily: "sans-serif", margin: "0" }, dangerouslySetInnerHTML: {
                    __html: translate("csv.dialogCommon.conflictCount", {
                        resource: resourceName,
                        conflictingCount: idsConflicting && idsConflicting.length,
                    }),
                } }),
            React.createElement(List, null,
                React.createElement(SharedDialogButton, { disabled: disableImportOverwrite, onClick: handleAskDecideReplace, icon: React.createElement(Done, { htmlColor: "#29c130" }), label: translate("csv.dialogDecide.buttons.replaceRow", {
                        id: currentValue && currentValue.id,
                    }) }),
                React.createElement(SharedDialogButton, { disabled: disableImportNew, onClick: handleAskDecideAddAsNew, icon: React.createElement(Add, { htmlColor: "#3a88ca" }), label: translate("csv.dialogDecide.buttons.addAsNewRow") }),
                React.createElement(SharedDialogButton, { onClick: handleAskDecideSkip, icon: React.createElement(Undo, { htmlColor: "black" }), label: translate("csv.dialogDecide.buttons.skipDontReplace") }),
                React.createElement(SharedDialogButton, { onClick: handleAskDecideSkipAll, icon: React.createElement(Clear, { htmlColor: "#3a88ca" }), label: translate("csv.dialogCommon.buttons.cancel") }))))));
};
//# sourceMappingURL=import-csv-dialog-each-item.js.map