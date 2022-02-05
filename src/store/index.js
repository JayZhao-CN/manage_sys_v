import {createStore} from 'vuex'

export default createStore({
    state: {
        token: "",
        // 用户所拥有的职位

        userCode: "",
        username: "",

        /**
         * 当前选择的信息
         */
        // 当前所选择的公司
        currentCompany: {
            companyName: "",
            companyCode: "",
        },
        // 当前所选择的职位
        currentPosition: {
            positionName: "",
            positionCode: "",
        },
        /**
         * 总信息
         */
        // 当前选择公司的职位列表
        currentCompanyRoleList:[],
        // 所属公司及职位列表
        companyAndRoleList: [],

        // 所拥有的职位列表
        roles:[],

        // 拥有的职位列表
        roleList: [],

        // 登录界面提示信息
        loginMsg: "",

        /**
         * 超管储存信息
         */
        companyLikeList:[],
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {}
})
