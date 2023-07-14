"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportCsvDialogEachItem = void 0;
var react_1 = __importDefault(require("react"));
var SharedDialogButton_1 = require("./SharedDialogButton");
var SharedDialogWrapper_1 = require("./SharedDialogWrapper");
var SharedLoader_1 = require("./SharedLoader");
var translateWrapper_1 = require("../translateWrapper");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var ImportCsvDialogEachItem = function (props) {
    var disableImportNew = props.disableImportNew, disableImportOverwrite = props.disableImportOverwrite, currentValue = props.currentValue, resourceName = props.resourceName, values = props.values, fileName = props.fileName, openAskDecide = props.openAskDecide, handleClose = props.handleClose, handleAskDecideReplace = props.handleAskDecideReplace, handleAskDecideAddAsNew = props.handleAskDecideAddAsNew, handleAskDecideSkip = props.handleAskDecideSkip, handleAskDecideSkipAll = props.handleAskDecideSkipAll, isLoading = props.isLoading, idsConflicting = props.idsConflicting;
    var translate = (0, translateWrapper_1.translateWrapper)();
    return (react_1.default.createElement(SharedDialogWrapper_1.SharedDialogWrapper, { title: translate("csv.dialogDecide.title", {
            id: currentValue && currentValue.id,
            resource: resourceName,
        }), subTitle: translate("csv.dialogCommon.subtitle", {
            count: values && values.length,
            fileName: fileName,
            resource: resourceName,
        }), open: openAskDecide, handleClose: handleClose },
        isLoading && react_1.default.createElement(SharedLoader_1.SharedLoader, { loadingTxt: translate("csv.loading") }),
        !isLoading && (react_1.default.createElement("div", null,
            react_1.default.createElement("p", { style: { fontFamily: "sans-serif", margin: "0" }, dangerouslySetInnerHTML: {
                    __html: translate("csv.dialogCommon.conflictCount", {
                        resource: resourceName,
                        conflictingCount: idsConflicting && idsConflicting.length,
                    }),
                } }),
            react_1.default.createElement(material_1.List, null,
                react_1.default.createElement(SharedDialogButton_1.SharedDialogButton, { disabled: disableImportOverwrite, onClick: handleAskDecideReplace, icon: react_1.default.createElement(icons_material_1.Done, { htmlColor: "#29c130" }), label: translate("csv.dialogDecide.buttons.replaceRow", {
                        id: currentValue && currentValue.id,
                    }) }),
                react_1.default.createElement(SharedDialogButton_1.SharedDialogButton, { disabled: disableImportNew, onClick: handleAskDecideAddAsNew, icon: react_1.default.createElement(icons_material_1.Add, { htmlColor: "#3a88ca" }), label: translate("csv.dialogDecide.buttons.addAsNewRow") }),
                react_1.default.createElement(SharedDialogButton_1.SharedDialogButton, { onClick: handleAskDecideSkip, icon: react_1.default.createElement(icons_material_1.Undo, { htmlColor: "black" }), label: translate("csv.dialogDecide.buttons.skipDontReplace") }),
                react_1.default.createElement(SharedDialogButton_1.SharedDialogButton, { onClick: handleAskDecideSkipAll, icon: react_1.default.createElement(icons_material_1.Clear, { htmlColor: "#3a88ca" }), label: translate("csv.dialogCommon.buttons.cancel") }))))));
};
exports.ImportCsvDialogEachItem = ImportCsvDialogEachItem;
//# sourceMappingURL=import-csv-dialog-each-item.js.map