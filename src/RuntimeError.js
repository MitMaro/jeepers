import BaseError from './BaseError';

export default class RuntimeError extends BaseError {
	constructor(message, cause) {
		super(message, 'RuntimeError', cause);
	}
}
