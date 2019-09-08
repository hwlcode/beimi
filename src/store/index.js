import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: 'zzh',
        night: false,
        fontSize: 18,
        token: null,
        userId: null,
        mobile: null,
        bookInfo: null,
        loginNum: 0,
        logoUrl: null,
        isLogin: false,
        needMoney: 0
    },
    getters: {},
    mutations: {
        SET_READ_MODE(state, val) {
            state.night = val;
        },
        SET_FONT_SIZE(state, val) {
            state.fontSize = val;
        },
        LOGIN(state, val) {
            state.isLogin = true;
            state.token = val;
        },
        SET_USER_ID(state, val) {
            state.userId = val;
        },
        LOGOUT(state) {
            state.isLogin = false;
            state.token = null;
            state.userId = null;
        },
        SET_MOBILE(state, val) {
            state.mobile = val;
        },
        SET_NEED_MONEY(state, val){
            state.needMoney = val;
        }
    },
    actions: {}
})
