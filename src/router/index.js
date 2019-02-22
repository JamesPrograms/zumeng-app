import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index.js';
// 登录页组件
import login from '@/components/pages/login';
// 实名认证页
import nameCertification from '@/components/pages/nameCertification'
// 短信认证页
import smsCertification from '@/components/pages/smsCertification'
// index页组件
import index from '@/components/pages/index';
// 引入房源组件
import houseResource from '@/components/pages/houseResource';
// 引入房源详情页
import houseDetail from '@/components/pages/houseDetail';
// 引入对房源发布者的评论页
import commentsForPublisher from '@/components/pages/commentsForPublisher';
// 引入看房评论页
import houseComments from '@/components/pages/houseComments';
// 引入预约看房页
import reserveTime from '@/components/pages/reserveTime';
// 引入预约成功页
import reserveSuccess from '@/components/pages/reserveSuccess';
// 引入我的房源组件
import myHouseResource from '@/components/pages/myHouseResource';
// 引入我的房源页面待确认页面
import myHouseToBeConfirmed from '@/components/pages/myHouseToBeConfirmed';
// 引入我的房源页面已确认页面
import myHouseConfirmed from '@/components/pages/myHouseConfirmed';
// 引入我的房源页面已看房页面
import myHouseHaveSeen from '@/components/pages/myHouseHaveSeen';
// 引入我的房源页面已锁定页面
import myHouseLocked from '@/components/pages/myHouseLocked';
// 引入修改预约页面
import modifyReservation from '@/components/pages/modifyReservation';
// 引入申诉处理页面
import appealComplete from '@/components/pages/appealComplete';
// 引入取消交易页面
import cancelTransaction from '@/components/pages/cancelTransaction';
// 引入添加房源基本信息页面
import addHouseBasicInfo from '@/components/pages/addHouseBasicInfo'
// 引入地图选址页面
import chooseAddr from '@/components/pages/chooseAddr'
// 引入配套设施页面
import houseAllocations from '@/components/pages/houseAllocations'
// 引入出租信息页面
import rentalInfo from '@/components/pages/rentalInfo'
// 引入修改完成页面
import modifyComplete from '@/components/pages/modifyComplete'
// 引入看房设置页面
import lookHouseSetting from '@/components/pages/lookHouseSetting'
// 引入我的意向组件
import myIntention from '@/components/pages/myIntention';
// 引入我的意向页面待确认页面
import intentionToBeConfirmed from '@/components/pages/intentionToBeConfirmed';
// 引入我的意向页面已确认页面
import intentionConfirmed from '@/components/pages/intentionConfirmed';
// 引入我的意向页面已看房页面
import intentionHaveSeen from '@/components/pages/intentionHaveSeen';
// 引入我的意向页面已锁定页面
import intentionLocked from '@/components/pages/intentionLocked';
// 引入投诉页面
import complain from '@/components/pages/complain';
// 引入订金支付页面
import payEarnest from '@/components/pages/payEarnest';
// 引入确认结果页面
import complainSuccess from '@/components/pages/complainSuccess';
// 引入投诉成功页面
import confirmSign from '@/components/pages/confirmSign';
// 引入设置组件
import setting from '@/components/pages/setting';
// 引入定金页面
import earnest from '@/components/pages/earnest';
// 引入通知消息页面
import notificationMessage from '@/components/pages/notificationMessage';
// 引入我的交易页面
import myTransaction from '@/components/pages/myTransaction';
// 引入我的银行卡页面
import myBankCard from '@/components/pages/myBankCard';
// 引入绑定银行卡页面
import bindBankcard from '@/components/pages/bindBankcard';
// 引入短信验证（银行卡）页面
import verifyBankcard from '@/components/pages/verifyBankcard';
// todo:引入sample组件
import sample from '@/components/pages/sample';
// 引入地图定位页
import location from '@/components/pages/location';
// 引入地图定位页
import houseDemand from '@/components/pages/houseDemand';
// 引入点评房屋页
import commentHouse from '@/components/pages/commentHouse';
// 引入添加标签页页
import addLabel from '@/components/pages/addLabel';

Vue.use(Router);

// 路由配置
const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        redirect: to => {
            const loginState = localStorage.getItem('login');
            if (!loginState) {
                return '/login';
            } else {
                return '/houseResource';
            }
        },
        children: [
            {
                path: 'houseResource',
                name: 'houseResource',
                component: houseResource,
                meta: {
                    headerInfo: {title: '房源', hasBackBtn: false}
                }
            },
            {
                path: 'myHouseResource',
                name: 'myHouseResource',
                component: myHouseResource,
                redirect: 'myHouseResource/myHouseToBeConfirmed',
                meta: {
                    headerInfo: {title: '我的房源', hasBackBtn: false}
                },
                children: [
                    {
                        path: 'myHouseToBeConfirmed',
                        name: 'myHouseToBeConfirmed',
                        component: myHouseToBeConfirmed,
                        meta: {
                            headerInfo: {title: '我的房源', hasBackBtn: false}
                        }
                    },
                    {
                        path: 'myHouseConfirmed',
                        name: 'myHouseConfirmed',
                        component: myHouseConfirmed,
                        meta: {
                            headerInfo: {title: '我的房源', hasBackBtn: false}
                        }
                    },
                    {
                        path: 'myHouseHaveSeen',
                        name: 'myHouseHaveSeen',
                        component: myHouseHaveSeen,
                        meta: {
                            headerInfo: {title: '我的房源', hasBackBtn: false}
                        }
                    },
                    {
                        path: 'myHouseLocked',
                        name: 'myHouseLocked',
                        component: myHouseLocked,
                        meta: {
                            headerInfo: {title: '我的房源', hasBackBtn: false}
                        }
                    }
                ]
            },
            {
                path: 'myIntention',
                name: 'myIntention',
                component: myIntention,
                redirect: 'myIntention/intentionToBeConfirmed',
                children: [
                    {
                        path: 'intentionToBeConfirmed',
                        name: 'intentionToBeConfirmed',
                        component: intentionToBeConfirmed,
                        meta: {
                            headerInfo: {title: '我的意向', hasBackBtn: false}
                        },
                    },
                    {
                        path: 'intentionConfirmed',
                        name: 'intentionConfirmed',
                        component: intentionConfirmed,

                    },
                    {
                        path: 'intentionHaveSeen',
                        name: 'intentionHaveSeen',
                        component: intentionHaveSeen,

                    },
                    {
                        path: 'intentionLocked',
                        name: 'intentionLocked',
                        component: intentionLocked,

                    }
                ]
            },
            {
                path: 'setting',
                name: 'setting',
                component: setting,
                meta: {
                    headerInfo: {title: '设置', hasBackBtn: false}
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            headerInfo: {title: '租盟', hasBackBtn: false}
        }
    },
    {
        path: '/nameCertification',
        name: 'nameCertification',
        component: nameCertification,
        meta: {
            headerInfo: {title: '实名认证', hasBackBtn: false}
        }
    },
    {
        path: '/smsCertification',
        name: 'smsCertification',
        component: smsCertification,
        meta: {
            headerInfo: {title: '短信认证', hasBackBtn: true}
        }
    },
    {   // todo: sample
        path: '/sample',
        name: 'sample',
        component: sample,
        meta: {
            headerInfo: {title: 'Sample', hasBackBtn: false}
        }
    },
    {
        path: '/houseDetail',
        name: 'houseDetail',
        component: houseDetail,
        meta: {
            headerInfo: {title: '房源详情', hasBackBtn: true}
        }
    },
    {
        path: '/commentsForPublisher',
        name: 'commentsForPublisher',
        component: commentsForPublisher,
        meta: {
            headerInfo: {title: '发布者评论', hasBackBtn: true}
        }
    },
    {
        path: '/houseComments',
        name: 'houseComments',
        component: houseComments,
        meta: {
            headerInfo: {title: '看房评论', hasBackBtn: true}
        }
    },
    {
        path: '/reserveTime',
        name: 'reserveTime',
        component: reserveTime,
        meta: {
            headerInfo: {title: '预约', hasBackBtn: true}
        }
    },
    {
        path: '/reserveSuccess',
        name: 'reserveSuccess',
        component: reserveSuccess,
        meta: {
            headerInfo: {title: '预约成功', hasBackBtn: true}
        }
    },
    {
        path: '/location',
        name: 'location',
        component: location,
        meta: {
            headerInfo: {title: '地图', hasBackBtn: true}
        }
    },
    {
        path: '/houseDemand',
        name: 'houseDemand',
        component: houseDemand,
        meta: {
            headerInfo: {title: '求租需求', hasBackBtn: true},
            keepAlive: true
        }
    },
    {
        path: '/addHouseBasicInfo',
        name: 'addHouseBasicInfo',
        component: addHouseBasicInfo,
        meta: {
            headerInfo: {title: '房源基本信息', hasBackBtn: true}
        }
    },
    {
        path: '/chooseAddr',
        name: 'chooseAddr',
        component: chooseAddr,
        meta: {
            headerInfo: {title: '地图选址', hasBackBtn: true}
        }
    },
    {
        path: '/houseAllocations',
        name: 'houseAllocations',
        component: houseAllocations,
        meta: {
            headerInfo: {title: '配套设施', hasBackBtn: true}
        }
    },
    {
        path: '/rentalInfo',
        name: 'rentalInfo',
        component: rentalInfo,
        meta: {
            headerInfo: {title: '出租信息', hasBackBtn: true},
            keepAlive: true
        }
    },
    {
        path: '/modifyReservation',
        name: 'modifyReservation',
        component: modifyReservation,
        meta: {
            headerInfo: {title: '修改预约', hasBackBtn: true}
        }
    },
    {
        path: '/commentHouse',
        name: 'commentHouse',
        component: commentHouse,
        meta: {
            headerInfo: {title: '点评一下', hasBackBtn: true},
            keepAlive: true
        }
    }
    ,
    {
        path: '/addLabel',
        name: 'addLabel',
        component: addLabel,
        meta: {
            headerInfo: {title: '添加标签', hasBackBtn: true}
        }
    },
    {
        path: '/modifyComplete',
        name: 'modifyComplete',
        component: modifyComplete,
        meta: {
            headerInfo: {title: '修改完成', hasBackBtn: true}
        }
    },
    {
        path: '/appealComplete',
        name: 'appealComplete',
        component: appealComplete,
        meta: {
            headerInfo: {title: '申诉', hasBackBtn: true}
        }
    },
    {
        path: '/cancelTransaction',
        name: 'cancelTransaction',
        component: cancelTransaction,
        meta: {
            headerInfo: {title: '取消交易', hasBackBtn: true}
        }
    },
    {
        path: '/lookHouseSetting',
        name: 'lookHouseSetting',
        component: lookHouseSetting,
        meta: {
            headerInfo: {title: '看房设置', hasBackBtn: true}
        }
    },
    {
        path: '/earnest',
        name: 'earnest',
        component: earnest,
        meta: {
            headerInfo: {title: '订金', hasBackBtn: true}
        }
    },
    {
        path: '/notificationMessage',
        name: 'notificationMessage',
        component: notificationMessage,
        meta: {
            headerInfo: {title: '通知消息', hasBackBtn: true}
        }
    },
    {
        path: '/myTransaction',
        name: 'myTransaction',
        component: myTransaction,
        meta: {
            headerInfo: {title: '我的交易', hasBackBtn: true}
        }
    },
    {
        path: '/complain',
        name: 'complain',
        component: complain,
        meta: {
            headerInfo: {title: '投诉发布者', hasBackBtn: true}
        }
    },
    {
        path: '/payEarnest',
        name: 'payEarnest',
        component: payEarnest,
        meta: {
            headerInfo: {title: '锁定房源', hasBackBtn: true}
        }
    },
    {
        path: '/complainSuccess',
        name: '/complainSuccess',
        component: complainSuccess,
        meta: {
            headerInfo: {title: '投诉提交', hasBackBtn: false}
        }
    },
    {
        path: '/confirmSign',
        name: 'confirmSign',
        component: confirmSign,
        meta: {
            headerInfo: {title: '确认结果', hasBackBtn: true}
        }
    },
    {
        path: '/myBankCard',
        name: 'myBankCard',
        component: myBankCard,
        meta: {
            headerInfo: {title: '我的银行卡', hasBackBtn: true}
        }
    },
    {
        path: '/bindBankcard',
        name: 'bindBankcard',
        component: bindBankcard,
        meta: {
            headerInfo: {title: '绑定银行卡', hasBackBtn: true}
        }
    },
    {
        path: '/verifyBankcard',
        name: 'verifyBankcard',
        component: verifyBankcard,
        meta: {
            headerInfo: {title: '短信验证', hasBackBtn: true}
        }
    }
];

// 实例化路由器
const router = new Router({
    // todo: 为了打包后能在本地运行，暂时注释，使用默认模式hash
    //mode: 'history',            // 使用history模式，浏览器url中不会带‘#’号
    linkActiveClass: 'active',  // 路由链接被激活后的样式
    routes                      // 配置的路由
});


// 路由导航守卫
router.beforeEach(({meta}, from, next) => {
    // 如果路由的meta对象中有headerInfo
    if (meta.headerInfo) {
        // 触发vuex中的setHeaderInfo方法从而动态设置header
        store.commit('setHeaderInfo', meta.headerInfo);
        next();
    } else {
        next();
    }

});

// 暴露路由器对象
export default router;
