import { mount } from "@vue/test-utils";
import BannerAlert from "../BannerAlert.vue";
import { expect, test } from "vitest";

test("mount Banner Alert", async () => {
    expect(BannerAlert).toBeTruthy()
});

test("class applied Banner Alert", async () => {

    const Message = "this is a message"
    const ExtendedClass = "banner-alert"
    const wrapper = mount(BannerAlert, {
        props: {
            extendedClass: ExtendedClass,
            message: Message
        }
    })

    expect(wrapper.classes()).toContain(ExtendedClass)
});

test("Message applied to Banner Alert", async () => {

    const Message = "this is a message"
    const ExtendedClass = "banner-alert"
    const wrapper = mount(BannerAlert, {
        props: {
            extendedClass: ExtendedClass,
            message: Message
        }
    })

    expect(wrapper.text()).toContain(Message)
});