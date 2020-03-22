import Vue from 'vue'
import VueRouter from 'vue-router'
import website from "./default-pages";
import adminSite from "./admin-pages";
import AdminLayout from "../views/main/AdminLayout";

Vue.use(VueRouter)

const routes = [
    /**
     * ========== Main web Router ==========
     * Include main site router from ./default-pages
     */
    ...website,
    /**
     * ========== Admin Router ==========
     * Include main site router from ./admin-pages
     */
    {
        path: '/admin',
        name: 'Admin',
        component: AdminLayout,
        children: [
            ...adminSite
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
