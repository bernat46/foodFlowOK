import router from "@/router";

export default {
    logout({ commit }) {
        commit("logout");
    },
    setUser({ commit }, user) {
        localStorage.setItem("user", JSON.stringify(user));
        commit("login", user);
    },

    // async registerF(context, details) {
    //     const { email, password } = details;

    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //         return true;
    //     } catch (error) {
    //         switch (error.code) {
    //             case "auth/email-already-in-use":
    //                 return "email_already_in_use";
    //                 break;
    //             case "auth/invalid-email":
    //                 return "invalid-email";
    //                 break;
    //             case "auth/operation-not-allowed":
    //                 return "operation_not_allowed";
    //                 break;
    //             case "auth/weak-password":
    //                 return "weak_password";
    //                 break;
    //             case 400:
    //                 if(error.message=="EMAIL_EXISTS")
    //                 return "email_already_in_use";
    //                 break;
    //             default:
    //                 return "something_wrong";
    //                 break;
    //         }
    //     }
    // },

    // async login({ commit }, details) {
    //     const { email, password } = details;
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //         commit("userNode/SET_USER_NODE_FIREBASE_DATA", auth.currentUser, { root: true });
    //         return true;
    //     } catch (error) {
    //         switch (error.code) {
    //             case "auth/user-not-found":
    //                 return "user_not_found";
    //                 break;
    //             case "auth/invalid-email":
    //                 return "invalid_email";
    //                 break;
    //             case "auth/wrong-password":
    //                 return "wrong_password";
    //                 break;
    //             case "auth/invalid-login-credentials":
    //                 return "invalid_credentials";
    //                 break;
    //             default:
    //                 return "something_wrong";
    //                 break;
    //         }
    //     }
    // },


    async logoutF({ commit }) {
        commit("CLEAR_USER");
        router.push("/");
    },
};
