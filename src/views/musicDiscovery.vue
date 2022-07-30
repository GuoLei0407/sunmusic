<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel height="230px" :interval="3000" type="card">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">热门推荐</h3>
      <div class="items">
        <div class="item" v-for="item in playlist" :key="item.id" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" />
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="newsong">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="item in newsonglist" :key="item.id">
          <div class="img-wrap">
            <img style="width: 80px; height: 80px" :src="item.picUrl" />
          </div>
          <div class="song-wrap">
            <div class="song-name" @click="playMusic(item.id)">{{ item.name }}</div>
            <div class="singer">
              {{ item.song.album.artists[0].name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐mv -->
    <div class="mvs">
      <h3 class="title">推荐mv</h3>
      <div class="items">
        <div class="item" v-for="item in mvlist" :key="item.id" @click="toMv(item.id)">
          <div class="img-wrap" style="width: 100%">
            <img style="width: 100%; border-radius: 5px" :src="item.picUrl" />
          </div>
          <!-- 右上角播放量 -->
          <div class="num-wrap">
            <div class="iconfont icon-play"></div>
            <div class="num">{{ item.playCount }}</div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bannerAPI, playlistAPI, newsongAPI, mvAPI } from '../api/discovery.js'
// import { playmusicAPI } from '../api/playmusic.js'
export default {
  data() {
    return {
      banners: [],
      playlist: [],
      newsonglist: [],
      mvlist: []
    }
  },
  async created() {
    // 请求轮播图
    const res1 = await bannerAPI()
    this.banners = res1.data.banners
    // 请求推荐歌单
    const res2 = await playlistAPI({
      limit: 10
    })
    console.log(res2)
    this.playlist = res2.data.result
    // 请求新歌推荐
    const res3 = await newsongAPI()
    this.newsonglist = res3.data.result
    // 请求mv推荐
    const res4 = await mvAPI()
    console.log(res4)
    this.mvlist = res4.data.result
  },
  methods: {
    toPlaylist(id) {
      this.$router.push(`/listDetail?q=${id}`)
    },
    async playMusic(id) {
      this.$store.dispatch('reqmusicUrl', id)
    },
    toMv(id) {
      this.$router.push(`/mv?q=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.discovery-container {
  max-width: 1100px;
  margin: 0 auto;
  .el-carousel__item {
    img {
      width: 100%;
      height: 100%;
      padding-left: 8px;
    }
  }
  .recommend {
    margin-top: 40px;
    margin-bottom: 40px;
    .title {
      font-weight: normal;
      margin-bottom: 20px;
      padding-left: 10px;
    }
    .items {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 200px;
        margin: 10px;
        overflow: hidden;
        img {
          width: 200px;
          height: 200px;
          border-radius: 5px;
        }
        .desc-wrap {
          span {
            font-size: 14px;
          }
        }
      }
      .item:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    }
  }
  .newsong {
    margin-top: 40px;
    margin-bottom: 40px;
    .title {
      font-weight: normal;
      margin-bottom: 20px;
      padding-left: 10px;
    }
    .items {
      display: flex;
      height: 500px;
      flex-wrap: wrap;
      flex-direction: column;
      padding-left: 10px;
      .item {
        height: 100px;
        width: 50%;
        display: flex;
        align-items: center;
        cursor: pointer;
        .img-wrap {
          margin-right: 15px;
        }
        .song-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
          padding: 10px;
          font-size: 16px;
          .singer {
            font-size: 14px;
            color: grey;
          }
        }
      }
      .item:hover {
        background-color: #f5f5f5;
      }
    }
  }
  .mvs {
    margin-top: 40px;
    margin-bottom: 40px;
    .title {
      font-weight: normal;
      margin-bottom: 20px;
      padding-left: 10px;
    }
    .items {
      display: flex;
      justify-content: space-around;
      .item {
        width: 250px;
        cursor: pointer;
        position: relative;
        .num-wrap {
          position: absolute;
          color: #dd6d60;
          top: 2px;
          right: 5px;
          display: flex;
          align-content: center;
          .iconfont {
            margin-right: 5px;
            font-size: 15px;
          }
          .info-wrap {
            .name {
              font-size: 15px;
              margin-bottom: 5px;
            }
            .singer {
              font-size: 14px;
              color: #c5c5c5;
            }
          }
        }
      }
    }
  }
}
</style>
