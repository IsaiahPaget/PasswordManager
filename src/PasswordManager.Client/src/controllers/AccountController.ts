import type { LoginResponeDto } from "@/models/Account/LoginResponseDto";
import type { LoginUserDto } from "@/models/Account/LoginUserDto";
import type { RegisterUserDto } from "@/models/Account/RegisterUserDto";
import { JWTSessionToken, UserEmail, UserUsername } from "@/LocalStorage";

export async function RegisterUser(user: RegisterUserDto) {
	try {
		const result = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
			method: "POST",
			headers: {
				accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (result.status != 200) {
			return;
		}
		const registerResponse = await result.json();
		const register: LoginResponeDto = {
			Username: registerResponse.username,
			Email: registerResponse.email,
			Token: registerResponse.token,
		};

		localStorage.setItem(JWTSessionToken, register.Token);
		localStorage.setItem(UserUsername, register.Username);
		localStorage.setItem(UserEmail, register.Email);

		return register;
	} catch (error) {
		// TODO: log error
		return
	}
}

export async function LoginUser(
	user: LoginUserDto
): Promise<LoginResponeDto | undefined> {
	try {
		const result = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
			method: "POST",
			headers: {
				accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (result.status != 200) {
			return;
		}
		const loginResponse = await result.json();
		const login: LoginResponeDto = {
			Username: loginResponse.username,
			Email: loginResponse.email,
			Token: loginResponse.token,
		};

		localStorage.setItem(JWTSessionToken, login.Token);
		localStorage.setItem(UserUsername, login.Username);
		localStorage.setItem(UserEmail, login.Email);

		return login;
	} catch (error) {
		// TODO: log error
		return;
	}
}
