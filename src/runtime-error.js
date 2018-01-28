'use strict';

const BaseError = require('./base-error');

module.exports = class RuntimeError extends BaseError {
	constructor(message, type, cause) {
		if (cause === undefined) {
			super(message, 'RuntimeError', type);
		}
		else {
			super(message, type, cause);
		}
	}
};
