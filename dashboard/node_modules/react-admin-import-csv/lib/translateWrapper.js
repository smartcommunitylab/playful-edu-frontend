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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateWrapper = void 0;
var react_admin_1 = require("react-admin");
var messages = __importStar(require("./i18n"));
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var defaultI18nProvider = (0, ra_i18n_polyglot_1.default)(function (locale) { return (messages[locale] ? messages[locale] : messages.en); }, (0, react_admin_1.resolveBrowserLocale)());
var translateWrapper = function () {
    var translateSystem = (0, react_admin_1.useTranslate)();
    var translate = function (key, args) {
        args = args || {};
        args._ = ""; // Hack to stop throwing error
        var res = translateSystem(key, args);
        if (res) {
            return res;
        }
        return defaultI18nProvider.translate(key, args);
    };
    return translate;
};
exports.translateWrapper = translateWrapper;
//# sourceMappingURL=translateWrapper.js.map