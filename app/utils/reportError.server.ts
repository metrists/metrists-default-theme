export function reportErrorToLog(message: string , level: 'warning' | 'error'){
    //TODO: create a proper abstraction for reporting errors
    const outFunction = level === 'error' ? console.error : console.warn;
    outFunction(message);
}

export function reportErrorToUser(message : string , level: 'warning' | 'error' ,   responseInit?: ResponseInit){
    throw new Response(message, {
        status: 500,
        ... (responseInit ? responseInit : {})
    });
}

export function reportError(e: string | unknown, level : 'warning' | 'error' , responseInit?: ResponseInit){
    throw e;
    let message = 'Internal Server Error';
    if (
        typeof e === "object" &&
        e &&
        "message" in e &&
        typeof e.message === "string"
    ) {
        message = e.message; 
    }
    reportErrorToLog(message , level);
    return reportErrorToUser(message, level , responseInit)
}