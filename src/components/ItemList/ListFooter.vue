<template>
  <div v-if="isLoadAll">
    <p class="bottomText" :style="{display:null}">-- 我是有底线的 --</p>
    <div class="ant-back-top" style="right: 40px; bottom: 40px;" @click="backTop" v-if="showBackStatus">
      <div class="ant-back-top-content">
        <i class="anticon anticon-to-top ant-back-top-icon"></i>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="listButtonFix">
      <el-button class="listButton" :loading="loading" @onclick="onLoadMoreClick">
        {{info}}
      </el-button>
    </div>
    <div class="ant-back-top" style="right: 40px; bottom: 40px;" @click="backTop" v-if="showBackStatus">
      <div class="ant-back-top-content">
        <i class="anticon anticon-to-top ant-back-top-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {showBack, animate} from '../../utils/mUtils'
export default {
  name: 'listFooter',
  props: ['isLoadAll', 'loading', 'onLoadMoreClick'],
  data () {
    return {
      //  显示返回顶部按钮
      showBackStatus: false
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    info () {
      let info = '点击加载更多'
      if (this.loading) {
        info = '正在加载中...'
      }
      return info
    }
  },
  methods: {
    async initData () {
      //  开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
      showBack(status => {
        this.showBackStatus = status
      })
    },
    //  返回顶部
    backTop () {
      animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../vars.less";

.bottomText{
  margin-top: 10px;
  text-align: center;
  font-size: @fontSizeSmall;
  color: @colorInfo;
}

.listButton {
  width: 100%;
  &:hover{
    color:#607D8B;
    border-color:#607D8B;
  }
}

.listButtonFix {
  margin: 60px 0 10px 0;
  &:hover{
    color:#607D8B;
    border-color:#607D8B;
  }
  button:hover{
    color:#607D8B;
    border-color:#607D8B;
  }
}
.ant-back-top {
  z-index: 10;
  position: fixed;
  right: 100px;
  bottom: 50px;
  height: 40px;
  width: 40px;
  cursor: pointer;
}
.ant-back-top-content {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: rgba(64,64,64,.4);
  color: #fff;
  text-align: center;
}
.ant-back-top-icon {
  font-size: 20px;
  margin-top: 10px;
}
.anticon {
  display: inline-block;
  font-style: normal;
  vertical-align: baseline;
  text-align: center;
  text-transform: none;
  line-height: 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.anticon-to-top:before {
  content: "\21E7";
}
.anticon:before {
  display: block;
  font-family: anticon!important;
}
</style>
