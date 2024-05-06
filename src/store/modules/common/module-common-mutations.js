export default {
    
    SET_CURRENT_LOCALE(state, currentLocale) {
        state.currentLocale = currentLocale;
    },SET_USER_TOKEN(state, token) {
        state.userToken = token;
        localStorage.setItem("userToken", JSON.stringify(state.userToken));
    }
};
