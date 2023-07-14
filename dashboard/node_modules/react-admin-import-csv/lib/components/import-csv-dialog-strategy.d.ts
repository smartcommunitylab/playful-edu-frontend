interface ImportCsvDialogStrategyProps {
    disableImportOverwrite: boolean;
    resourceName: string;
    fileName: string;
    count: number;
    handleClose: () => any;
    handleReplace: () => any;
    handleSkip: () => any;
    handleAskDecide: () => any;
    open: boolean;
    isLoading: boolean;
    idsConflicting: string[];
}
export declare const ImportCsvDialogStrategy: (props: ImportCsvDialogStrategyProps) => JSX.Element;
export {};
