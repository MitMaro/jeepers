import {RuntimeError} from '../../src/index';

describe('RuntimeError', function () {
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
});
