<template>
    <div class="con">
       <div class="left">
            <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
       </div>
       <div class="right">
            <router-view></router-view>
       </div>
     
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
 export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        Alist:['1','2']
      };
    },
    computed:{
      ...mapState(['list'])
    },
    methods: {
      ...mapActions(["fetchList"]),
      handleNodeClick(data) {
          console.log(data)
          let path = this.$router.history.current.path
          if(!data.children){
              if(path==="/homePage/business"){
                    this.$router.push("business/"+data.type)
              }else{
                    this.$router.push(data.type)
              }
             
               console.log(this.$router)
          }
       
      }
    },
    mounted(){
        this.fetchList()
      
    }
  };
</script>

<style>
.con{
    width:100%;
    display: flex;
}
 .left{
     width:200px;
 }
 .right{
     flex:1
 }
</style>
