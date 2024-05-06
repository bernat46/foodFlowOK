export default {
    setCurrentLocale(context, currentLocale) {
        context.commit("SET_CURRENT_LOCALE", currentLocale);
    },
    setUserToken(context, userToken) {
        context.commit("SET_USER_TOKEN", userToken);
    },
};
