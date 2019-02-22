/**
 * Created by skysoft on 2018/11/8.
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 实例化vuex为store
const store = new Vuex.Store({
    // 开发环境中开启严格模式，以确保vuex中的状态改变不是由mutation导致时给出提示
    // 生产环境时关闭严格模式，以避免严格模式深度检测状态树而导致性能损失
    strict: process.env.NODE_ENV !== 'production',
    state: {
        hasLogin: false,
        headerInfo: {
            title: 'title',
            hasBackBtn: false
        },
        houseSearchInfo: null,
        // 添加房源信息
        addHouseInfo: {},
        reservedHouseInfos: [],
        selectedLabel: [],
        bookedHouseInfos: [],
        // 用户信息
        userInfo: {}
    },
    mutations: {
        login(state) {
            state.hasLogin = true;
        },
        setHeaderInfo(state, info) {
            state.headerInfo = info;
        },
        setHouseInfo(state, addHouseInfo) {
            state.addHouseInfo = Object.assign({}, state.addHouseInfo, addHouseInfo);
        },
        setReservedHouseInfo(state, houseInfo) {
            state.reservedHouseInfos.push(houseInfo);
        },
        setSelectedLabel(state, selectedLabel) {
            state.selectedLabel = selectedLabel
        },
        setUserInfo(state, data) {
            state.userInfo = data;
        }
    }
});

// 暴露store
export default store;

