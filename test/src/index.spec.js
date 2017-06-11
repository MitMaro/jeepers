import {
	BaseError,
	RuntimeError,
	ErrorHandler,
} from '../../src/index';

describe('index', function () {
	it('should have BaseError', function () {
		expect(BaseError).to.not.be.undefined;
	});
	it('should have RuntimeError', function () {
		expect(RuntimeError).to.not.be.undefined;
	});
	it('should have ErrorHandler', function () {
		expect(ErrorHandler).to.not.be.undefined;
	});
});
