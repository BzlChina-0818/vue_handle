<template>
    <div>
        <ul class="list">
            <li>
                <router-link to="sponsor">发起申请</router-link> 
            </li>
            <li>
                 <router-link to="assigned">过户</router-link>
            </li>
          
        </ul>
    </div>
</template>

<script>
export default {
   
}
</script>

<style scoped>
   .list{
       width:100%;
       display:flex;
       flex-wrap:wrap;
   }
   .list li{
        width:30%;
        height:200px;
        background: #ccc;
        margin-right:1%;
   }
</style>
