import state from "./module-auth-state";
import mutations from "./module-auth-mutations";
import actions from "./module-auth-actions";
import getters from "./module-auth-getters";

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
};
