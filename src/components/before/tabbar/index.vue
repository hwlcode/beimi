<template>
  <div class="tabbar">
     <tabbar class="fixed-bottom">
      <tabbar-item :link="{name:'bookshelf'}" :selected="relType=='bookshelf'">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_button.png"> -->
        <em class="iconfont" slot="icon">&#xe6f4;</em>
        <em class="iconfont" slot="icon-active">&#xe6f8;</em>
        <span slot="label">书架</span>
      </tabbar-item>
      <tabbar-item :link="{name:'index'}" :selected="relType=='index'">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_msg.png"> -->
        <em class="iconfont" slot="icon">&#xe6f2;</em>
        <em class="iconfont" slot="icon-active">&#xe6f7;</em>
        <span slot="label">精选</span>
      </tabbar-item>
      <tabbar-item :link="{name:'bookcity'}" :selected="relType=='bookcity'">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_article.png"> -->
        <em class="iconfont" slot="icon">&#xe6f6;</em>
        <em class="iconfont" slot="icon-active">&#xe6f5;</em>
        <span slot="label">书城</span>
      </tabbar-item>
      <tabbar-item :link="{name:'my'}" :selected="relType=='my'">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
        <em class="iconfont" slot="icon">&#xe6f9;</em>
        <em class="iconfont" slot="icon-active">&#xe6fd;</em>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>

export default {
  props:{
    type: String
  },
  components: {
    
  },
  data(){
    return{
      relType:''
    }
  },
  created(){
    this.relType=this.$route.name
  }
}
  
</script>
<style lang="less">
  body{
    // padding-bottom: 53px;
  }
  .tabbar{
    .weui-tabbar{
      background-color: #fff;
    }
    em.iconfont{
      height: 26px;
      width: 26px;
      font-size: 21px;
    }
    .fixed-bottom{
      position: fixed;
    }
  }
  
</style>
