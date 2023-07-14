import { ParseConfig } from "papaparse";
declare type PapaString = string | null | number;
export declare function processCsvFile(file: File | any, parseConfig?: ParseConfig): Promise<any[] | undefined>;
export declare function getCsvData(file: File | any, inputConfig?: ParseConfig): Promise<PapaString[][]>;
export declare function processCsvData(data: PapaString[][]): any[];
export {};
