'use strict';

const unhandledErrorHandler = require('./unhandled-error-handler')();

module.exports = class ErrorHandler {
	constructor(logger) {
		this.logger = logger;
		this.handlers = [];
		this.unhandledErrorHandler = unhandledErrorHandler;
	}

	register(handlers) {
		for (const handler of Array.isArray(handlers) ? handlers : [handlers]) {
			this._register(handler);
		}
	}

	setUnhandledErrorHandler(handler) {
		this.unhandledErrorHandler = handler;
	}

	async handle(error) {
		let handled = false;
		for (const handler of this.handlers) {
			if (await handler(this.logger, error)) {
				handled = true;
				break;
			}
		}

		if (!handled) {
			await this.unhandledErrorHandler(this.logger, error);
		}

		if (error.cause instanceof Error) {
			this.logger('Caused by:');
			await this.handle(error.cause);
		}
	}

	_register(handler) {
		if (typeof handler !== 'function') {
			throw new Error('A handler was registered that is not a function');
		}
		this.handlers.push(handler);
	}
};
