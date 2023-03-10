import { createApp } from "vue";
import DemoApp from "./DemoApp.vue";

createApp(DemoApp).mount("#demo-app");

if (import.meta.env.DEV) {
	document.querySelector("#favicon").href = "/favicon-dev.svg";
}
