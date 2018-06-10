var fs = require('fs');
var Mock = require('mockjs');
var Random = Mock.Random;



let data = Mock.mock({
    "userList|100": [{
            phone: /^1[385][1-9]\d{8}/,
            email: () => Random.email(),
            name: () => Random.cname(),
            "code|10000-60000": 10000,
            data: Random.date(),
            "org|1": ["工程维护部本部",
                "黄永璋组",
                "企业营销",
                "专网事业部",
                "资产管理部",
                "电信通行政部",
                "人事行政部",
                "财务部",
                "电信通帐务部",
                "法务部"
            ],
            "forg|1": [
                "电信通后台2部",
                "教育业务部",
                "北京电信通电信工程有限公司",
                "北京电信通电信工程有限公司",
                "电信通后台1部",
                "北京电信通电信工程有限公司",
                "电信通后台1部",
                "电信通后台1部",
                "北京电信通电信工程有限公司",
                "电信通后台1部",
            ]
        }

    ]
})

fs.writeFileSync('userlist.json', JSON.stringify(data))