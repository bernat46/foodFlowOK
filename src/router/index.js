import { createRouter, createWebHistory } from "@ionic/vue-router";
import LoginPage from "../views/auth/LoginPage.vue";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name:"Login",
        component: LoginPage,
    },
    {
        path: "/register",
        name:"Register",
        component: () => import("@/views/auth/RegisterPage.vue"),
    },
    {
        path: "/menus",
        name:"Menus",
        component: () => import("@/views/MenuPage.vue"),
    },
    {
        path: "/centres",
        name: "Centres",
        component: () => import("@/views/CentresPage.vue")
    },
    {
        path: "/receptes",
        component: () => import("@/views/ReceptesPage.vue")
    },
    {
        path: "/inici",
        component: () => import("@/views/iniciPage.vue")
    },
    {
        path: "/proveidors",
        component: () => import("@/views/ProveidorsPage.vue")
    },
    {
        path: "/stocks",
        component: () => import("@/views/StocksPage.vue")
    },
    {
        path: "/alergenos",
        component: () => import("@/views/AlergensPage.vue"),
        //   meta: {
        //     requiresAuth: true,
        // },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ["Login", "Register"];
//   const publicFromPages = [...publicPages, "Settings"];

//   const authRequired = !publicPages.includes(to.name);
//   const userNodeFirebaseData = JSON.parse(localStorage.getItem("userNodeFirebaseData"));
//   const loggedIn = userNodeFirebaseData ? true : false;

//   if (authRequired && !loggedIn) {
//       return next({ path: `/login-options` });
//   }

//   If logged in and destination page is a login page, redirect to feed.
//   Logged in user don't need to login again

//   if (loggedIn && publicPages.includes(to.name) && !publicFromPages.includes(from.name)) {
//       console.log(to.path, auth.currentUser, from.path);
//       return next({ path: "/feed" });
//   }

//   return next();
// });

export default router;
