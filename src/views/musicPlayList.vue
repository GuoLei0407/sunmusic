<template>
  <div class="playlists-container">
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img style="width: 160px; height: 160px" :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">
          {{ topList.name }}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
      <!-- 背景 -->
      <img :src="topList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" :class="{ active: tag == '全部' }" @click="tag = '全部'"> 全部 </span>
        <span class="item" :class="{ active: tag == '欧美' }" @click="tag = '欧美'"> 欧美 </span>
        <span class="item" :class="{ active: tag == '华语' }" @click="tag = '华语'"> 华语 </span>
        <span class="item" :class="{ active: tag == '流行' }" @click="tag = '流行'"> 流行 </span>
        <span class="item" :class="{ active: tag == '说唱' }" @click="tag = '说唱'"> 说唱 </span>
        <span class="item" :class="{ active: tag == '摇滚' }" @click="tag = '摇滚'"> 摇滚 </span>
        <span class="item" :class="{ active: tag == '民谣' }" @click="tag = '民谣'"> 民谣 </span>
        <span class="item" :class="{ active: tag == '电子' }" @click="tag = '电子'"> 电子 </span>
        <span class="item" :class="{ active: tag == '轻音乐' }" @click="tag = '轻音乐'"> 轻音乐 </span>
        <span class="item" :class="{ active: tag == '影视原声' }" @click="tag = '影视原声'"> 影视原声 </span>
        <span class="item" :class="{ active: tag == 'ACG' }" @click="tag = 'ACG'"> ACG </span>
        <span class="item" :class="{ active: tag == '怀旧' }" @click="tag = '怀旧'"> 怀旧 </span>
        <span class="item" :class="{ active: tag == '治愈' }" @click="tag = '治愈'"> 治愈 </span>
        <span class="item" :class="{ active: tag == '旅行' }" @click="tag = '旅行'"> 旅行 </span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="item in playlist" :key="item.id" @click="toplaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img style="width: 200px; height: 200px" :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 当current-page发生变化时 @current-change触发 -->
    <el-pagination background @current-change="handleCurrent" layout="prev, pager, next" :page-size="10" :current-page="page" :total="total"> </el-pagination>
  </div>
</template>

<script>
import { topListAPI, playListAPI } from '../api/playlist.js'
export default {
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 顶部推荐歌单
      topList: {},
      // 歌单列表
      playlist: [],
      // 当前分类
      tag: '全部'
    }
  },
  created() {
    // 顶部精品歌单请求
    this.topData()
    // 详细歌单请求
    this.playData()
  },
  watch: {
    tag() {
      // 用watch来监听数据tag,当数据发生变化时（也就是点击分类的时候），就会重新触发请求，重绘页面
      this.topData()
      this.playData()
      this.page = 1
    }
  },
  methods: {
    async topData() {
      const res = await topListAPI({
        limit: 1,
        cat: this.tag
      })
      this.topList = res.data.playlists[0]
    },
    async playData() {
      const res = await playListAPI({
        limit: 10,
        // 起始的值 （页码-1）*每页多少条数据
        offset: (this.page - 1) * 10,
        // 分类数据
        cat: this.tag
      })
      console.log(res)
      // 保存总条数
      this.total = res.data.total
      this.playlist = res.data.playlists
    },
    handleCurrent(val) {
      // val是@current-change触发时，自动的回调参数，表示当前页
      this.page = val
      this.playData()
    },
    toplaylist(id) {
      this.$router.push(`/listDetail?q=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.playlists-container {
  max-width: 1100px;
  margin: 0 auto;
  .top-card {
    padding: 20px;
    height: 200px;
    display: flex;
    overflow: hidden;
    border-radius: 5px;
    position: relative;
    .icon-wrap {
      margin-right: 20px;
      z-index: 1;
    }
    .content-wrap {
      z-index: 1;
      .tag {
        color: #dfac67;
        border: 1px solid #dfac67;
        width: 100px;
        height: 30px;
        text-align: center;
        border-radius: 5px;
        font-size: 16px;
        line-height: 30px;
        cursor: pointer;
      }
      .title {
        color: #fff;
        padding-top: 10px;
      }
      .info {
        color: #888482;
        font-size: 14px;
        padding-top: 5px;
        overflow: hidden;
        // text-overflow: ellipsis; // 无法满足多行文本溢出
        // 这里我们将盒子改为-webkit-box然后
        // 调用下面两个属性实现多行溢出省略
        display: -webkit-box;
        -webkit-line-clamp: 5; // 控制显示的行数
        -webkit-box-orient: vertical;
      }
    }
    .bg {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      filter: blur(20px);
    }
    .bg-mask {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .tab-container {
    padding-top: 30px;
    .tab-bar {
      display: flex;
      justify-content: flex-end;
      .item {
        font-size: 15px;
        color: gray;
        margin-right: 20px;
        cursor: pointer;
      }
      .item.active {
        color: #dd6d60;
      }
    }
    .tab-content {
      margin-top: 20px;
      .items {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 200px;
          margin: 10px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          img {
            border-radius: 5px;
          }
          .num-wrap {
            position: absolute;
            top: -30px; // 先将top设为-30，这样就看不到了，然后再给item添加hover，当鼠标放在上面时top变为0这样又出来了
            right: 0;
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 5px;
            color: #fff;
            background: rgba(0, 0, 0, 0.5);
          }
          .icon-play {
            position: absolute;
            right: 15px;
            bottom: 60px;
            font-size: 40px;
            border-radius: 50%;
            color: #dd6d60;
            display: none;
          }
          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-size: 14px;
          }
        }
        .item:hover {
          background-color: #f5f5f5;
          .num-wrap {
            top: 0;
          }
          .icon-play {
            display: block;
          }
        }
      }
    }
  }
  .el-pagination {
    margin-top: 50px;
    text-align: center;
    .el-pager li:not(.disabled).active {
      background-color: #dd6d60;
    }
  }
}
</style>
