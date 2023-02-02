import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Tinybox from "../tinybox.vue";

describe("TinyBox", () => {
	it("renders properly", () => {
		const wrapper = mount(Tinybox);
		expect(wrapper.text()).toBe("");
	});
	it("embeds pictures correctly", () => {
		const wrapper = mount(Tinybox, {
			props: { images: [{ src: "https://picsum.photos/id/13/600" }], index: 0 },
		});

		const image = wrapper.find("img");

		expect(image.exists());
		expect(image.html()).toContain("https://picsum.photos/id/13/600");
	});
});
