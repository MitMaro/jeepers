'use strict';

const BaseError = require('./base-error');

module.exports = class RuntimeError extends BaseError {
	constructor(message, cause) {
		super(message, 'RuntimeError', cause);
	}
};
