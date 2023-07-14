import { ErrorCallback, PrecommitCallback } from "./config.interface";
import { DataProvider } from "ra-core";
export declare function create(logging: boolean, disableCreateMany: boolean | undefined, dataProvider: DataProvider, resource: string, values: any[], preCommitCallback?: PrecommitCallback, postCommitCallback?: ErrorCallback): Promise<undefined>;
export declare function update(logging: boolean, disableUpdateMany: boolean | undefined, dataProvider: DataProvider, resource: string, values: any[], preCommitCallback?: PrecommitCallback, postCommitCallback?: ErrorCallback): Promise<undefined>;
interface ReportItem {
    value: any;
    success: boolean;
    err?: any;
    response?: any;
}
export declare function createInDataProvider(logging: boolean, disableCreateMany: boolean, dataProvider: DataProvider, resource: string, values: any[]): Promise<ReportItem[]>;
export {};
