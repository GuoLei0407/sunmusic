<template>
  <div class="search-container">
    <div class="title-wrap">
      <!-- 标题 -->
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title">找到 {{ count }} 个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in songList" :key="index" class="el-table__row" @dblclick="playmusic(item.id)">
              <td>{{ index + 1 }}</td>
              <div class="song-wrap">
                <span>{{ item.name }}</span>
                <span></span>
              </div>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="item in playList" :key="item.id">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num"> {{ item.playCount }} </span>
              </div>
              <img :src="item.coverImgUrl" style="width: 200px; height: 200px" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="mvitems">
          <div class="item" v-for="item in mvList" :key="item.id" @click="toMv(item.id)">
            <div class="img-wrap">
              <!-- 封面 -->
              <img :src="item.cover" alt="" />
              <div class="num-wrap">
                <div class="iconfont infoicon icon-play"></div>
                <!-- 播放次数 -->
                <div class="num">{{ item.playCount }}</div>
              </div>
              <!-- 持续时间 -->
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <!-- mv名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { musicSearchAPI } from '../api/musicsearch.js'
export default {
  data() {
    return {
      activeIndex: 'songs',
      count: 0,
      songList: [],
      playList: [],
      mvList: []
    }
  },
  created() {
    this.getSearchSongs()
    this.getSearchPlayLists()
    this.getSearchMvs()
  },
  methods: {
    // 获取歌曲搜索结果
    async getSearchSongs() {
      const res = await musicSearchAPI({
        keywords: this.$route.query.q,
        type: 1, // type:1 是请求歌曲
        limit: 20
      })
      // console.log(res)
      this.songList = res.data.result.songs
      for (let i = 0; i < this.songList.length; i++) {
        let min = parseInt(this.songList[i].dt / 1000 / 60)
        let sec = parseInt((this.songList[i].dt / 1000) % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        // console.log(min + '|' + sec)
        this.songList[i].dt = min + ':' + sec
      }
      // 保存总数
      this.count = res.data.result.songCount
    },
    // 播放音乐
    playmusic(id) {
      this.$store.dispatch('reqmusicUrl', id)
    },
    // 获取歌单搜索结果
    async getSearchPlayLists() {
      const res = await musicSearchAPI({
        keywords: this.$route.query.q,
        type: 1000, // type:1 是请求歌曲
        limit: 10
      })
      this.playList = res.data.result.playlists
    },
    // 获取mv搜索结果
    async getSearchMvs() {
      const res = await musicSearchAPI({
        keywords: this.$route.query.q,
        type: 1004,
        limit: 10
      })
      console.log(res)
      this.mvList = res.data.result.mvs
      for (let i = 0; i < this.mvList.length; i++) {
        // 时间
        let min = parseInt(this.mvList[i].duration / 1000 / 60)
        let sec = parseInt((this.mvList[i].duration / 1000) % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        this.mvList[i].duration = min + ':' + sec

        // 播放次数
        if (this.mvList[i].playCount > 100000) {
          this.mvList[i].playCount = parseInt(this.mvList[i].playCount / 10000) + '万'
        }
      }
    },
    // 跳转到Mv页面
    toMv(id) {
      this.$router.push(`/mv?q=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  max-width: 1100px;
  margin: 0 auto;
  .title-wrap {
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;
    .title {
      margin-right: 10px;
    }
    .sub-title {
      font-size: 15px;
      color: #bebebe;
    }
  }
  /deep/ .el-tabs__item {
    font-size: 18px;
  }
  /deep/ .el-tabs__item.is-active {
    color: #c3473a;
  }
  /deep/ .el-tabs__item:hover {
    color: #c3473a;
  }
  /deep/ .el-tabs__active-bar {
    background: #c3473a;
  }
  td {
    border-bottom: none;
    // text-align: center;
  }
  th {
    text-align: start;
  }
  tr {
    height: 30px;
  }
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
  .mvitems {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 250px;
      margin: 0px 10px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        border-radius: 5px;
      }
      .num-wrap {
        position: absolute;
        display: flex;
        color: #fff;
        right: 5px;
        top: 5px;
        -webkit-box-align: center; // 使播放量和icon水平对齐;
        .icon-play {
          display: flex;
          align-items: center;
          margin-right: 5px;
        }
        .num {
          height: 100%;
        }
      }
      .time {
        position: absolute;
        bottom: 70px;
        right: 5px;
        color: white;
        font-size: 15px;
      }
      .name {
        font-size: 15px;
      }
      .singer {
        font-size: 14px;
        color: #c7c7c7;
      }
    }
  }
}
</style>
