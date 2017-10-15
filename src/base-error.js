'use strict';

module.exports = class BaseError extends Error {
	constructor(message, type, cause) {
		super(message);

		Object.defineProperty(this, 'message', {
			configurable: true,
			enumerable: false,
			value: message,
			writable: true,
		});

		Object.defineProperty(this, 'name', {
			configurable: true,
			enumerable: false,
			value: this.constructor.name,
			writable: false,
		});

		Object.defineProperty(this, 'type', {
			configurable: true,
			enumerable: false,
			value: type,
			writable: false,
		});

		Object.defineProperty(this, 'cause', {
			configurable: true,
			enumerable: false,
			value: cause,
			writable: false,
		});

		Error.captureStackTrace(this, this.constructor);
	}
};
