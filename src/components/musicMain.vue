<template>
  <div class="main-container">
    <!-- 导航栏 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-headphones"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlist">
            <span class="iconfont icon-list2"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            新歌速递
          </router-link>
        </li>
        <li>
          <router-link to="/mvsList">
            <span class="iconfont icon-play"></span>
            MV精选
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 主体显示区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <!-- autoplay 自动播放 -->
      <audio :src="$store.state.musicUrl" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'musicMain',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  height: 100%;
  padding-bottom: 60px;
  .nav {
    background-color: #ededed;
    width: 200px;
    height: 100%;
    li {
      height: 60px;
      cursor: pointer;
      display: flex;
      align-items: center;
      a {
        .iconfont {
          margin-right: 10px;
          font-size: 20px;
        }
        color: black;
        padding-left: 30px;
        font-size: 18px;
        line-height: 60px;
        width: 100%;
        height: 100%;
      }
      a.router-link-active {
        color: #dd6d60;
        .iconfont {
          color: #dd6d60;
        }
      }
    }
    li:hover {
      background-color: #e7e7e7;
    }
  }
  .main {
    flex: 1;
    overflow-y: auto;
    padding: 10px 20px;
  }
  .player {
    background: #f1f3f4;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    audio {
      width: 100%;
      outline: none;
      border-radius: none;
    }
  }
}
</style>
