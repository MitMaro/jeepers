// Type definitions for @mitmaro/errors 0.2.0
// Project: @mitmaro/errors
// Definitions by: Tim Oram <https://github.com/MitMaro>

/** A logger to log the error information */
export interface ILogger {
	/**
	 * @param message A string to be logged
	 */
	(message: string): Promise<void>;
}

/** A error handler that can handle a number of errors */
export interface IHandler {
	(logger: ILogger, error: Error): boolean;
}

declare abstract class BaseError extends Error {
	/** The error message */
	public message: string;

	/** The name of the error, which is generally the constructor name */
	public name: string;

	/** A value to identify the error from other errors */
	public type: string;

	/** The error, if exists, that caused this error */
	public cause?: Error;

	/**
	 * Create a base error type
	 * @param message The error message
	 * @param type The identity of this error
	 * @param cause The causing error of this error
	 */
	constructor(message: string, type: string, cause?: Error);
}

declare class RuntimeError extends BaseError {
	/**
	 * Create a Runtime error
	 * @param message The error message
	 * @param cause The causing error of this error
	 */
	constructor(message: string, cause: Error);

	/**
	 * Create a Runtime error
	 * @param message The error message
	 * @param type The identity of this error
	 * @param cause The causing error of this error
	 */
	constructor(message: string, type: string, cause: Error);
}

/**
 * An error handler system.
 */
declare class ErrorHandler {
	/**
	 * Create a error handler with a logger instance
	 * @param logger A logger
	 */
	constructor(logger: ILogger);

	/**
	 * Register one or more handlers
	 * @param handlers A handler instance or an array of instances
	 */
	public register(handlers: IHandler | IHandler[]): void;

	/**
	 * Set the handler that is used when an error is not handled
	 * @param handler A handler instance
	 * @returns The previously defined handler
	 */
	public setUnhandledErrorHandler(handler: IHandler): IHandler;

	/**
	 * Reset the unhandled error handler back to the built in default handler
	 * @returns The previously defined handler
	 */
	public resetUnhandledErrorHandler(): IHandler;

	/**
	 * The handler to handle an error that occurs.
	 * @param error Any error instance
	 * @returns A promise that will resolve when the errors have been handled
	 */
	public handle(error: Error): Promise<void>;
}
