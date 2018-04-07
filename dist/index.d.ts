/**
 * WSCallback interface
 * represents a callback function which returns responses
 * the server. Response may vary due to the function type
 * @param {Error} error
 * @param {any} response
 * @return {void}
 */
export interface WSCallback {
    (error: Error, response?: any): void;
}
/**
 * WSListener interface
 * represents a custom listener which is triggered
 * when a state change occurred in a particular
 * chained task.
 * @param {WSError} error
 * @param {WSMessage} message
 * @return {void}
 */
export interface WSListener {
    (error: WSError, message: WSMessage): void;
}
/**
 * Task type
 * represents an object type for task subroutines in
 * a chained task.
 */
export declare type Task = {
    taskId: string;
    name: string;
    description: string;
    progress: number;
    groupId: string;
    predecessors: Array<string>;
    successors?: Array<string>;
};
/**
 * WSError type
 * represents an object type which is used to notify an
 * error to all the clients.
 */
export declare type WSError = {
    timestamp: number;
    name: string;
    message: string;
    groupId: string;
    extra?: object;
};
/**
 * WSMessage type
 * represents an object type which is used to notify an
 * message to all the clients.
 */
export declare type WSMessage = {
    timestamp: number;
    name?: string;
    message?: string;
    state: object;
};
/**
 * WSClient class
 * includes all the functionalities which requires to access the
 * cloud service remotely. A valid secret key and the group identifier
 * is required to initialize the connection.
 */
export declare class WSClient {
    private socket;
    private secretKey;
    private groupId;
    /**
     * constructor
     * @param {object} options an object contains url to host, secret key, and group identifier
     */
    constructor(options: {
        host: string;
        secretKey: string;
        groupId: string;
    });
    /**
     * This function acts as a listener to emitting events by the web server.Throws an error when event name is not valid.
     * @example connect, disconnect
     * @param {string} event event name
     * @param {Function} fn callback function
     * @throws {Error}
     * @return {void}
     */
    on(event: string, fn: Function): void;
    /**
     * closes the connection wih the cloud service.
     * @return {void}
     */
    close(): void;
    /**
     * creates a task in the chained task which is used when
     * initializing the WSClient.
     * @param {Task} task task object
     * @param {WSCallback} callback callback function
     * @return {void}
     */
    createTask(task: Task, callback: WSCallback): void;
    /**
     * updates the progress of a subroutine in a chained task which is used when
     * initializing the WSClient.
     * @param {object} task task object
     * @param {WSCallback} callback callback function
     */
    updateProgress(task: {
        taskId: string;
        groupId: string;
        progress: number;
    }, callback: WSCallback): void;
    /**
     * notifies an error to all the clients.
     * @param {WSError} error error object
     * @param {WSCallback} callback callback function
     */
    notifyError(error: WSError, callback: WSCallback): void;
    /**
     * listens to state changes of a chained task
     * @param {WSListener} listener listener function
     * @param {WSCallback} callback callback function
     */
    addListener(listener: WSListener, callback: WSCallback): void;
}
