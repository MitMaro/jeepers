'use strict';

const {ErrorHandler} = require('../../src/index');
const sinon = require('sinon');

describe('error-handler ErrorHandler', function () {
	it('should register and call basic single handler', async function () {
		const loggerStub = sinon.stub();
		const handler = sinon.stub();
		const error = new Error();
		const errorHandler = new ErrorHandler(loggerStub);
		errorHandler.register(handler);
		await errorHandler.handle(error);

		expect(handler).to.be.calledWith(loggerStub, error);
	});

	it('should not call next handler on returning true', async function () {
		const loggerStub = sinon.stub();
		const handler1 = sinon.stub().returns(true);
		const handler2 = sinon.stub();
		const error = new Error();
		const errorHandler = new ErrorHandler(loggerStub);
		errorHandler.register(handler1);
		errorHandler.register(handler2);
		await errorHandler.handle(error);

		expect(handler1).to.be.called;
		expect(handler2).to.not.be.called;
	});

	it('should call next handler on returning false', async function () {
		const loggerStub = sinon.stub();
		const handler1 = sinon.stub().returns(false);
		const handler2 = sinon.stub().returns(true);
		const error = new Error();
		const errorHandler = new ErrorHandler(loggerStub);
		errorHandler.register(handler1);
		errorHandler.register(handler2);
		await errorHandler.handle(error);

		expect(handler1).to.be.called;
		expect(handler2).to.be.called;
	});

	it('should call unhandled error handler', async function () {
		const loggerStub = sinon.stub();
		const handler1 = sinon.stub().returns(false);
		const unhandledErrorHandler = sinon.stub();
		const error = new Error();
		const errorHandler = new ErrorHandler(loggerStub);
		errorHandler.register(handler1);
		errorHandler.setUnhandledErrorHandler(unhandledErrorHandler);
		await errorHandler.handle(error);

		expect(handler1).to.be.called;
		expect(unhandledErrorHandler).to.be.called;
	});

	it('should reset unhandled error handler', function () {
		const errorHandler = new ErrorHandler(sinon.stub());
		errorHandler.unhandledErrorHandler = 'not the error handled';
		errorHandler.resetUnhandledErrorHandler();

		expect(errorHandler.unhandledErrorHandler).to.not.equal('not the error handled');
	});

	it('should log causing error', async function () {
		const loggerStub = sinon.stub();
		const handler = sinon.stub();
		const error = new Error();
		error.cause = new Error();
		const errorHandler = new ErrorHandler(loggerStub);
		errorHandler.register(handler);
		await errorHandler.handle(error);

		expect(handler).to.be.calledWith(loggerStub, error);
		expect(handler).to.be.calledWith(loggerStub, error.cause);
	});

	it('should not log cause if not an error', async function () {
		const loggerStub = sinon.stub();
		const handler = sinon.stub();
		const error = new Error();
		error.cause = 'not an error';
		const errorHandler = new ErrorHandler(loggerStub);
		errorHandler.register(handler);
		await errorHandler.handle(error);

		expect(handler).to.be.calledWith(loggerStub, error);
		expect(handler).to.not.be.calledWith(loggerStub, error.cause);
	});

	it('should register multiple handlers as an array', async function () {
		const loggerStub = sinon.stub();
		const handler1 = sinon.stub();
		const handler2 = sinon.stub();
		const error = new Error();
		error.cause = 'not an error';
		const errorHandler = new ErrorHandler(loggerStub);
		errorHandler.register([handler1, handler2]);
		await errorHandler.handle(error);

		expect(handler1).to.be.calledWith(loggerStub, error);
		expect(handler2).to.be.calledWith(loggerStub, error);
	});

	it('should error on attempt to register non-function', function () {
		const errorHandler = new ErrorHandler();
		expect(() => errorHandler.register('not a function'))
			.to.throw('A handler was registered that is not a function');
	});
});
