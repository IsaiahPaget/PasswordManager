import { expect, test } from "vitest";
import GenerateSecurePassword from "../GenerateSecurePassword.vue";
import { mount } from "@vue/test-utils";

test("mount GenerateSecurePassword", async () => {
    expect(GenerateSecurePassword).toBeTruthy()
})

test("emits password GenerateSecurePassword", () => {
    const wrapper = mount(GenerateSecurePassword)
    wrapper.find('.btn-green').trigger('click')
    expect(wrapper.emitted()).toHaveProperty("password")
})

test("generates new password on render GenerateSecurePassword", async () => {
    const wrapper = mount(GenerateSecurePassword)
    expect(wrapper.find('.password').text().length).not.toBe(0)
})