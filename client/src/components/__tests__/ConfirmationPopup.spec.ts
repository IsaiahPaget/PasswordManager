import { expect, test } from "vitest";
import ConfirmationPopup from "../ConfirmationPopup.vue";
import { mount } from "@vue/test-utils";

test("mount Confirmation Popup", async () => {
	expect(ConfirmationPopup).toBeTruthy();
});

test("message is passed into Confirmation Popup", async () => {
	const Message = "this is a message";
	const wrapper = mount(ConfirmationPopup, {
		props: {
			message: Message,
		},
	});

	expect(wrapper.text()).toContain(Message);
});

test("emits OnClose Confirmation Popup", async () => {
	const Message = "this is a message";
	const wrapper = mount(ConfirmationPopup, {
		props: {
			message: Message,
		},
	});
	wrapper.find("div").trigger("click");

	expect(wrapper.emitted()).toHaveProperty("onClose");
});

test("emits OnConfirm Confirmation Popup", async () => {
	const Message = "this is a message";
	const wrapper = mount(ConfirmationPopup, {
		props: {
			message: Message,
		},
	});
	wrapper.find("button").trigger("click");

	expect(wrapper.emitted()).toHaveProperty("onConfirm");
});
