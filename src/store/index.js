import Vue from 'vue'
import Vuex from 'vuex'
import { playmusicAPI } from '@/api/playmusic.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 播放器的音源地址
    musicUrl: 'http://m801.music.126.net/20220724101528/82165f8c05962b1117cfe738e00b5f9e/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/9487349420/7d6d/e55d/bdf0/b2ea48975a60f15a4a3c77676870ea6b.mp3'
  },
  getters: {
  },
  mutations: {
    setmusicUrl(state, url) {
      state.musicUrl = url
    }
  },
  actions: {
    async reqmusicUrl(context, id) {
      // 因为很多组件中都需要播放音乐，所以直接将请求封装成actions的方法，各组件直接调用该方法就行了
      const res = await playmusicAPI(id)
      const url = res.data.data[0].url
      context.commit('setmusicUrl', url)
    }
  },
  modules: {
  }
})
