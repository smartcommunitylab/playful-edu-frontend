import React from "react";
interface ImportButtonProps {
    variant: "text" | "outlined" | "contained";
    label: string;
    clickImportButton: () => any;
    onFileAdded: (e: React.ChangeEvent<HTMLInputElement>) => any;
    onRef: (el: HTMLInputElement) => any;
}
export declare function ImportButton(props: ImportButtonProps): JSX.Element;
export {};
