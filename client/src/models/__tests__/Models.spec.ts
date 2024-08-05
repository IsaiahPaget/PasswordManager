import { describe, expect, test } from "vitest";
import type { loginDto } from "../logins/loginDto";
import { ToNewLoginRequest, ToUpdateLoginRequest } from "../ModelMappers";

describe("Mappers", async () => {
	const LoginDto = {
		id: 12,
		name: "reddit",
		username: "john doe",
		password: "sdf@#$ASDF123",
		notes: "some notes",
		createdOn: "aug",
		updatedOn: "aug",
	} as loginDto;
	test("maps form loginDto to NewLoginRequestDto", async () => {
		expect(ToNewLoginRequest(LoginDto)).toEqual({
			name: "reddit",
			username: "john doe",
			password: "sdf@#$ASDF123",
			notes: "some notes",
		});
	});
	test("maps form loginDto to UpdateLoginRequest", async () => {
		expect(ToUpdateLoginRequest(LoginDto)).toEqual({
            id: 12,
			name: "reddit",
			username: "john doe",
			password: "sdf@#$ASDF123",
			notes: "some notes",
		});
	});
});
