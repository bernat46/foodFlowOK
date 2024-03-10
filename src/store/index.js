import { createStore } from "vuex";

import moduleAuth from "./modules/auth/module-auth";
import moduleCommon from "./modules/common/module-common";

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth: moduleAuth,
        common:moduleCommon
    },
});

export default store;
