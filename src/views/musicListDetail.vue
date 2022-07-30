<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <img class="avatar" :src="playlist.creator.avatarUrl" alt="" />
          <span class="name">{{ playlist.creator.nickname }}/</span>
          <span class="time">{{ playlist.createTime }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">
            {{ playlist.description }}
          </span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlist-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item, index) in playlist.tracks" :key="item.id" @dblclick="playmusic(item.id)">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                  </div>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total})`" name="2">
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number">( {{ total }} )</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
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
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="page"></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { listDetailAPI, playListCommentAPI } from '@/api/listDetail.js'
export default {
  data() {
    return {
      // 评论条数
      total: 0,
      page: 1,
      limit: 10,
      activeIndex: '1',
      // 歌单详情数据
      playlist: {},
      // 评论
      comments: []
    }
  },
  created() {
    this.getListDetail()
    this.getComment()
  },
  methods: {
    async getListDetail() {
      const res = await listDetailAPI(this.$route.query.q)
      this.playlist = res.data.playlist
      // 转换时间格式
      const unixTimestamp = new Date(this.playlist.createTime)
      this.playlist.createTime = unixTimestamp.toLocaleDateString()
      const arr = this.playlist.tracks
      for (let i = 0; i < arr.length; i++) {
        const duration = arr[i].dt
        // console.log(duration+"我是时间");
        let min = parseInt(duration / 1000 / 60)
        if (min < 10) {
          min = '0' + min
        }
        let sec = parseInt((duration / 1000) % 60)
        if (sec < 10) {
          sec = '0' + sec
        }
        // console.log(min+" "+sec)
        this.playlist.tracks[i].dt = `${min}:${sec}`
      }
    },
    async getComment() {
      const res = await playListCommentAPI({
        id: this.$route.query.q,
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      })
      console.log(res)
      this.total = res.data.total
      this.comments = res.data.comments
      for (let i = 0; i < this.comments.length; i++) {
        const unixTimestamp = new Date(this.comments[i].time)
        this.comments[i].time = unixTimestamp.toLocaleString()
      }
    },
    playmusic(id) {
      this.$store.dispatch('reqmusicUrl', id)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getComment()
    }
  }
}
</script>

<style lang="less" scoped>
.playlist-container {
  margin: auto;
  max-width: 1100px;
  padding-top: 40px;
  .top-wrap {
    display: flex;
    background: linear-gradient(to top, rgba(216, 216, 216), rgb(141, 141, 141));
    // justify-content: space-around;
    padding: 0 100px;
    align-items: center;
    span {
      font-size: 17px;
    }
    .img-wrap {
      font-size: 17px;
      img {
        width: 230px;
        height: 230px;
        border-radius: 5%;
      }
    }
    .info-wrap {
      text-align: center;
      margin-left: 90px;
      .title {
        margin-bottom: 20px;
        font-size: 18px;
      }
      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .name {
          margin-right: 10px;
        }
        .time {
          font-size: 14px;
        }
      }
      .play-wrap {
        width: 120px;
        height: 35px;
        border-radius: 4px;
        background: linear-gradient(to right, #f06d5ccb, #c6483c);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        cursor: pointer;
        span {
          color: #fff;
          span.iconfont {
            margin-right: 8px;
          }
          span.text {
            font-size: 16px;
            margin-right: 6px;
          }
        }
      }
      .tag-wrap {
        display: flex;
        margin-bottom: 15px;
        span {
          margin: 0;
        }
        ul {
          display: flex;
          align-items: center;
        }
        li {
          font-size: 15px;
        }
        li:not(:last-child)::after {
          content: '/';
          margin: 0 4px;
        }
      }
      .desc-wrap span:last-child {
        font-size: 15px;
      }
      span:first-child {
        margin-right: 10px;
      }
    }
  }
  .el-tabs {
    margin-top: 20px;
    /deep/ .el-tabs__item {
      font-size: 18px;
    }
    /deep/ .el-tabs__item.is-active {
      color: #c6483c;
    }
    /deep/ .el-tabs__item:hover {
      color: #c3473a;
    }
    /deep/ .el-tabs__active-bar {
      background: #c6483c;
    }
    tr {
      height: 25px;
    }
    th {
      text-align: start;
    }
  }
  .comment-wrap {
    margin-bottom: 70px;
    .title {
      font-size: 20px;
      .number {
        color: black;
        font-size: 18px;
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
      .date {
        color: #bebebe;
        font-size: 14px;
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
      .content-wrap {
        border-bottom: 1px solid #f2f2f1;
      }
    }
  }
  /deep/ .el-pagination {
    margin-top: 40px;
    text-align: center;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #dd6d60;
  }
}
</style>
