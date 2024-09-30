import { MasterPassword, UserEmail } from "@/LocalStorage";
import type { NewLoginRequestDto } from "@/models/logins/NewLoginRequestDto";
import Papa from "papaparse";

const algorithm = "AES-CBC";
let key: CryptoKey | undefined = undefined;
const ivLength = 16;
const saltLength = 16;
const length = 256;
const iterations = 100000;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function PBKDF2(
	password: string,
	salt: string,
	iterations: number,
	length: number,
	hash: string,
	algorithm = "AES-CBC"
) {
	const keyMaterial = await window.crypto.subtle.importKey(
		"raw",
		encoder.encode(password),
		{ name: "PBKDF2" },
		false,
		["deriveKey"]
	);

	return await window.crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: encoder.encode(salt),
			iterations,
			hash,
		},
		keyMaterial,
		{ name: algorithm, length },
		false,
		["encrypt", "decrypt"]
	);
}
function GetEmailAndPassword() {
	const password = localStorage.getItem(MasterPassword);
	if (password == undefined || password === "") {
		return "";
	}
	const email = localStorage.getItem(UserEmail);
	if (email == undefined || email === "") {
		return "";
	}
	return `${email}${password}`;
}
export function ToBase64(buffer: number[]) {
	return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function FromBase64(buffer: string) {
	return Uint8Array.from(atob(buffer), c => c.charCodeAt(0));
}

export function GetRandomPassword(length: number) {
	const characters = "abcdefghijklmnopqrstuvwxyz";
	const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numbers = "0123456789";
	const specials = "!@#$%^&*-=_|[({})]+";
	const opt = [characters, upper, numbers, specials];
	let rotation = 0;
	return Array(length)
		.join()
		.split(",")
		.map(() => {
			const char = opt[rotation].charAt(
				Math.floor(Math.random() * opt[rotation].length)
			);
			if (rotation + 1 >= opt.length) {
				rotation = 0;
			} else {
				rotation++;
			}
			return char;
		})
		.join("");
}

export async function Encrypt(text: string) {
	const emailAndPassword = await GetEmailAndPassword();
	const salt = window.crypto.getRandomValues(new Uint8Array(16));
	const iv = window.crypto.getRandomValues(new Uint8Array(16));
	const plain_text = encoder.encode(text);
	const key = await PBKDF2(
		emailAndPassword,
		salt.toString(),
		iterations,
		length,
		"SHA-256"
	);
	const encrypted = await window.crypto.subtle.encrypt(
		{ name: algorithm, iv },
		key,
		plain_text
	);

	return ToBase64([...salt, ...iv, ...new Uint8Array(encrypted)]);
}

export async function Decrypt(encryptedData: string) {
	let encrypted;
	try {
		encrypted = FromBase64(encryptedData);
	} catch (error) {
		return encryptedData;
	}
	if (encrypted.byteLength <= saltLength + ivLength) {
		return encryptedData;
	}
	const salt = encrypted.slice(0, saltLength);
	const iv = encrypted.slice(0 + saltLength, saltLength + ivLength);
	const key = await PBKDF2(
		GetEmailAndPassword(),
		salt.toString(),
		iterations,
		length,
		"SHA-256"
	);

	const decrypted = await window.crypto.subtle.decrypt(
		{ name: algorithm, iv },
		key,
		encrypted.slice(saltLength + ivLength)
	);
	return decoder.decode(decrypted);
}

export async function DecryptLogin(login: NewLoginRequestDto) {
	let decryptLogin: NewLoginRequestDto = {
		name: "",
		url: "",
		username: "",
		password: "",
		notes: "",
	};

	decryptLogin.username = await Decrypt(login.username);
	decryptLogin.password = await Decrypt(login.password);
	decryptLogin.notes = await Decrypt(login.notes);

	return decryptLogin;
}

export async function EncryptLogin(login: NewLoginRequestDto) {
	let encryptLogin: NewLoginRequestDto = {
		name: "",
		url: "",
		username: "",
		password: "",
		notes: "",
	};

	encryptLogin.username = await Encrypt(login.username);
	encryptLogin.password = await Encrypt(login.password);
	encryptLogin.notes = await Encrypt(login.notes);

	return encryptLogin;
}

function StringToFile(csvContent: string, filename: string): File {
	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	return new File([blob], filename);
}
export async function EncryptCSV(file: File): Promise<File | undefined> {
	try {
		const csvData = await new Promise<any[][]>((resolve, reject) => {
			Papa.parse(file, {
                complete: (results) => resolve(results.data as any[][]),
                error: (error) => reject(error),
            });
		})
		// don't want to encrypt the first entry because thats the header and then don't want to encrypt the last row because Papaparse adds an empty row at the bottom
		for (let i = 1; i < csvData.length - 1; i++) {
			csvData[i][2] = await Encrypt(csvData[i][2]);
			csvData[i][3] = await Encrypt(csvData[i][3]);
			csvData[i][4] = await Encrypt(csvData[i][4]);
		}
		const csvContent = Papa.unparse(csvData);
		const encrypted = StringToFile(csvContent, "file.csv");
		return Promise.resolve(encrypted);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function DecryptCSV(file: File): Promise<File | undefined> {
	try {
		const csvData = await new Promise<any[][]>((resolve, reject) => {
			Papa.parse(file, {
                complete: (results) => resolve(results.data as any[][]),
                error: (error) => reject(error),
            });
		})
		// don't want to decrypt the first entry because thats the header and then don't want to encrypt the last row because Papaparse adds an empty row at the bottom
		for (let i = 1; i < csvData.length - 1; i++) {
			csvData[i][2] = await Decrypt(csvData[i][2]);
			csvData[i][3] = await Decrypt(csvData[i][3]);
			csvData[i][4] = await Decrypt(csvData[i][4]);
		}
		const csvContent = Papa.unparse(csvData);
		const encrypted = StringToFile(csvContent, "file.csv");
		return Promise.resolve(encrypted);
	} catch (error) {
		return Promise.reject(error);
	}
}