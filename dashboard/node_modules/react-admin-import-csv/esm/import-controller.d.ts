import { Translate, DataProvider, Identifier } from "ra-core";
import { ValidateRowFunction } from "./config.interface";
export declare function GetIdsColliding(logging: boolean, translate: Translate, dataProvider: DataProvider, csvValues: any[], resourceName: string, disableGetMany: boolean | undefined): Promise<Identifier[]>;
export declare function GetIdsCollidingGetSingle(logging: boolean, translate: Translate, dataProvider: DataProvider, csvIds: Identifier[], resourceName: string): Promise<Identifier[]>;
export declare function IsIdColliding(dataProvider: DataProvider, id: Identifier, resourceName: string): Promise<string | number | undefined>;
export declare function GetIdsCollidingGetMany(logging: boolean, translate: Translate, dataProvider: DataProvider, csvIds: Identifier[], resourceName: string): Promise<Identifier[]>;
export declare function CheckCSVValidation(logging: boolean, translate: Translate, csvValues: any[], validateRow?: ValidateRowFunction): Promise<void>;
export declare function GetCSVItems(logging: boolean, translate: Translate, file: File, parseConfig: any): Promise<any[]>;
