<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: area == '全部' }" @click="area = '全部'"> 全部 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '内地' }" @click="area = '内地'"> 内地 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '港台' }" @click="area = '港台'"> 港台 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '欧美' }" @click="area = '欧美'"> 欧美 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '日本' }" @click="area = '日本'"> 日本 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '韩国' }" @click="area = '韩国'"> 韩国 </span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: type == '全部' }" @click="type = '全部'"> 全部 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '官方版' }" @click="type = '官方版'"> 官方版 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '原声' }" @click="type = '原声'"> 原声 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '现场版' }" @click="type = '现场版'"> 现场版 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '网易出品' }" @click="type = '网易出品'"> 网易出品 </span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: order == '上升最快' }" @click="order = '上升最快'"> 上升最快 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: order == '最热' }" @click="order = '最热'"> 最热 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: order == '最新' }" @click="order = '最新'"> 最新 </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item, index) in mvlist" :key="index">
          <div class="img-wrap">
            <img :src="item.cover" @click="toMV(item.id)" alt="" />
            <div class="num-wrap">
              <div @click="toMV(item.id)" class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="page" :page-size="5" :limit="limit"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { mvsListAPI } from '@/api/mvList.js'
export default {
  data() {
    return {
      total: 20,
      page: 1,
      limit: 8,
      area: '全部',
      type: '全部',
      order: '上升最快',
      mvlist: []
    }
  },
  watch: {
    area() {
      // 返回第一页
      this.page = 1
      this.getMvList()
    },
    type() {
      this.page = 1
      this.getMvList()
    },
    order() {
      this.page = 1
      this.getMvList()
    }
  },
  created() {
    this.getMvList()
  },
  methods: {
    async getMvList() {
      const res = await mvsListAPI({
        area: this.area,
        type: this.type,
        order: this.order,
        // 数量
        limit: this.limit,
        // 偏移值 分页 （页面-1）*数量
        offset: (this.page - 1) * this.limit
      })
      console.log(res)
      this.mvlist = res.data.data
    },
    toMV(id) {
      this.$router.push(`/mv?q=${id}`)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getMvList()
    }
  }
}
</script>

<style lang="less" scoped>
.mvs-container {
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 20px;
  .filter-wrap > div {
    margin-bottom: 30px;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    .title {
      font-size: 14px;
      height: 100%;
      margin: 20px;
      color: gray;
      cursor: pointer;
      padding: 5px 20px;
    }
    .title::before {
      content: '', pos;
    }
    .active {
      color: #dd6d60;
      background-color: #fcf6f5;
      border-radius: 20px;
    }
    ul {
      display: flex;
      li:not(:last-child) {
        // 选择除了最后一个li的所有li
        border-right: 1px solid #f2f2f1;
      }
    }
  }
  .mvs {
    .items {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        width: 250px;
        cursor: pointer;
        margin-right: 25px;
        margin-bottom: 30px;
        .img-wrap {
          width: 100%;
          position: relative;
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
              // 因为icon是生成了一个before伪元素，我们可以通过display:flex 在加上align-items: center使icon水平居中
              font-size: 12px;
              display: flex;
              align-items: center;
              margin-right: 5px;
            }
          }
          .info-wrap {
            .name {
              font-size: 15px;
            }
            .singer {
              font-size: 14px;
              color: #c5c5c5;
            }
          }
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
}
</style>
