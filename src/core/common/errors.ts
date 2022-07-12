export class InternalError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
  }
}

export class ValidationError extends InternalError {
  constructor(message: string) {
    super(message, 'ValidationError');
  }
}
