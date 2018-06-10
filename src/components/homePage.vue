<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">北京电信通</span>
      </div>
    
    </el-col>
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside > 
        <!--展开折叠开关-->
        <!-- <div class="menu-toggle">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div> -->
        <!--导航菜单-->
        <el-menu :default-active="defaultActiveIndex"  @select="handleSelect">
          <template  v-for="(item,index) in menu" >
              
            <el-submenu :index="index+'1'" >
              <template slot="title">
                <span slot="title">{{item.tit}}</span>
              </template>
               <el-menu-item v-for ="(v,ind) in item.submenu" :key="ind" :index ="index+1+'-'+ind"
                  >
              
                <router-link :to={name:v.type}>
                 <span>{{v.cidmenu}}</span>
                </router-link>
               
              </el-menu-item>
            </el-submenu>
          
          
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  
  </el-row>
  
</template>

<script>
 import  {mapState,mapActions} from 'vuex'
export default {
  data() {
      return {
        defaultActiveIndex: "0",
        nickname: '',
        collapsed: false
    };

  },
  computed:{
         ...mapState(['menu'])
  },

  methods: {
      handleSelect(index){
        this.defaultActiveIndex = index+1;
      }, 
      ...mapActions(['fetchMenu'])
     

   
   
  },
  mounted(){
     this.fetchMenu()
   
  }
};
</script>

<style>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.topbar-wrap {
  height: 50px;
  line-height: 50px;
  background: #373d41;
  padding: 0px;
}
.main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
      
  }
   aside{
     width: 250px;
      background: #333744;
   }
   .content-container{
     flex:1;
     overflow-y: scroll;
   }
</style>
