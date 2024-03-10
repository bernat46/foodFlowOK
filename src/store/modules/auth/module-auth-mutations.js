export default {
    login(state, user) {
        state.isAuthenticated = true;
        state.user = user;
    },
    logout(state) {
        state.isAuthenticated = false;
        state.user = null;
        localStorage.clear()
    },
    SET_USER(state, user) {
        state.user = user;
    },
    CLEAR_USER(state) {
        state.user = null;
        localStorage.removeItem("user");
        state.isAuthenticated = false;
    },
    SET_USER_DATA(state, userData) {
        state.user_data = userData;
    },
};
