import component from "./tinybox.vue";

// Executed by Vue.use()
const install = (Vue) => {
	if (install.installed) return;
	install.installed = true;
	Vue.component(component.name, component);
};

// Auto-install when Vue is found
let GlobalVue = null;
if (typeof window !== "undefined") {
	GlobalVue = window.Vue;
	// eslint-disable-next-line no-undef
} else if (typeof global !== "undefined") {
	// eslint-disable-next-line no-undef
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use({ install });
}

// To allow module use
export default component;
