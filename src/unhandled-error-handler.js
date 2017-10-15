'use strict';

module.exports = () => {
	return async function unhandledErrorHandler(logger, error) {
		logger('Unhandled error: \n');
		logger(error.stack);
		logger('\n');
		return true;
	};
};
