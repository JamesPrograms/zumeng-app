import Vue from 'vue';
import App from './App';
// 引入路由
import router from './router';
// 引入状态管理
import store from './store';
// 引入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
// 引入vuescroller插件
import VueScroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
// 引入vue-awesome-picker插件
import AwesomePicker from 'vue-awesome-picker';
// 引入Moment.js 时间插件
import moment from 'moment'
// 按需引入mint-ui组件，以减小项目体积
import {Actionsheet, Button, DatetimePicker, Field, Radio} from 'mint-ui';
import Header from './components/header';
// 引入全局样式
import './assets/style/index.less';
// 配置axios方法供全局组件调用
import axios from './assets/js/axios.js';
// 配置util公共方法供全局组件调用
import util from './assets/js/util.js';
// 配置验证方法供全局调用
import valid from './assets/js/valid.js';

Vue.use(VueAwesomeSwiper);
// 使用vuescroll插件并进行全局配置
Vue.use(VueScroll, {
    ops: {
        vuescroll: {
            mode: 'slide',
            pullRefresh: {
                enable: true,
                tips: {
                    deactive: '下拉刷新',
                    active: '松开刷新',
                    start: '刷新中...',
                    beforeDeactive: '刷新成功!'
                }
            },
            pushLoad: {
                enable: true,
                tips: {
                    deactive: '上拉加载',
                    active: '松开加载',
                    start: '加载中...',
                    beforeDeactive: '加载成功!'
                }
            }
        }
    }
});
Vue.use(AwesomePicker);

// 注册全局组件
Vue.component('mtButton', Button);
Vue.component('vHeader', Header);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Radio.name, Radio);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.moment = moment;
Vue.prototype.util = util;
Vue.prototype.valid = valid;

// 项目根实例
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
