import { JWTSessionToken } from "@/LocalStorage";
import type { NewLoginRequestDto } from "@/models/logins/NewLoginRequestDto";
import { DecryptCSV, Encrypt, EncryptCSV, EncryptLogin } from "@/services/Crypto";

const ROUTE = "csv";
export async function ImportCSV(file: File): Promise<undefined> {
	const sessionToken = localStorage.getItem(JWTSessionToken);

	if (sessionToken == undefined) {
		return;
	}

	try {
		const encrypted = await EncryptCSV(file);
		const formData = new FormData();
		if (encrypted == undefined) {
			throw new Error("File is undefined");
		}
		formData.append("file", encrypted);
		const result = await fetch(`${import.meta.env.VITE_API_URL}/${ROUTE}`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
				Accept: "application/json",
			},
			method: "POST",
			body: formData,
		});

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

export async function ExportCSV(): Promise<Response | undefined> {
	const sessionToken = localStorage.getItem(JWTSessionToken);

	if (sessionToken == undefined) {
		return
	}

	try {
		const result = await fetch(`${import.meta.env.VITE_API_URL}/${ROUTE}`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});

		return result
	} catch (error) {
		// TODO: log error
		return
	}
}
