import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Select from "../views/Select";
import Add from "../views/Add";
import Update from "../views/Update";
import Delete from "../views/Delete";
import Login from "../views/Login";
import Main from "../views/Main";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/select',
    name: 'Select',
    component: Select
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
