import { ParseConfig } from "papaparse";
export interface ImportConfig {
    logging?: boolean;
    disableCreateMany?: boolean;
    disableUpdateMany?: boolean;
    disableGetMany?: boolean;
    disableImportNew?: boolean;
    disableImportOverwrite?: boolean;
    preCommitCallback?: PrecommitCallback;
    postCommitCallback?: ErrorCallback;
    transformRows?: (csvRows: any[]) => Promise<any[]>;
    validateRow?: ValidateRowFunction;
    parseConfig?: ParseConfig;
}
export declare type PrecommitCallback = (action: "create" | "overwrite", values: any[]) => Promise<any[]>;
export declare type ValidateRowFunction = (csvRowItem: any, index?: any, allItems?: any[]) => Promise<void>;
export declare type ErrorCallback = (error: any) => void;
