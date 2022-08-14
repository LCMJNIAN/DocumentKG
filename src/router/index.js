import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout' //布局页



Vue.use(VueRouter)

// 通用页面, 这里的配置不需要权限
export const constRouter = [
  {
      path: '/login',
      component: () => import('@/views/login/Login'),
      hidden: true //导航菜单忽略选项
  },
  {
      path: '',
      component: Layout, //应用布局页
      redirect: '/index',
      hidden: true,
  },
  {
      path: '/index',
      component: Layout, //应用布局页
      name: 'index',
      meta:{
          title: "首页", //导航菜单项标题
          icon: 'el-icon-s-home' //导航菜单图标
      },
      children: [
        {
          path: '',
          component: () => import('@/views/index/index.vue'),
          name: 'indexs',
          meta: {
            title: "首页",
            icon: 'el-icon-s-home',
            roles: ['admin','jerry']
          }
        }
      ]
  }
]

// 动态路由 communication
export const asyncRoutes = [
  {
    path: '/pigeonhole',
    component: Layout,
    redirect: '/pigeonhole/index',
    meta: {
      title: "公文归档",
      icon: 'el-icon-s-marketing',
      hidden: false
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/pigeonhole/Index.vue'),
        name: 'index',
        meta: {
          title: "公文归档",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
    ]
  },
  {
    path: '/general',
    component: Layout,
    redirect: '/general/index',
    meta:{
      title: "通用要素抽取",
      icon: 'el-icon-s-goods',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/general/Index.vue'),
        name: 'index',
        meta: {
          title: "通用要素抽取",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business/index',
    meta:{
      title: "业务要素抽取",
      icon: 'el-icon-s-platform',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/business/Index.vue'),
        name: 'index',
        meta: {
          title: "业务要素抽取",
          icon: 'el-icon-message',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
      
    ]
  },
  {
    path: '/all',
    component: Layout,
    redirect: '/all/index',
    meta:{
      title: "抽取与归档",
      icon: 'el-icon-s-help',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/all/Index.vue'),
        name: 'index',
        meta: {
          title: "抽取与归档",
          icon: 'el-icon-message',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
    ]
  },
  {
    path: '/MoudelTrain',
    component: Layout,
    redirect: '/MoudelTrain/Index',
    meta:{
      title: "模型训练",
      icon: 'el-icon-s-help',
      hidden: false,
    },
    children: [
      {
        path: 'Index',
        component: () => import('@/views/MoudelTrain/Index.vue'),
        name: 'Index',
        meta: {
          title: "模型训练",
          icon: 'el-icon-message',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
    ]
  },
  {
    path: '/communication',
    component: Layout,
    redirect: '/communication/index',
    meta:{
      title: "使用说明",
      icon: 'el-icon-s-help',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/communication/Index.vue'),
        name: 'communicationindex',
        meta: {
          title: "使用说明",
          icon: 'el-icon-message',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
    ]
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta:{
      title: "登录日志管理",
      icon: 'el-icon-user-solid',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/Index.vue'),
        name: 'homeindex',
        meta: {
          title: "登录日志管理",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constRouter
})

export default router

