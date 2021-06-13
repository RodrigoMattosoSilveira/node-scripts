import { Result, Ok, Err } from 'space-monad'
import {  UserDto, UserError } from './user.model';

// describe(`Monad`, () => {
describe(`Monad`, () => {
	let user: UserDto;
	user = {
		id: "yetanothercrazynumber",
		email: "Francis.Franco@yahoo.com",
		password: "$dfg&*mns12PP",
		firstName: "Francis",
		lastName: "Franco",
		permissionLevel: 0,
		rating: 1934
	};
	let userError: UserError;
	userError = {
		code: "110011",
		message: "What a blunder"
	};
	let result: Result<UserError, UserDto>;

	describe(`Ok`, () => {
		beforeAll(() => {
			result = Ok(user);
		})
		it(`Ok result`, () => {
			expect(result.isOk()).toBe(true);
		});
		it(`yields the expected value`, () => {
			expect(result.get()).toEqual(user);
		});
	});

	describe(`Err`, () => {
		beforeAll(() => {
			result = Err(userError);
		})
		it(`Err result`, () => {
			expect(result.isOk()).toBe(false);
		});
		it(`yields the expected value`, () => {
			expect(result.get()).toEqual(userError);
		});
	});

	describe(`fold`, () => {
		it(`Ok result`, () => {
			result = Ok(user);
			let testVar = `empty`;
			result.fold(
				err => testVar = "Err",
				u => testVar = "Ok");
			expect(testVar).toEqual("Ok");
		});
		it(`Err result`, () => {
			result = Err(userError);
			let testVar = `empty`;
			result.fold(
				err => testVar = "Err",
				u => testVar = "Ok");
			expect(testVar).toEqual("Err");
		});
	});
});