import "babel-polyfill";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./router/index.js";
import store from "./store/index.js";
Vue.use(VueRouter);
const router = new VueRouter({
    routes
});
console.log(Vue.config);
console.log(process.env.BASE_URL);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");