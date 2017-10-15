const {BaseError} = require('../../src/index');

// reference: https://github.com/onury/custom-error-test
function getType(o) {
	return {}.toString.call(o).match(/\s(\w+)/i)[1].toLowerCase();
}

class CustomError extends BaseError {}

describe('BaseError', function () {
	describe('error constructor', function () {
		it('should be type of function', function () {
			expect(typeof BaseError).to.equal('function');
		});
		it('should have a toString value of function', function () {
			expect(getType(BaseError)).to.equal('function');
		});
	});
	describe('error instance', function () {
		it('should have constructor name set to error name', function () {
			const err = new BaseError();
			expect(err.constructor.name).to.equal('BaseError');
		});
		it('should have name set to error name', function () {
			const err = new BaseError();
			expect(err.name).to.equal('BaseError');
		});
		it('should have a message', function () {
			const err = new BaseError('Error Message');
			expect(err.message).to.equal('Error Message');
		});
		it('should have a type', function () {
			const err = new BaseError('Error Message', 'MyType');
			expect(err.type).to.equal('MyType');
		});
		it('should have a cause', function () {
			const causeError = new Error();
			const err = new BaseError('Error Message', 'MyType', causeError);
			expect(err.cause).to.equal(causeError);
		});
		it('should have a toString value of error', function () {
			const err = new BaseError();
			expect(getType(err)).to.equal('error');
		});
		it('should have a prototype of BaseError', function () {
			const err = new BaseError();
			expect(Object.getPrototypeOf(err)).to.equal(BaseError.prototype);
		});
		it('should be instance of Error', function () {
			const err = new BaseError();
			expect(err).to.be.instanceOf(Error);
		});
		it('should be instance of BaseError', function () {
			const err = new BaseError();
			expect(err).to.be.instanceOf(BaseError);
		});
		it('should have toString', function () {
			const err = new BaseError();
			expect(err.toString).to.be.instanceOf(Function);
		});
		it('should have correct toString', function () {
			const err = new BaseError('Error Message');
			expect(err.toString()).to.equal('BaseError: Error Message');
		});
		it('should have stack that includes error name and message', function () {
			const err = new BaseError('Error Message');
			expect(err.stack.split('\n')[0]).to.equal('BaseError: Error Message');
		});
		it('should have stack that includes line info', function () {
			const err = new BaseError('Error Message');
			expect(err.stack.split('\n')[1]).to.include(__filename);
		});
	});
	describe('error extended from BaseError', function () {
		it('should have constructor name set to error name', function () {
			const err = new CustomError();
			expect(err.constructor.name).to.equal('CustomError');
		});
		it('should have name set to error name', function () {
			const err = new CustomError();
			expect(err.name).to.equal('CustomError');
		});
		it('should have message', function () {
			const err = new CustomError('Error Message');
			expect(err.message).to.equal('Error Message');
		});
		it('should be instance of Error', function () {
			const err = new CustomError();
			expect(err).to.be.instanceOf(Error);
		});
		it('should be instance of BaseError', function () {
			const err = new BaseError();
			expect(err).to.be.instanceOf(BaseError);
		});
		it('should be instance of CustomError', function () {
			const err = new CustomError();
			expect(err).to.be.instanceOf(CustomError);
		});
		it('should have stack that includes error name and message', function () {
			const err = new CustomError('Error Message');
			expect(err.stack.split('\n')[0]).to.equal('CustomError: Error Message');
		});
		it('should have stack that includes line info', function () {
			const err = new CustomError('Error Message');
			expect(err.stack.split('\n')[1]).to.include(__filename);
		});
	});
});
