'use strict';

const {RuntimeError} = require('../../src/index');

describe('runtime-error RuntimeError', function () {
	it('should have message', function () {
		const err = new RuntimeError('My Message');
		expect(err.message).to.equal('My Message');
	});
	it('should have a type', function () {
		const err = new RuntimeError();
		expect(err.type).to.equal('RuntimeError');
	});
	it('should have a cause', function () {
		const causeError = new Error();
		const err = new RuntimeError(null, causeError);
		expect(err.cause).to.equal(causeError);
	});
	it('should allow setting different type cause', function () {
		const causeError = new Error();
		const err = new RuntimeError(null, 'NewType', causeError);
		expect(err.type).to.equal('NewType');
		expect(err.cause).to.equal(causeError);
	});
});
