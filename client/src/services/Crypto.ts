import { MasterPassword, UserEmail } from "@/LocalStorage";
import type { NewLoginRequestDto } from "@/models/logins/NewLoginRequestDto";

const algorithm = "AES-CBC";
let key: CryptoKey | null = null;
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
	if (password == null || password === "") {
		return "";
	}
	const email = localStorage.getItem(UserEmail);
	if (email == null || email === "") {
		return "";
	}
	return `${email}${password}`;
}
function ToBase64(buffer: number[]) {
	return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function FromBase64(buffer: string) {
	return Uint8Array.from(atob(buffer), c => c.charCodeAt(0));
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
	let encrypted
	try {
		encrypted = FromBase64(encryptedData);
	} catch (error) {
		return encryptedData
	}
	if (encrypted.byteLength <= saltLength + ivLength) {
		return encryptedData
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
