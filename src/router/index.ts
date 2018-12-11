import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router'

const main: AsyncComponent = ():any => import('@/pages/home/Index.vue')

Vue.use(Router)

const routes:RouteConfig[] = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'main',
        component: main
    }
]

const router:Router = new Router({
    mode: 'history',
    base: '/',
    routes
})

export default router