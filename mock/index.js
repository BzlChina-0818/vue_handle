var userlist = [{ name: "zhangsan", pw: "123456", userId: "1" }]
var url = require('url');
var menu = require('./menu.json')
var tabmenu = require('./group.json')
var userlistJson = require('./userlist.json')
var sanji = require('./sanji.json')
module.exports = function(app) {
    app.get('/api/login', function(req, res, next) {
        console.log(req.url)
        let user = url.parse(req.url, true).query

        let state = userlist.some((i) => {
            console.log(i.name, user.user)
            if (i.name == user.user) {
                return false
            } else {
                return true
            }
        })
        if (state) {
            res.json({ code: '1', msg: '注册成功' })
        } else {
            res.json({ code: '0', msg: '注册失败' })
        }
        //res.send(userlist)
    })
    app.get('/api/menu', function(req, res, next) {
        res.send(menu)
    })
    app.get('/api/table', function(req, res, next) {
        res.send(tabmenu)
    })
    app.get('/api/list', function(req, res, next) {
        res.send(userlistJson)
    })
    app.get('/api/sanji', function(req, res, next) {
        res.send(sanji)
    })
}