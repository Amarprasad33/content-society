

const ERROR_NAME = {
    UNAUTHORIZED: 'Unauthorized access',
    BAD_REQUEST: 'Bad request',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    AUTHENTICATION_FAILED: 'Authentication failed',
    USER_NOT_FOUND: 'User not found',
    NOT_FOUND: 'Not Found'
} as const;
const STATUS_CODES = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 501,
    AUTHENTICATION_FAILED: 404,
    USER_NOT_FOUND: 404,
    NOT_FOUND: 404
} as const;

// Error types
export type ErrorCode = keyof typeof STATUS_CODES;

// Base response types
export type ApiSuccessResponse<T> = {
  status: true;
  data: T;
};

export type ApiErrorResponse = {
  status: false;
  error: string;
  message?: string;
  code: number;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type ErrorResponseType = {
    name: string;
    error?: Error | string | object;
    code: number;
    message: string;
    status: false;
}

class ErrorHandler extends Error {
    status: false;
    error?: Error | string | object;
    code: number;
    constructor(message: string, code: keyof typeof STATUS_CODES, error?: Error | string | object){
        super(message);
        this.status = false;
        this.error = error;
        this.code = STATUS_CODES[code];
        this.name = ERROR_NAME[code]
    }
}

// Helper functions for creating responses
export function createSuccessResponse<T>(data: T): ApiSuccessResponse<T> {
    return {
      status: true,
      data,
    };
  }
  
  export function createErrorResponse(
    error: string,
    code: number,
    message?: string
  ): ApiErrorResponse {
    return {
      status: false,
      error,
      message,
      code,
    };
}
  
// Helper to handle common errors in server actions
export function handleServerActionError(error: unknown): ApiErrorResponse {
    console.error("Server action error:", error);
    
    if (error instanceof ErrorHandler) {
      return {
        status: false,
        error: error.name,
        message: error.message,
        code: error.code,
      };
    }
    
    // Handle Prisma errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return {
        status: false,
        error: ERROR_NAME.DUPLICATE_ENTRY,
        message: "A record with this information already exists",
        code: STATUS_CODES.DUPLICATE_ENTRY,
      };
    }
    
    // Default error
    return {
      status: false,
      error: "An unexpected error occurred",
      message: error instanceof Error ? error.message : "Unknown error",
      code: STATUS_CODES.INTERNAL_SERVER_ERROR,
    };
}

export { ErrorHandler }