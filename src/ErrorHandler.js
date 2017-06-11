export default class ErrorHandler {
	constructor(logger) {
		this.logger = logger;
		this.handlers = [];
	}

	register(handlers) {
		for (const handler of Array.isArray(handlers) ? handlers : [handlers]) {
			this._register(handler);
		}
	}

	async handle(error) {
		for (const handler of this.handlers) {
			if (await handler(this.logger, error) === false) {
				break;
			}
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
}
