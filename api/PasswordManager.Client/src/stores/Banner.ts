import { ref } from "vue";
import { defineStore } from "pinia";

export const useBannerStore = defineStore("bannerStore", () => {
	const parentShowBanner = ref<Function>();
	function ShowBanner(message: string, extendedClass: string) {
		if (parentShowBanner.value != undefined) {
			parentShowBanner.value(message, extendedClass);
			return;
		}
		window.alert("Banner is malfunctioning");
	}
	function SetBannerFunction(showFn: Function) {
		parentShowBanner.value = showFn;
	}
	return { ShowBanner, SetBannerFunction };
});
