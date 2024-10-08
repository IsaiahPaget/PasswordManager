import type { loginDto } from "@/models/logins/loginDto";
import type { NewLoginRequestDto } from "@/models/logins/NewLoginRequestDto";
import type { UpdateLoginRequest } from "@/models/logins/UpdateLoginRequest";
import type { Pagination } from "@/models/Pagination";
import { JWTSessionToken } from "@/LocalStorage";
import type { UpdateLoginResponse } from "@/models/logins/UpdateLoginResponse";
import type { LoginsRequestDto } from "@/models/logins/LoginsRequestDto";
import { DecryptLogin, Encrypt, EncryptLogin } from "@/services/Crypto";

const ROUTE = "logins";
export async function GetAllLogins(
	pagination: Pagination
): Promise<LoginsRequestDto | undefined> {
	const sessionToken = localStorage.getItem(JWTSessionToken);

	if (sessionToken == undefined) {
		return;
	}
	try {
		const data = await fetch(
			`${import.meta.env.VITE_API_URL}/${ROUTE}?startIndex=${
				pagination.StartIndex
			}&maxRecords=${pagination.MaxRecords}&searchTerm=${
				pagination.SearchTerm !== "" ? pagination.SearchTerm : "%02%03"
			}`,
			{
				headers: { Authorization: `Bearer ${sessionToken}` },
			}
		);
		if (!data.ok) {
			return;
		}
		const results: LoginsRequestDto = await data.json();

		const decryptedLogins: loginDto[] = [];
		for (let i = 0; i < results.logins.length; i++) {
			const login = results.logins[i];
			try {
				const decrypted = await DecryptLogin({
					name: login.name,
					url: login.url,
					username: login.username,
					password: login.password,
					notes: login.notes,
				});
				decryptedLogins.push({
					id: login.id,
					name: login.name,
					url: login.url,
					username: decrypted.username,
					password: decrypted.password,
					notes: decrypted.notes,
					createdOn: login.createdOn,
					updatedOn: login.updatedOn,
				});
			} catch (error) {
				console.error(error, `failed to decrypt login ${login.id}`)
			}
		}
		results.logins = decryptedLogins;

		return results;
	} catch (error) {
		// TODO: Log error
		return;
	}
}

export async function GetLoginById(id: number): Promise<loginDto | undefined> {
	const sessionToken = localStorage.getItem(JWTSessionToken);

	if (sessionToken == undefined) {
		return;
	}
	try {
		const data = await fetch(
			`${import.meta.env.VITE_API_URL}/${ROUTE}/${id}`,
			{
				headers: { Authorization: `Bearer ${sessionToken}` },
			}
		);
		if (!data.ok) {
			return;
		}
		let results: loginDto = await data.json();

		const decrypted = await DecryptLogin({
			name: results.name,
			url: results.url,
			username: results.username,
			password: results.password,
			notes: results.notes,
		});
		results = {
			id: results.id,
			name: results.name,
			url: results.url,
			username: decrypted.username,
			password: decrypted.password,
			notes: decrypted.notes,
			createdOn: results.createdOn,
			updatedOn: results.updatedOn,
		};
		return results;
	} catch (error) {
		// TODO: Log error
		return;
	}
}

export async function UpdateLogin(
	login: UpdateLoginRequest
): Promise<UpdateLoginResponse | undefined> {
	const sessionToken = localStorage.getItem(JWTSessionToken);

	if (sessionToken == undefined) {
		return;
	}

	try {
		const encryptedLogin = await EncryptLogin(login);
		const mappedLogin = {
			id: login.id,
			name: login.name,
			url: login.url,
			username: encryptedLogin.username,
			password: encryptedLogin.password,
			notes: encryptedLogin.notes,
		};
		const result = await fetch(
			`${import.meta.env.VITE_API_URL}/${ROUTE}/${login.id}`,
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "PUT",
				body: JSON.stringify(mappedLogin),
			}
		);
		if (!result.ok) {
			return;
		}

		const data = await result.json();
		return data;
	} catch (error) {
		// TODO: Log error
		return;
	}
}
export async function CreateLogin(
	login: NewLoginRequestDto
): Promise<loginDto | undefined> {
	const sessionToken = localStorage.getItem(JWTSessionToken);

	if (sessionToken == undefined) {
		return;
	}
	const encryptedLogin = await EncryptLogin(login);
	const mappedLogin = {
		name: login.name,
		url: login.url,
		username: encryptedLogin.username,
		password: encryptedLogin.password,
		notes: encryptedLogin.notes,
	};
	try {
		const result = await fetch(`${import.meta.env.VITE_API_URL}/${ROUTE}`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(mappedLogin),
		});

		if (result.status != 201) {
			return;
		}

		const data = await result.json();
		return data;
	} catch (error) {
		// TODO: log error
		return;
	}
}

export async function DeleteLogin(id: number): Promise<number | undefined> {
	const sessionToken = localStorage.getItem(JWTSessionToken);

	if (sessionToken == undefined) {
		return;
	}

	try {
		const result = await fetch(
			`${import.meta.env.VITE_API_URL}/${ROUTE}/${id}`,
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "DELETE",
			}
		);

		if (!result.ok) {
			return;
		}

		const data = await result.json();
		return data;
	} catch (error) {
		// TODO: log error
		return;
	}
}
