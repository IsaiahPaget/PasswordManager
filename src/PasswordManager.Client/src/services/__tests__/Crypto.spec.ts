import { expect, test } from "vitest";
import { Decrypt, Encrypt } from "../Crypto";

test("should encrypt and decrypt some text", async () => {
	const originalPassword = "supersecret3!!@#$2";
	const encrypted = await Encrypt(originalPassword);
	const decrypted = await Decrypt(encrypted);

	expect(encrypted);
	expect(decrypted).toBe(originalPassword);
});

test("should encrypt empty string", async () => {
	const originalPassword = "";
	const encrypted = await Encrypt(originalPassword);
	const decrypted = await Decrypt(encrypted);

	expect(decrypted).toBe(originalPassword);
});

test("Should return original text if it cannot decrypt", async () => {
	const originalPassword = "sdfsdw#2";
	const decrypted = await Decrypt(originalPassword);

	expect(decrypted).toBe(originalPassword);
});