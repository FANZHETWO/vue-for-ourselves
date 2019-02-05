<!-- TODO  该文件仅用于示例，与项目无关，请自行删除 -->
<template>
  <div class="demo">
    <!--<input class="input-add" type="text" v-model="newTodo" placeholder="输入后回车" @keyup.enter="addTodoItem({title:newTodo,order:1,completed:false})">-->
    <!--<div class="todo-list">-->
    <!--<div class="todo-box bd-top" :class="{'completed': item.completed}" v-for="item in todoList">-->
    <!--<i class="todo-icon icon-complete" @click="updateTodo({url:item.url,completed:!item.completed})">✔</i>-->
    <!--<p class="todo-title">{{item.title}}</p>-->
    <!--<i class="todo-icon icon-delete" @click="removeTodo(item.url)">✘</i>-->
    <!--</div>-->
    <!--</div>-->
    <!--<commonPop :list="list">-->
    <!--<div slot-scope="slotProps">{{slotProps}}</div>-->
    <!--</commonPop>-->
    <input v-model.trim="searchVal">
    <ul>
      <!--<li v-for="data in dataAll | filterData">{{data.CATEGORY_NAME}}</li>-->
      <!--<li v-for="dataAll | 'all' | filterBy | searchVal">{{name}}</li>-->
    </ul>
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex";
export default {
  name: "demo",
  data() {
    return {
      searchVal: "   112   ",
      dataAll: [
        {
          CATEGORY_ID: 942,
          TOTAL: 33,
          CATEGORY_CODE: "CP201403120942",
          CATEGORY_NAME: "注塑塑料件"
        },
        {
          CATEGORY_ID: 998,
          TOTAL: 21,
          CATEGORY_CODE: "CP201403120998",
          CATEGORY_NAME: "滤材件"
        },
        {
          CATEGORY_ID: 916,
          TOTAL: 16,
          CATEGORY_CODE: "CP201403120916",
          CATEGORY_NAME: "电控板"
        },
        {
          CATEGORY_ID: 915,
          TOTAL: 12,
          CATEGORY_CODE: "CP201403120915",
          CATEGORY_NAME: "显示板"
        },
        {
          CATEGORY_ID: 1265,
          TOTAL: 12,
          CATEGORY_CODE: "CP201409160064",
          CATEGORY_NAME: "塑料组件"
        },
        {
          CATEGORY_ID: 991,
          TOTAL: 12,
          CATEGORY_CODE: "CP201403120991",
          CATEGORY_NAME: "OEM件"
        },
        {
          CATEGORY_ID: 636,
          TOTAL: 11,
          CATEGORY_CODE: "CP201403120636",
          CATEGORY_NAME: "生产耗材"
        },
        {
          CATEGORY_ID: 1035,
          TOTAL: 11,
          CATEGORY_CODE: "CP201403121035",
          CATEGORY_NAME: "印刷类标贴件"
        },
        {
          CATEGORY_ID: 997,
          TOTAL: 11,
          CATEGORY_CODE: "CP201403120997",
          CATEGORY_NAME: "承压件"
        },
        {
          CATEGORY_ID: 913,
          TOTAL: 10,
          CATEGORY_CODE: "CP201403120913",
          CATEGORY_NAME: "电磁阀"
        },
        {
          CATEGORY_ID: 837,
          TOTAL: 9,
          CATEGORY_CODE: "CP201403120837",
          CATEGORY_NAME: "有刷直流泵"
        },
        {
          CATEGORY_ID: 969,
          TOTAL: 8,
          CATEGORY_CODE: "CP201403120969",
          CATEGORY_NAME: "五金杂件"
        },
        {
          CATEGORY_ID: 1000048,
          TOTAL: 8,
          CATEGORY_CODE: "CP201504220011",
          CATEGORY_NAME: "硅胶件"
        },
        {
          CATEGORY_ID: 1010,
          TOTAL: 8,
          CATEGORY_CODE: "CP201403121010",
          CATEGORY_NAME: "快速接头"
        },
        {
          CATEGORY_ID: 1039,
          TOTAL: 8,
          CATEGORY_CODE: "CP201403121039",
          CATEGORY_NAME: "塑料包装袋"
        },
        {
          CATEGORY_ID: 1049,
          TOTAL: 7,
          CATEGORY_CODE: "CP201403121049",
          CATEGORY_NAME: "包装泡沫"
        },
        {
          CATEGORY_ID: 1016,
          TOTAL: 7,
          CATEGORY_CODE: "CP201403121016",
          CATEGORY_NAME: "铜管配件"
        },
        {
          CATEGORY_ID: 904,
          TOTAL: 7,
          CATEGORY_CODE: "CP201403120904",
          CATEGORY_NAME: "电源线"
        },
        {
          CATEGORY_ID: 5765223193,
          TOTAL: 7,
          CATEGORY_CODE: "CP201705120003",
          CATEGORY_NAME: "净水配件"
        },
        {
          CATEGORY_ID: 906,
          TOTAL: 7,
          CATEGORY_CODE: "CP201403120906",
          CATEGORY_NAME: "线束组件"
        },
        {
          CATEGORY_ID: 918,
          TOTAL: 7,
          CATEGORY_CODE: "CP201403120918",
          CATEGORY_NAME: "指示灯组件"
        },
        {
          CATEGORY_ID: 1000007,
          TOTAL: 7,
          CATEGORY_CODE: "06",
          CATEGORY_NAME: "不锈钢加工件"
        },
        {
          CATEGORY_ID: 5765223144,
          TOTAL: 6,
          CATEGORY_CODE: "CP201607120008",
          CATEGORY_NAME: "净水龙头"
        },
        {
          CATEGORY_ID: 952,
          TOTAL: 6,
          CATEGORY_CODE: "CP201403120952",
          CATEGORY_NAME: "外观类玻璃"
        },
        {
          CATEGORY_ID: 855,
          TOTAL: 6,
          CATEGORY_CODE: "CP201403120855",
          CATEGORY_NAME: "突跳温控器"
        },
        {
          CATEGORY_ID: 1038,
          TOTAL: 6,
          CATEGORY_CODE: "CP201403121038",
          CATEGORY_NAME: "说明书"
        },
        {
          CATEGORY_ID: 688,
          TOTAL: 6,
          CATEGORY_CODE: "CP201403120688",
          CATEGORY_NAME: "温度传感器"
        },
        {
          CATEGORY_ID: 932,
          TOTAL: 6,
          CATEGORY_CODE: "CP201403120932",
          CATEGORY_NAME: "钢制件"
        },
        {
          CATEGORY_ID: 716,
          TOTAL: 6,
          CATEGORY_CODE: "CP201403120716",
          CATEGORY_NAME: "电源开关"
        },
        {
          CATEGORY_ID: 5765223194,
          TOTAL: 6,
          CATEGORY_CODE: "CP201705120004",
          CATEGORY_NAME: "饮水配件"
        },
        {
          CATEGORY_ID: 868,
          TOTAL: 5,
          CATEGORY_CODE: "CP201403120868",
          CATEGORY_NAME: "紫外杀菌器"
        },
        {
          CATEGORY_ID: 714,
          TOTAL: 5,
          CATEGORY_CODE: "CP201403120714",
          CATEGORY_NAME: "浮子开关"
        },
        {
          CATEGORY_ID: 974,
          TOTAL: 5,
          CATEGORY_CODE: "CP201403120974",
          CATEGORY_NAME: "钣金喷涂件"
        },
        {
          CATEGORY_ID: 1061,
          TOTAL: 5,
          CATEGORY_CODE: "CP201403121061",
          CATEGORY_NAME: "铜铝换热器"
        },
        {
          CATEGORY_ID: 644,
          TOTAL: 5,
          CATEGORY_CODE: "CP201403120644",
          CATEGORY_NAME: "不转移胶带"
        },
        {
          CATEGORY_ID: 681,
          TOTAL: 5,
          CATEGORY_CODE: "CP201403120681",
          CATEGORY_NAME: "螺钉螺栓"
        },
        {
          CATEGORY_ID: 1000027,
          TOTAL: 5,
          CATEGORY_CODE: "CP201503020016",
          CATEGORY_NAME: "定速往复式压缩机（＜2P）"
        },
        {
          CATEGORY_ID: 1042,
          TOTAL: 5,
          CATEGORY_CODE: "CP201403121042",
          CATEGORY_NAME: "啡箱"
        },
        {
          CATEGORY_ID: 968,
          TOTAL: 5,
          CATEGORY_CODE: "CP201403120968",
          CATEGORY_NAME: "不锈钢件"
        },
        {
          CATEGORY_ID: 1282,
          TOTAL: 5,
          CATEGORY_CODE: "CP201409160081",
          CATEGORY_NAME: "隔热棉"
        },
        {
          CATEGORY_ID: 1051,
          TOTAL: 4,
          CATEGORY_CODE: "CP201403121051",
          CATEGORY_NAME: "海绵绒布"
        },
        {
          CATEGORY_ID: 1043,
          TOTAL: 4,
          CATEGORY_CODE: "CP201403121043",
          CATEGORY_NAME: "彩箱"
        },
        {
          CATEGORY_ID: 1044,
          TOTAL: 4,
          CATEGORY_CODE: "CP201403121044",
          CATEGORY_NAME: "纸托"
        },
        {
          CATEGORY_ID: 885,
          TOTAL: 4,
          CATEGORY_CODE: "CP201403120885",
          CATEGORY_NAME: "电加热管及组件"
        },
        {
          CATEGORY_ID: 937,
          TOTAL: 4,
          CATEGORY_CODE: "CP201403120937",
          CATEGORY_NAME: "喷油塑料件"
        },
        {
          CATEGORY_ID: 1000046,
          TOTAL: 4,
          CATEGORY_CODE: "CP201504220013",
          CATEGORY_NAME: "沸腾胆"
        },
        {
          CATEGORY_ID: 957,
          TOTAL: 4,
          CATEGORY_CODE: "CP201403120957",
          CATEGORY_NAME: "磁铁"
        },
        {
          CATEGORY_ID: 936,
          TOTAL: 4,
          CATEGORY_CODE: "CP201403120936",
          CATEGORY_NAME: "吸塑塑料件"
        },
        {
          CATEGORY_ID: 1062,
          TOTAL: 4,
          CATEGORY_CODE: "CP201403121062",
          CATEGORY_NAME: "钢换热器"
        },
        {
          CATEGORY_ID: 924,
          TOTAL: 4,
          CATEGORY_CODE: "CP201403120924",
          CATEGORY_NAME: "电控组件类"
        },
        {
          CATEGORY_ID: 1251,
          TOTAL: 4,
          CATEGORY_CODE: "CP201409160050",
          CATEGORY_NAME: "PC/PMMA装饰件"
        },
        {
          CATEGORY_ID: 931,
          TOTAL: 3,
          CATEGORY_CODE: "CP201403120931",
          CATEGORY_NAME: "弹簧"
        },
        {
          CATEGORY_ID: 686,
          TOTAL: 3,
          CATEGORY_CODE: "CP201403120686",
          CATEGORY_NAME: "水流量传感器"
        },
        {
          CATEGORY_ID: 1048,
          TOTAL: 3,
          CATEGORY_CODE: "CP201403121048",
          CATEGORY_NAME: "PE保温管"
        },
        {
          CATEGORY_ID: 645,
          TOTAL: 3,
          CATEGORY_CODE: "CP201403120645",
          CATEGORY_NAME: "封箱胶带"
        },
        {
          CATEGORY_ID: 1259,
          TOTAL: 3,
          CATEGORY_CODE: "CP201409160058",
          CATEGORY_NAME: "模内覆膜件"
        },
        {
          CATEGORY_ID: 1052,
          TOTAL: 3,
          CATEGORY_CODE: "CP201403121052",
          CATEGORY_NAME: "珍珠棉"
        },
        {
          CATEGORY_ID: 100003,
          TOTAL: 3,
          CATEGORY_CODE: "0",
          CATEGORY_NAME: "默认"
        },
        {
          CATEGORY_ID: 5765223143,
          TOTAL: 3,
          CATEGORY_CODE: "CP201607120007",
          CATEGORY_NAME: "滤壳件"
        },
        {
          CATEGORY_ID: 963,
          TOTAL: 3,
          CATEGORY_CODE: "CP201403120963",
          CATEGORY_NAME: "亚克力面板"
        },
        {
          CATEGORY_ID: 843,
          TOTAL: 3,
          CATEGORY_CODE: "CP201403120843",
          CATEGORY_NAME: "可调温控器"
        },
        {
          CATEGORY_ID: 1000040,
          TOTAL: 3,
          CATEGORY_CODE: "CP201503242002",
          CATEGORY_NAME: "吹塑塑料件"
        },
        {
          CATEGORY_ID: 539,
          TOTAL: 3,
          CATEGORY_CODE: "CP201403120539",
          CATEGORY_NAME: "普通色母"
        },
        {
          CATEGORY_ID: 633,
          TOTAL: 3,
          CATEGORY_CODE: "CP201403120633",
          CATEGORY_NAME: "助焊剂"
        },
        {
          CATEGORY_ID: 1000037,
          TOTAL: 2,
          CATEGORY_CODE: "012",
          CATEGORY_NAME: "装配类组件"
        },
        {
          CATEGORY_ID: 647,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120647",
          CATEGORY_NAME: "贴面胶"
        },
        {
          CATEGORY_ID: 521,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120521",
          CATEGORY_NAME: "PE"
        },
        {
          CATEGORY_ID: 708,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120708",
          CATEGORY_NAME: "微动开关"
        },
        {
          CATEGORY_ID: 516,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120516",
          CATEGORY_NAME: "HIPS"
        },
        {
          CATEGORY_ID: 1000047,
          TOTAL: 2,
          CATEGORY_CODE: "CP201504220012",
          CATEGORY_NAME: "电子冰胆"
        },
        {
          CATEGORY_ID: 511,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120511",
          CATEGORY_NAME: "ABS"
        },
        {
          CATEGORY_ID: 637,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120637",
          CATEGORY_NAME: "导热硅胶"
        },
        {
          CATEGORY_ID: 541,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120541",
          CATEGORY_NAME: "色粉"
        },
        {
          CATEGORY_ID: 869,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120869",
          CATEGORY_NAME: "臭氧发生器"
        },
        {
          CATEGORY_ID: 587,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120587",
          CATEGORY_NAME: "包扎带"
        },
        {
          CATEGORY_ID: 628,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120628",
          CATEGORY_NAME: "喷涂塑粉"
        },
        {
          CATEGORY_ID: 537,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120537",
          CATEGORY_NAME: "改性塑料粒子"
        },
        {
          CATEGORY_ID: 678,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120678",
          CATEGORY_NAME: "垫片弹垫"
        },
        {
          CATEGORY_ID: 1053,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403121053",
          CATEGORY_NAME: "隔音棉"
        },
        {
          CATEGORY_ID: 527,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120527",
          CATEGORY_NAME: "PP"
        },
        {
          CATEGORY_ID: 1065,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403121065",
          CATEGORY_NAME: "过滤器"
        },
        {
          CATEGORY_ID: 1214,
          TOTAL: 2,
          CATEGORY_CODE: "CP201409160014",
          CATEGORY_NAME: "物联网组件"
        },
        {
          CATEGORY_ID: 1015,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403121015",
          CATEGORY_NAME: "转换接头"
        },
        {
          CATEGORY_ID: 1211,
          TOTAL: 2,
          CATEGORY_CODE: "CP201409160011",
          CATEGORY_NAME: "主控芯片MCU"
        },
        {
          CATEGORY_ID: 680,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120680",
          CATEGORY_NAME: "螺母"
        },
        {
          CATEGORY_ID: 845,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120845",
          CATEGORY_NAME: "定时器"
        },
        {
          CATEGORY_ID: 591,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120591",
          CATEGORY_NAME: "打包带"
        },
        {
          CATEGORY_ID: 976,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120976",
          CATEGORY_NAME: "钣金组件"
        },
        {
          CATEGORY_ID: 977,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120977",
          CATEGORY_NAME: "钣金非喷涂件"
        },
        {
          CATEGORY_ID: 973,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120973",
          CATEGORY_NAME: "钣金喷油件"
        },
        {
          CATEGORY_ID: 965,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120965",
          CATEGORY_NAME: "挤塑面板"
        },
        {
          CATEGORY_ID: 944,
          TOTAL: 2,
          CATEGORY_CODE: "CP201403120944",
          CATEGORY_NAME: "电镀塑料件"
        },
        {
          CATEGORY_ID: 604,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120604",
          CATEGORY_NAME: "氧气"
        },
        {
          CATEGORY_ID: 794,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120794",
          CATEGORY_NAME: "线帽"
        },
        {
          CATEGORY_ID: 898,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120898",
          CATEGORY_NAME: "套管"
        },
        {
          CATEGORY_ID: 955,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120955",
          CATEGORY_NAME: "云母件"
        },
        {
          CATEGORY_ID: 927,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120927",
          CATEGORY_NAME: "遥控器"
        },
        {
          CATEGORY_ID: 595,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120595",
          CATEGORY_NAME: "橡胶轧件"
        },
        {
          CATEGORY_ID: 1012,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403121012",
          CATEGORY_NAME: "双头波纹连接管"
        },
        {
          CATEGORY_ID: 605,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120605",
          CATEGORY_NAME: "氨气"
        },
        {
          CATEGORY_ID: 1000173,
          TOTAL: 1,
          CATEGORY_CODE: "CP201601180001",
          CATEGORY_NAME: "音响组件"
        },
        {
          CATEGORY_ID: 929,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120929",
          CATEGORY_NAME: "小五金"
        },
        {
          CATEGORY_ID: 544,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120544",
          CATEGORY_NAME: "冷轧钢板"
        },
        {
          CATEGORY_ID: 941,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120941",
          CATEGORY_NAME: "挤塑塑料件"
        },
        {
          CATEGORY_ID: 769,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120769",
          CATEGORY_NAME: "干电池"
        },
        {
          CATEGORY_ID: 515,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120515",
          CATEGORY_NAME: "GPPS"
        },
        {
          CATEGORY_ID: 585,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120585",
          CATEGORY_NAME: "前处理剂"
        },
        {
          CATEGORY_ID: 733,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120733",
          CATEGORY_NAME: "发光二极管"
        },
        {
          CATEGORY_ID: 1242,
          TOTAL: 1,
          CATEGORY_CODE: "CP201409160041",
          CATEGORY_NAME: "水泵组件"
        },
        {
          CATEGORY_ID: 704,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120704",
          CATEGORY_NAME: "镇流器"
        },
        {
          CATEGORY_ID: 1045,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403121045",
          CATEGORY_NAME: "纸护角"
        },
        {
          CATEGORY_ID: 630,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120630",
          CATEGORY_NAME: "油墨"
        },
        {
          CATEGORY_ID: 996,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120996",
          CATEGORY_NAME: "水管件"
        },
        {
          CATEGORY_ID: 567,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120567",
          CATEGORY_NAME: "拉丝材"
        },
        {
          CATEGORY_ID: 1033,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403121033",
          CATEGORY_NAME: "商标"
        },
        {
          CATEGORY_ID: 715,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120715",
          CATEGORY_NAME: "琴键开关"
        },
        {
          CATEGORY_ID: 703,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120703",
          CATEGORY_NAME: "低频变压器"
        },
        {
          CATEGORY_ID: 1047,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403121047",
          CATEGORY_NAME: "蜂窝纸板"
        },
        {
          CATEGORY_ID: 1249,
          TOTAL: 1,
          CATEGORY_CODE: "CP201409160048",
          CATEGORY_NAME: "覆膜件"
        },
        {
          CATEGORY_ID: 966,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120966",
          CATEGORY_NAME: "装饰条"
        },
        {
          CATEGORY_ID: 635,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120635",
          CATEGORY_NAME: "铜焊料"
        },
        {
          CATEGORY_ID: 1000011,
          TOTAL: 1,
          CATEGORY_CODE: "CP201503020011",
          CATEGORY_NAME: "换气风机组件"
        },
        {
          CATEGORY_ID: 658,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403120658",
          CATEGORY_NAME: "保温棉"
        },
        {
          CATEGORY_ID: 1069,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403121069",
          CATEGORY_NAME: "排污阀"
        },
        {
          CATEGORY_ID: 1068,
          TOTAL: 1,
          CATEGORY_CODE: "CP201403121068",
          CATEGORY_NAME: "阀芯"
        }
      ]
    };
  },
  components: {},

  computed: {
    dataList() {
      let tempA = [];
      tempA = this.dataAll.filter(item => {
        return item.CATEGORY_NAME.indexOf(this.searchVal) !== -1;
      });
      if (tempA.length) {
        return tempA;
      }
      return this.dataAll;
    }
    // ...mapState({
    //     todoList: state => state.demo.todoList
    // })
  },
  mounted() {
    // this.getTodoList();
  },
  methods: {
    chang(e) {
      console.log(e);
    },
    // ...mapActions(["getTodoList", "addTodo", "updateTodo", "removeTodo"]),
    addTodoItem(data) {
      var self = this;
      self.addTodo(data).then(() => {
        self.newTodo = "";
      });
    }
  }
};
</script>

<style lang="less">
.demo {
  * {
    outline: none;
    box-sizing: border-box;
  }
  .input-add {
    display: block;
    padding: 4px 10px;
    height: 50px;
    width: 100%;
    border: 0;
    font-size: 18px;
    &::-webkit-input-placeholder {
      font-size: 16px;
    }
  }
  .todo-box {
    position: relative;
    @height: 45px;
    padding: 0 30px;
    width: 100%;
    height: @height;
    line-height: @height;
    border-color: #ccc;
    border-top-style: dotted;
    background-color: white;
    .todo-icon {
      position: absolute;
      top: 0;
    }
    .icon-complete {
      left: 10px;
      color: #888;
    }
    .icon-delete {
      right: 10px;
      color: #f74c31;
    }
    &:first-child {
      border-color: #888;
    }
    &.completed {
      .todo-title {
        color: #888;
        text-decoration: line-through;
      }
      .icon-complete {
        left: 10px;
        color: #04be02;
      }
    }
  }
}
</style>
