<template>
  <div>
    <transition :name="transitionName">
      <keep-alive :include="keepAlive.value" :max="8">
        <router-view class="child-view" :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import keepAlive from "./router/keepAlive.js";
import commonFun from "./js/common.js";
// import platform from 'h5-res-platform'
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {},
  data() {
    return {
      transitionName: "",
      noAnimate: true,
      keepAlive: keepAlive
    };
  },
  computed: {},
  created() {},
  mounted() {},
  beforeCreate() {
    // let self = this,
    //     origin = self.$router.history && self.$router.history.getCurrentLocation() || '',
    //     originRoute = origin.split('?')[0],
    //     excludes = [];
    // if (originRoute == '/initial') return;
    // if (excludes.indexOf(originRoute) == -1) {
    //     self.$router.$replace({
    //         path: '/initial',
    //         query: {
    //             old: origin
    //         }
    //     }, true)
    // } else {
    //     document.addEventListener('deviceready', () => {
    //         platform.setBounces(0)
    //     })
    // }
  },
  methods: {},
  watch: {
    $route(to, from) {
      let goTo = this.$router.goTo,
        noAnimatePages = {
          // 从下列页面跳转到其它页面都没有转场动画 eg:['/initial']
          from: [],
          // 跳转到下列页面都没有转场动画 eg:['/initial']
          to: [],
          // 同时满足to和from时没有转场动画 eg:[{to:'/message/detail', from:'/'}]
          and: [
            {
              to: "/",
              from: "/"
            }
          ]
        };
      if (
        noAnimatePages.to.indexOf(to.path) > -1 ||
        noAnimatePages.from.indexOf(from.path) > -1
      ) {
        this.noAnimate = true;
      } else if (
        noAnimatePages.and.find(
          item => item.to === to.path && item.from === from.path
        )
      ) {
        this.noAnimate = true;
      } else {
        this.noAnimate = this.$router.noAnimate || false;
      }
      if (!this.noAnimate) {
        // 判断页面回退还是前进
        if (goTo) {
          this.transitionName = "slide-right";
        } else {
          this.transitionName = "slide-left";
        }
      } else {
        this.transitionName = "no-animate";
      }
      window.scrollTo(0, 0);
      this.$router.goTo = false;
      this.$router.noAnimate = false;
    }
  }
};
</script>

<style lang="less">
@import "./assets/style/index.less";
@border-base: #eaeaea;
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  opacity: 0;
}

.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
  opacity: 0;
}

.full-border {
  .bd {
    border: 1px solid @border-base;
  }
  .bd-top {
    border-top: 1px solid @border-base;
  }
  .bd-bottom {
    border-bottom: 1px solid @border-base;
  }
  .bd-left {
    border-left: 1px solid @border-base;
  }
  .bd-right {
    border-right: 1px solid @border-base;
  }
}

.half-border {
  .bd {
    border: 0.5px solid @border-base;
  }
  .bd-top {
    border-top: 0.5px solid @border-base;
  }
  .bd-bottom {
    border-bottom: 0.5px solid @border-base;
  }
  .bd-left {
    border-left: 0.5px solid @border-base;
  }
  .bd-right {
    border-right: 0.5px solid @border-base;
  }
}
</style>
