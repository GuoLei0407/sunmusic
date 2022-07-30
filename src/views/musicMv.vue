<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">MV详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video autoplay controls :src="mvurl"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="singerPic" />
          </div>
          <span class="name"> {{ mvinfo.artistName }} </span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvinfo.name }}</h2>
          <span class="date">发布： {{ mvinfo.publishTime }} </span>
          <span class="number">播放： {{ mvinfo.playCount }} 次</span>
          <p class="desc">{{ mvinfo.desc }}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap" v-if="hotComments != undefined">
        <p class="title">
          精彩评论<span class="number">{{ hotTotal }}</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in hotComments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <!-- 评论回复 -->
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}:</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="item in comments" :key="item.id">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <!-- 评论回复 -->
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="page" :page-size="5" :limit="limit"> </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="item in recommendMv" :key="item.id" @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" />
              <!-- <span class="iconfont icon-play"></span> -->
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvAPI, getMvDetailAPI, getArtistsAPI, getCommentAPI, recommendMvAPI } from '@/api/musicMv.js'
export default {
  data() {
    return {
      total: 20,
      page: 1,
      limit: 10,
      mvurl: '',
      mvinfo: {},
      singerPic: '',
      // 推荐Mv
      recommendMv: [],
      // 热门评论
      hotComments: [],
      hotTotal: 0,
      // 普通评论数
      comments: [],
      comTotal: 0
    }
  },
  created() {
    this.getMvUrl()
    this.getMvDetail()
    // this.getArtists() 不能在这里直接调用，这个方法需要mvinfo信息，但是请求是异步的，getArtists()发起时 getMvDetail()还没到请求到mvinfo的信息，所以getArtists()会报参数错误
    this.getComment()
    this.getrecommendMv()
  },
  methods: {
    // 获取MV播放源
    async getMvUrl() {
      const res = await getMvAPI({
        id: this.$route.query.q
      })
      this.mvurl = res.data.data.url
    },
    // 获取MV信息
    async getMvDetail() {
      await getMvDetailAPI({
        mvid: this.$route.query.q
      }).then((res) => {
        this.mvinfo = res.data.data
        this.getArtists()
      })
    },
    // 获取歌手信息图片
    async getArtists() {
      console.log(this.mvinfo.artistId)
      const res = await getArtistsAPI(this.mvinfo.artistId)
      // console.log(res)
      this.singerPic = res.data.artist.picUrl
    },
    // 获取评论信息
    async getComment() {
      const res = await getCommentAPI({
        id: this.$route.query.q,
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      })
      // console.log(res)
      this.comments = res.data.comments
      this.hotComments = res.data.hotComments
      this.total = res.data.total
      this.hotTotal = res.data.total
      // 格式化热评时间
      for (let i = 0; i < this.hotComments.length; i++) {
        const unixTimestamp = new Date(this.hotComments[i].time)
        this.hotComments[i].time = unixTimestamp.toLocaleDateString()
      }
      // 格式化最新评论时间
      for (let i = 0; i < this.comments.length; i++) {
        const unixTimestamp = new Date(this.comments[i].time)
        this.comments[i].time = unixTimestamp.toLocaleDateString()
      }
    },
    async getrecommendMv() {
      const res = await recommendMvAPI({
        mvid: this.$route.query.q
      })
      console.log(res)
      this.recommendMv = res.data.mvs
      // 转化一下时间和播放了的格式
      for (let i = 0; i < this.recommendMv.length; i++) {
        // 如果播放量过万就转化为x万的格式
        if (this.recommendMv[i].playCount > 100000) {
          this.recommendMv[i].playCount = parseInt(this.recommendMv[i].playCount / 100000) + '万'
        }
        const duration = this.recommendMv[i].duration
        let min = parseInt(duration / 1000 / 60)
        if (min < 10) {
          min = '0' + min
        }
        let sec = parseInt((duration / 1000) % 60)
        if (sec < 10) {
          sec = '0' + sec
        }
        this.recommendMv[i].duration = `${min}:${sec}`
      }
    },
    handleCurrentChange(val) {
      this.page = val
      this.getComment()
    },
    toMv(id) {
      // 问题：如果只写跳转回出现一个bug，控制台报 NavigationDuplicated: Avoided redundant navigation to current location
      // 然后无法跳转，我们要手动刷新才行
      // 分析：vue为了避免冗余导航到当前位置，就是在本页面导航到本页面的情况
      this.$router.push(`/mv?q=${id}`)
      // 解决方法：通过go(0)的方法，进行自动刷新页面 (暂时的方法还没有想出更好的思路)
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.mv-container {
  display: flex;
  width: 1100px;
  margin: 0 auto;
  .title {
    margin-bottom: 20px;
  }
  .mv-wrap {
    width: 700px;
    margin-right: 35px;
    position: relative;
    .date {
      margin-right: 25px;
    }
    .date,
    .number {
      color: #bebebe;
      font-size: 14px;
    }
    .video-wrap {
      width: 100%;
      height: 390px;
      margin-bottom: 20px;
      video {
        border-radius: 5px;
        height: 100%;
        width: 100%;
        outline: none;
      }
    }
    .info-wrap {
      margin-bottom: 50px;
      .singer-info {
        display: flex;
        align-items: center;
        margin-bottom: 35px;
        .avatar-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-right: 10px;
          overflow: hidden;
          img {
            height: 100%;
          }
        }
      }
      .mv-info {
        .title {
          font-size: 30px;
        }
        .desc {
          font-size: 15px;
          margin-top: 20px;
        }
      }
    }
    .comment-wrap {
      margin-bottom: 90px;
      .title {
        font-size: 25px;
        .number {
          color: #000;
          font-size: 20px;
        }
      }
      .item {
        display: flex;
        padding-top: 20px;
        .icon-wrap {
          margin-right: 15px;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .content-wrap {
          padding-bottom: 20px;
          flex: 1;
          .name {
            color: #517eaf;
            font-size: 14px;
          }
          .comment {
            font-size: 14px;
          }
          .content {
            margin-bottom: 10px;
          }
          .re-content {
            margin-bottom: 10px;
            background-color: #e6e5e6;
            border-radius: 5px;
          }
        }
      }
      .item:not(:last-child) {
        .comment-wrap {
          border-bottom: 1px solid #f2f2f1;
        }
      }
    }
    /deep/ .el-pagination {
      position: absolute;
      bottom: 40px;
      left: 137px;
      .el-pager li:not(.disabled).active {
        background-color: #dd6d60;
      }
    }
  }
  .mv-recommend {
    flex: 1;
    .mvs {
      .items {
        display: flex;
        flex-wrap: wrap;
        .item {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px;
          .img-wrap {
            width: 180px;
            position: relative;
            margin-right: 10px;
            img {
              width: 100%;
              border-radius: 5px;
            }
            .num-wrap {
              position: absolute;
              color: white;
              top: 0;
              right: 0;
              display: flex;
              align-content: center;
              font-size: 15px;
              padding-right: 5px;
              padding-top: 2px;
              .icon-play {
                font-size: 12px;
                display: flex;
                align-items: center;
                margin-right: 5px;
              }
            }
            .time {
              position: absolute;
              bottom: 5px;
              right: 5px;
              color: #fff;
              font-size: 15px;
            }
          }
          .info-wrap {
            flex: 1;
            height: 100%;
            padding-top: 12px;
            .name {
              font-size: 15px;
            }
            .singer {
              font-size: 14px;
              color: #c5c5c5;
              margin-top: 25px;
            }
          }
        }
        .item:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
}
</style>
