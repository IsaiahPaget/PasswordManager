import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import Pagination from "../Pagination.vue";

describe("Pagination", () => {
    const PageNumber = 0
    const StartIndex = 0
    const RowCount = 20
    const MaxRecords = 10
    const wrapper = mount(Pagination, {
        props: {
            pageNumber: PageNumber,
            startIndex: StartIndex,
            rowCount: RowCount,
            maxRecords: MaxRecords
        }
    })
    test("recieves props", () => {
        expect(wrapper.text()).toContain(PageNumber + 1)
    })

    test("emits onNext", () => {
        wrapper.find({ ref: "forward" }).trigger('click')
        expect(wrapper.emitted()).toHaveProperty('onNext')
    })

    test("does not emits onPrevious because disabled", () => {
        wrapper.find({ ref: "backward" }).trigger('click')
        expect(wrapper.emitted()).not.toHaveProperty('onPrevious')
    })
})