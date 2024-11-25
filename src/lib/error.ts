

const ERROR_NAME = {
    UNAUTHORIZED: 'Unauthorized access',
    BAD_REQUEST: 'Bad request',
    INTERNAL_SERVER_ERROR: 'Internal server error'
}
const STATUS_CODES = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 501
}

export type ErrorResponseType = {
    name: string;
    error?: any;
    code: number;
    message: string;
    status: false;
}

class ErrorHandler extends Error {
    status: false;
    error?: any;
    code: number;
    constructor(message: string, code: keyof typeof STATUS_CODES, error?: any){
        super(message);
        this.status = false;
        this.error = error;
        this.code = STATUS_CODES[code];
        this.name = ERROR_NAME[code]
    }
}

export { ErrorHandler }