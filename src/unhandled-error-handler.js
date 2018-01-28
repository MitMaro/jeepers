'use strict';

module.exports = () => {
	return async function unhandledErrorHandler(logger, error) {
		await logger('Unhandled error: \n');
		await logger(error.stack);
		await logger('\n');
		return true;
	};
};
