  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  const home = () => import( /* webpackChunkName: "home" */ "../views/Home.vue");
  const demo = () => import( /* webpackChunkName: "demo" */ "../views/demo.vue");


  let routes = [{
      path: '/',
      component: home,
  }, {
      path: '/demo',
      component: demo,
  }];
  routes = routes.concat(
      [{
          path: '*',
          redirect: '/'
      }]);
  export default routes