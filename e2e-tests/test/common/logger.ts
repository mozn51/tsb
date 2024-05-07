
/**
* Logging Function
* @param message: the message to show on the log
* @param isError: true or false to log as an error or not.
*/
export async function log(message: string, isError: boolean = false) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    if (isError) {
        console.error(logMessage);
    } else {
        console.log(logMessage);
    }
}