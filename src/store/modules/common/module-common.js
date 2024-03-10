import state from './module-common-state';
import mutations from './module-common-mutations';
import actions from './module-common-actions';
import getters from './module-common-getters';

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
};
