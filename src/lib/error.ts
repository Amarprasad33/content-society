

const ERROR_NAME = {
    UNAUTHORIZED: 'Unauthorized access',
    BAD_REQUEST: 'Bad request',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    AUTHENTICATION_FAILED: 'Authentication failed',
    USER_NOT_FOUND: 'User not found',
    NOT_FOUND: 'Not Found'
}
const STATUS_CODES = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 501,
    AUTHENTICATION_FAILED: 404,
    NOT_FOUND: 404
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