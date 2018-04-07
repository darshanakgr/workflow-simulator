export interface WSCallback {
    (error: Error, respose?: any): void;
}
export interface WSListener {
    (error: WSError, message: WSMessage): void;
}
export declare type Task = {
    taskId: string;
    name: string;
    description: string;
    progress: number;
    groupId: string;
    predecessors: Array<string>;
    successors?: Array<string>;
};
export declare type WSError = {
    timestamp: number;
    name: string;
    message: string;
    groupId: string;
    extra?: object;
};
export declare type WSMessage = {
    timestamp: number;
    name?: string;
    message?: string;
    state: object;
};
export declare class WSClient {
    private socket;
    private secretKey;
    private groupId;
    constructor(options: {
        host: string;
        secretKey: string;
        groupId: string;
    });
    on(event: string, fn: Function): void;
    close(): void;
    createTask(task: Task, callback: WSCallback): void;
    updateProgress(task: Task, callback: WSCallback): void;
    notifyError(error: WSError, callback: WSCallback): void;
    addListener(groupId: string, listener: WSListener, callback: WSCallback): void;
}
