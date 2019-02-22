/**
 * 共通方法
 */

// 引入路由器对象
import router from '../../router/index';

// 跳转到指定页面
const goPage = function (option) {
    router.push(option);
};

// 返回上一页
const goBack = function () {
    router.go(-1);
};

export default {
    goPage,
    goBack
}
