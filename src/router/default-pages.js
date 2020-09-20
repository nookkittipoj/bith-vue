import Home from "../pages/Home";
import Login from "../pages/Login";
import Details from "@/views/Details";

const website = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/details',
        name: 'Details',
        props: true,
        component: Details
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
]

export default website