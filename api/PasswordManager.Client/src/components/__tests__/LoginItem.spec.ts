import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import LoginItem from "../LoginItem.vue";

describe("LoginItem", async () => {
    const Name = "name"
    const Username = "username"
    const Url = "url"
    const wrapper = mount(LoginItem, {
        props: {
            login: {
                id: 1,
                name: Name,
                username: Username,
                url: Url,
                password: "helsd",
                notes: "notes",
                createdOn: "wfsd",
                updatedOn: "hsdf"
            }
        }
    })

    test("recieves props", async () => {
        expect(wrapper.text()).toContain(Name)
        expect(wrapper.text()).toContain(Username)
        expect(wrapper.text()).toContain(Url)
    })
})