import component from './tinybox.vue';

function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Vue.component(component.name, component);
}

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  install(GlobalVue);
}

export default component;
