"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportCsvDialogStrategy = void 0;
var react_1 = __importStar(require("react"));
var SharedDialogWrapper_1 = require("./SharedDialogWrapper");
var SharedLoader_1 = require("./SharedLoader");
var translateWrapper_1 = require("../translateWrapper");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var SharedDialogButton_1 = require("./SharedDialogButton");
var ImportCsvDialogStrategy = function (props) {
    var count = props.count, disableImportOverwrite = props.disableImportOverwrite, resourceName = props.resourceName, fileName = props.fileName, handleClose = props.handleClose, handleReplace = props.handleReplace, handleSkip = props.handleSkip, handleAskDecide = props.handleAskDecide, open = props.open, isLoading = props.isLoading, idsConflicting = props.idsConflicting;
    var _a = react_1.default.useState({}), messages = _a[0], setMessages = _a[1];
    var translate = (0, translateWrapper_1.translateWrapper)();
    (0, react_1.useEffect)(function () {
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
    return (react_1.default.createElement(SharedDialogWrapper_1.SharedDialogWrapper, { title: messages.title, subTitle: messages.subTitle, open: open, handleClose: handleClose },
        isLoading && react_1.default.createElement(SharedLoader_1.SharedLoader, { loadingTxt: messages.loadingTxt }),
        idsConflicting && idsConflicting.length > 0 && !isLoading && (react_1.default.createElement("div", null,
            react_1.default.createElement("p", { style: { fontFamily: "sans-serif", margin: "0" }, dangerouslySetInnerHTML: {
                    __html: messages.messageHtml,
                } }),
            react_1.default.createElement(material_1.List, null,
                react_1.default.createElement(SharedDialogButton_1.SharedDialogButton, { disabled: disableImportOverwrite, onClick: handleReplace, icon: react_1.default.createElement(icons_material_1.Done, { htmlColor: "#29c130" }), label: messages.labelReplace }),
                react_1.default.createElement(SharedDialogButton_1.SharedDialogButton, { onClick: handleSkip, icon: react_1.default.createElement(icons_material_1.FileCopy, { htmlColor: "#3a88ca" }), label: messages.labelSkip }),
                react_1.default.createElement(SharedDialogButton_1.SharedDialogButton, { onClick: handleAskDecide, icon: react_1.default.createElement(icons_material_1.Undo, { htmlColor: "black" }), label: messages.labelDecide }))))));
};
exports.ImportCsvDialogStrategy = ImportCsvDialogStrategy;
//# sourceMappingURL=import-csv-dialog-strategy.js.map