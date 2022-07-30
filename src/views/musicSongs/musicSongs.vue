<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{ active: tag == item.tag }" v-for="(item, index) in tablist" @click="show(item.tag)" :key="index">{{ item.name }}</span>
    </div>
    <music-list :tag="tag"></music-list>
  </div>
</template>

<script>
import musicList from './musicList.vue'
export default {
  data() {
    return {
      tag: 0,
      tablist: [
        {
          name: '全部',
          tag: 0
        },
        {
          name: '华语',
          tag: 7
        },
        {
          name: '欧美',
          tag: 96
        },
        {
          name: '日本',
          tag: 8
        },
        {
          name: '韩国',
          tag: 16
        }
      ]
    }
  },
  components: {
    musicList
  },
  methods: {
    show(tag) {
      this.tag = tag
    }
  }
}
</script>

<style lang="less" scoped>
.songs-container {
  .tab-bar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 40px;
    .item {
      margin-right: 20px;
      color: gray;
      font-size: 15px;
      cursor: pointer;
    }
    .active {
      color: #dd6d60;
    }
  }
}
</style>
