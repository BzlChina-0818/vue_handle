import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import { instance as http } from '../until/https'
Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        menu: [],
        tabMenu: [],
        table: [],
        list: []
    },
    actions: {
        fetchMenu({ commit }) {
            http.get('/api/menu').then((res) => {
                commit('upMenu', res)
            })
        },
        fetchTableMenu({ commit, state }, cb) {
            if (state.tabMenu.length > 0) {
                cb()
            }
            http.get('/api/table').then((res) => {
                setTimeout(() => {
                    commit('upTableMenu', res)
                    cb()
                }, 2000)

            })

        },
        fetchTableList({ commit }) {
            http.get('/api/list').then((res) => {
                commit('upTableList', res)
            })
        },
        removeItem({ commit }, playload) {
            commit('removeItem', playload)
        },
        fetchList({ commit }) {
            http.get('/api/sanji').then((res) => {
                commit('sanjiMenu', res)
            })
        }

    },
    mutations: {
        upMenu(state, data) {
            state.menu = data.data.data
        },
        upTableMenu(state, data) {
            state.tabMenu = data.data.orgs
        },
        upTableList(state, data) {
            state.table = data.data.userList
        },
        sanjiMenu(state, data) {
            state.list = data.data.list
        },
        removeItem(state, palyload) {
            let tmp = [...state.table]
            let con;
            tmp.forEach((v, ind) => {
                if (v.code === palyload.code) {
                    con = ind
                }
            })
            console.log(con)
            tmp.splice(con, 1);
            state.table = tmp

        }

    },
    getters: {
        filterMenu(state) {
            return (filter) => {
                if (filter) {
                    let res = state.tabMenu.filter((item) => {

                        return item.ORGNAME.indexOf(filter) > -1 || item.FORGNAME.indexOf(filter) > -1
                    })
                    return res

                } else {
                    return state.tabMenu
                }

            }

        }
    }
})
export default store