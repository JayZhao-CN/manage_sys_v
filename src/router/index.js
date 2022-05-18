import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Main from "../views/Main";
import Personal from "../views/Personal";
import User from "../views/User";
import Color from "../views/Color";
import Style from "../views/Style";
import Size from "../views/Size";
import Type from "../views/Type";
import Process from "../views/Process";
import Product from "../views/Product";
import TypePropties from "../views/TypePropties";
import TypeProcess from "../views/TypeProcess";
import Propties from "../views/Propties";
import ProductOther from "../views/ProductOther";

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
                path: '/process',
                name: 'Process',
                component: Process
            },
            {
                path: '/product',
                name: 'Product',
                component: ProductOther
            },
            {
                path: '/propties',
                name: 'Propties',
                component: Propties
            },
            {
                path: '/type_propties',
                name: 'TypePropties',
                component: TypePropties
            },
            {
                path: '/type_process',
                name: 'TypeProcess',
                component: TypeProcess
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
