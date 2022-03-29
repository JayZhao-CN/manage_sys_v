import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Add from "../views/Add";
import Update from "../views/Update";
import Delete from "../views/Delete";
import Login from "../views/Login";
import Main from "../views/Main";
import Personal from "../views/Personal";
import User from "../views/User";
import Color from "../views/Color";
import Style from "../views/Style";
import Size from "../views/Size";
import Type from "../views/Type";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        children: [{
            path: '',
            component: Home,
        },
            {
                path: '/user',
                name: 'User',
                component: User
            },
            {
                path: '/color',
                name: 'Color',
                component: Color
            },
            {
                path: '/style',
                name: 'Style',
                component: Style
            },
            {
                path: '/size',
                name: 'Size',
                component: Size
            },
            {
                path: '/type',
                name: 'Type',
                component: Type
            },
            {
                path: '/update',
                name: 'Update',
                component: Update
            },
            {
                path: '/delete',
                name: 'Delete',
                component: Delete
            }
        ]
    },
    {
        path: '/personal',
        name: 'Personal',
        component: Personal
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
