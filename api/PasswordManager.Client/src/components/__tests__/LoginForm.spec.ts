import { describe, expect, test } from "vitest";
import LoginForm from "../LoginForm.vue";
import { mount } from "@vue/test-utils";

describe("LoginForm", async () => {
	test("mount LoginForm", () => {
		expect(LoginForm).toBeTruthy();
	});
	const Login = {
		name: "name123",
		url: "urlsdf",
		username: "username@#$",
		password: "password!@#$ASDF1234",
		notes: "these are some notes",
	};
	const wrapper = mount(LoginForm, {
		props: {
			login: Login,
		},
	});
	test("recieves name", async () => {
		expect(wrapper.find("#nameInput").element.value).toContain(Login.name);
	});
	test("recieves url", async () => {
		expect(wrapper.find("#urlInput").element.value).toContain(Login.url);
	});
	test("recieves username", async () => {
		expect(wrapper.find("#usernameInput").element.value).toContain(
			Login.username
		);
	});
	test("recieves password", async () => {
		expect(wrapper.find("#passwordInput").element.value).toContain(
			Login.password
		);
	});
	test("recieves notes", async () => {
		expect(wrapper.find("#notesInput").element.value).toContain(
			Login.notes
		);
	});

	test("emits onSubmit", async () => {
		wrapper.find(".btn-blue").trigger("click");
		expect(wrapper.emitted()).toHaveProperty("onSubmit");
		expect(wrapper.emitted("onSubmit")[0][0]).toEqual(Login);
	});
});