export class ContentValidationError extends Error {
  constructor(message: string, public readonly documentId?: string) {
    super(message);
    this.name = 'ContentValidationError';
  }
}

export class SanityConnectivityError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'SanityConnectivityError';
  }
}

export class ContentSourceConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContentSourceConfigError';
  }
}
