import Component from "./tinybox.vue";

// Allow installing with app.use()
// Source: https://github.com/houtaroy/vue-component-template/blob/619cacae5b000e4afdc623f2cb5f64fa522214ca/package/utils/ComponentUtil.ts
const withInstall = (comp) => {
	const c = comp;
	c.install = function (app) {
		app.component(c.name, Component);
	};

	return comp;
};

export default withInstall(Component);
