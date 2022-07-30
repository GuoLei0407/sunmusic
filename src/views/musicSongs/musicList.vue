<template>
  <div class="List-container">
    <table class="el-table musiclist" stripe>
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lists" :key="item.id" class="el-table__row">
          <td>{{ index + 1 }}</td>
          <td class="img-wrap">
            <img style="width: 70px; height: 70px; border-radius: 5px" :src="item.album.picUrl" />
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap" @click="playmusic(item.id)">
                <span>{{ item.name }}</span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{ item.album.artists['0'].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { musiclistAPI } from '@/api/musiclist.js'
// import { playmusicAPI } from '@/api/playmusic.js'
export default {
  props: {
    tag: {
      type: Number
    }
  },
  watch: {
    tag() {
      this.getDate()
    }
  },
  data() {
    return {
      lists: []
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    async getDate() {
      const res = await musiclistAPI({
        type: this.tag
      })
      console.log(res)
      this.lists = res.data.data.slice(0, 50)
      for (let i = 0; i < this.lists.length; i++) {
        // 获取 总毫秒数
        const duration = this.lists[i].duration
        // 假定 350750 毫秒
        // 秒 350750/1000  350秒
        // 分 350 /60
        // 秒 350 % 60
        let min = parseInt(duration / 1000 / 60)
        if (min < 10) {
          min = '0' + min
        }
        let sec = parseInt((duration / 1000) % 60)
        if (sec < 10) {
          sec = '0' + sec
        }
        // console.log(min + '|' + sec)
        this.lists[i].duration = `${min}:${sec}`
      }
    },
    async playmusic(id) {
      this.$store.dispatch('reqmusicUrl', id)
    }
  }
}
</script>

<style lang="less" scoped>
.musiclist {
  th:nth-child(2) {
    width: 130px;
  }
  th:nth-child(3) {
    width: 300px;
  }
  th:nth-child(4) {
    width: 200px;
  }
  tbody {
    border-bottom: none;
  }
  td {
    border-bottom: none;
    text-align: center;
  }
  td:first-child {
    padding-left: 10px;
  }
  th {
    font-weight: normal;
  }
  .song-wrap {
    cursor: pointer;
  }
}
</style>
