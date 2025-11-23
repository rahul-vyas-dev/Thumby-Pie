export class ApiError extends Error implements ApiError {
  statusCode: number;
  errors?: any;

  constructor(
    statusCode: number,
    message: string,
    errors?: any,
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}