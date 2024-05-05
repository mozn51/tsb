export async function log(message: string, isError: boolean = false) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    if (isError) {
        console.error(logMessage);
    } else {
        console.log(logMessage);
    }
}