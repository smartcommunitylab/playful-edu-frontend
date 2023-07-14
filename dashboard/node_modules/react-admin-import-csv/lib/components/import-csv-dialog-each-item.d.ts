interface ImportCsvDialogEachItemProps {
    disableImportNew: boolean;
    disableImportOverwrite: boolean;
    currentValue: any;
    resourceName: string;
    values: any[];
    fileName: string;
    openAskDecide: boolean;
    handleClose: () => any;
    handleAskDecideReplace: () => any;
    handleAskDecideAddAsNew: () => any;
    handleAskDecideSkip: () => any;
    handleAskDecideSkipAll: () => any;
    isLoading: boolean;
    idsConflicting: string[];
}
export declare const ImportCsvDialogEachItem: (props: ImportCsvDialogEachItemProps) => JSX.Element;
export {};
