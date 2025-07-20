class AppError extends Error {
    public statusCode;
    public details?;
  
    constructor(message: string, statusCode: number, details?: any) {
      super(message);
      this.statusCode = statusCode;
      this.details = details;
      
      Object.setPrototypeOf(this, new.target.prototype);
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;
  