import { ResponseData } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class ApiResponseHandler {
  static success(message: string, data?: ResponseData): ApiResponse {
    return {
      success: true,
      message,
      data,
    };
  }
}
