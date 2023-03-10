import component from "./tinybox-gallery.vue";

// Allow installing with app.use()
// Source: https://github.com/houtaroy/vue-component-template/blob/619cacae5b000e4afdc623f2cb5f64fa522214ca/package/utils/ComponentUtil.ts
// IIFE approach inspired by vue-sfc-rollup
export default ((_component) => {
	const installable = _component;
	installable.install = function (app) {
		app.component("TinyboxGallery", installable);
	};

	return _component;
})(component);
