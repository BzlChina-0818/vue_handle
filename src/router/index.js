import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'
import HomePage from '@/components/homePage'
import Passgin from '@/components/passgin'
import Employee from '@/components/organization/employee'
import Business from '@/components/organization/business'
import Applyfor from '@/components/organization/applyfor'
import Assigned from '@/components/apply/assigned'
import Sponsor from '@/components/apply/sponsor'
import Jiaose from '@/components/sanji/jiaose'
import Yuangong from '@/components/sanji/yuangong'
Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/',
            redirect: '/homePage/passgin'
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter(to, from, next) {
                next()
            }
        },
        {
            path: '/homePage',
            name: 'homePage',
            component: HomePage,
            children: [{
                    path: 'passgin',
                    name: 'passgin',
                    component: Passgin
                },
                {
                    path: 'employee',
                    name: 'employee',
                    component: Employee
                },
                {
                    path: 'business',
                    name: 'business',
                    component: Business,
                    children: [{
                            path: "jiaose",
                            name: 'jiaose',
                            component: Jiaose,
                        },
                        {
                            path: "yuangong",
                            name: 'yuangong',
                            component: Yuangong,
                        },
                    ]
                },
                {
                    path: 'applyfor',
                    name: 'applyfor',
                    component: Applyfor
                },
                {
                    path: 'sponsor',
                    name: 'sponsor',
                    component: Sponsor
                },
                {
                    path: 'assigned',
                    name: 'assigned',
                    component: Assigned
                }
            ]

        },




    ]
})
router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        next()
    } else {
        let islogin = sessionStorage.getItem('getlogin')
        if (islogin) {
            next()
        } else {
            next('/login')
        }
    }

})

export default router