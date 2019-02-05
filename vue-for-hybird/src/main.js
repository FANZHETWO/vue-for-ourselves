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
// 为了能够正确执行转场动画，跳转页面的方法需要做一层包装
VueRouter.prototype.$go = function(noAnimate,step = -1) {
    this.noAnimate = noAnimate || false;
    this.goTo = false;
    this.go(step);
};
VueRouter.prototype.$push = function(location, noAnimate, onComplete, onAbort) {
    this.noAnimate = noAnimate || false;
    this.goTo = true;
    this.push(location, onComplete, onAbort);
};
VueRouter.prototype.$replace = function(location, noAnimate, onComplete, onAbort) {
    this.noAnimate = noAnimate || false;
    this.goTo = true;
    this.replace(location, onComplete, onAbort);
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");