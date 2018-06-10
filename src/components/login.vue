<template>
<div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="二维码登录" name="first">二维码登录</el-tab-pane>
        <el-tab-pane label="账号登录" name="second">
             <el-form :model="ruleForm2"  :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="账号" prop="user" ref="phone">
                    <el-input  type="text" v-model="ruleForm2.user" auto-complete="off"></el-input>
                  </el-form-item>
                    <el-form-item>
                  <el-button type="primary" :disabled="isdisabledFn" @click="submitForm('number')">{{number}}</el-button>
                  <el-button type="primary" :disabled="isdisabledEmail" @click="submitForm('email')">{{email}}</el-button>
              </el-form-item>
                <el-form-item label="请输入验证码">
                   <el-input type="password" v-model="pwd" auto-complete="off"></el-input>
                </el-form-item>
                   <el-button @click="resetLogin('ruleForm2')">登录</el-button>
              

          
            </el-form>
        </el-tab-pane>
   
  </el-tabs>

</div>
 
</template>

<script>
import store from "../store/index.js";

export default {
  data() {
    return {
      ruleForm2: {
        user: ""
      },
      pwd:'',
      rules2: {
        pass: [{ required: true, message: "请输入验证码" }],

        user: [{ required: true, message: "请输入账号信息" }]
      },
      activeName2: "second",
      number: "手机验证码",
      isdisabledFn: false,
      isdisabledEmail: false,
      code: "1234",
      email:'邮箱验证码'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log("1");
    },
     authCode(type){
          this.$refs.ruleForm2.validate((vaild, rules) => {
          if (vaild) {
            this.axios
              .get("/api/login" + "?user=" + this.ruleForm2.user)
              .then(data => {
                let result = data.data;
                console.log(result);
                if (result.code === "0") {
                  console.log("2");
                } else {
                  let num = 5
                  let timer = setInterval(() => {
                    
                    console.log("3");
                    type =='number'?   (this.number = num-- + "s重新发送", this.isdisabledFn = true):(this.email = num--+ "s重新发送",this.isdisabledEmail = true);
                  
                 
                    if (num == 0) {
                      clearInterval(timer);
                 
                      type =='number'?   (this.number = "重新发送验证码", this.isdisabledFn = false):(this.email = "重新发送验证码",this.isdisabledEmail = false);
                    }
                  }, 1000);
                }
              });
          }
        });
    },
    submitForm(type) {
      if (this.rules2.user.length > 1) {
        this.rules2.user.pop();
      }
      if (type === "number") {
        this.rules2.user.push({
          type,
          validator: (rule, value, callback) => {
            if (/^1[3578]\d{9}$/.test(value)) {
              console.log("2");
              callback();
            } else {
              callback(new Error("请输入正确手机号"));
            }
          },
          message: "请输入正确手机号"
        });
      
      } else {
        this.rules2.user.push({ type, message: "请输入正确邮箱" });
        console.log(this.rules2.user);
      }
      this.authCode(type)
       
    },
   

    resetLogin(forname) {
     
      if (this.pwd === this.code) {
        sessionStorage.setItem('getlogin',1)
        this.$router.push("/");
      } else {
        console.log("错误");
      }
    }
  },

  mounted() {
    //this.getData()
  }
};
</script>


<style>
</style>
