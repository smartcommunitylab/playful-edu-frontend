import { useTranslate, resolveBrowserLocale, } from 'react-admin';
import * as messages from "./i18n";
import polyglotI18nProvider from "ra-i18n-polyglot";
var defaultI18nProvider = polyglotI18nProvider(function (locale) { return (messages[locale] ? messages[locale] : messages.en); }, resolveBrowserLocale());
export var translateWrapper = function () {
    var translateSystem = useTranslate();
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
//# sourceMappingURL=translateWrapper.js.map