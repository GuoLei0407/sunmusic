<template>
  <div class="top-container">
    <div class="left-box">
      <span class="iconfont el-icon-sunrise"></span>
      <span class="iconfont el-icon-sunrise-1"></span>
      <span class="iconfont el-icon-sunset"></span>
    </div>
    <!-- 中心标题区域 -->
    <div class="logo">
      <a>网易云音乐</a>
    </div>
    <!-- 搜索框 -->
    <div class="right-box">
      <el-input placeholder="找找想听的歌吧" @change="toSearch" prefix-icon="el-icon-search" v-model="inputValue"> </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    toSearch() {
      // 非空判断
      if (this.inputValue === '') {
        // 提示用户
        this.$message.warning('请输入内容')
      } else {
        // 去搜索页 携带数据
        this.$router.push('/search?q=' + this.inputValue)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top-container {
  height: 60px;
  display: flex;
  padding: 0 20px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9f9;
  .left-box {
    display: flex;
    .iconfont {
      // 鼠标进过会有变成小手的形状
      cursor: pointer;
      font-size: 30px;
      margin-top: 5px;
      margin-left: 20px;
    }
  }
  .logo {
    a {
      font-size: 30px;
      line-height: 40px;
      color: #333;
    }
  }
}
</style>
