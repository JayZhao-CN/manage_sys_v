import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Select from "../views/Select";
import Add from "../views/Add";
import Update from "../views/Update";
import Delete from "../views/Delete";
import Login from "../views/Login";
import Main from "../views/Main";
import Personal from "../views/Personal";
import User from "../views/User";

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
                path: '/select',
                name: 'Select',
                component: Select
            },
            {
                path: '/user',
                name: 'User',
                component: User
            },
            {
                path: '/add',
                name: 'Add',
                component: Add
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
