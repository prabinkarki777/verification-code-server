declare global {
  namespace Express {
    interface Response {
      success: (statusCode: number, message: string, data?: ResponseData) => void;
    }
  }
}

export interface ResponseData {
  [key: string]: unknown;
}
export interface ErrorFormat {
  code?: string;
  message: string;
  timestamp: string;
  requestId: string;
  stack?: string | null;
}

export interface ErrorResponse {
  success: false;
  error: ErrorFormat;
}

export {};
