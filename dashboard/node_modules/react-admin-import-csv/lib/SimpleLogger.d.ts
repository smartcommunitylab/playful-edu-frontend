export declare class SimpleLogger {
    private prefix;
    private debug;
    private loggerID;
    constructor(prefix: string, debug: boolean);
    private getLogString;
    get log(): (...any: any[]) => void;
    get warn(): (...any: any[]) => void;
    get error(): (...any: any[]) => void;
    setEnabled(logging: boolean): void;
}
