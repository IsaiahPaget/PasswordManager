import { JWTSessionToken } from "@/LocalStorage";
import type { EditUser } from "@/models/User/EditUser";

const ROUTE = "user";
export async function GetCurrentUser(): Promise<Response> {
	const sessionToken = localStorage.getItem(JWTSessionToken);
	if (sessionToken == undefined) {
		throw new Error("No session token");
	}
	const result = await fetch(`${import.meta.env.VITE_API_URL}/${ROUTE}`, {
		headers: { Authorization: `Bearer ${sessionToken}` },
	});
	return result;
}
export async function UpdateUser(user: EditUser): Promise<Response> {
	const sessionToken = localStorage.getItem(JWTSessionToken);
	if (sessionToken == undefined) {
		throw new Error("No session token");
	}

	const result = await fetch(`${import.meta.env.VITE_API_URL}/${ROUTE}`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`,
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "PUT",
		body: JSON.stringify(user),
	});
	return result;
}
