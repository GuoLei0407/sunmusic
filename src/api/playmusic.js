// 封装请求歌曲播放url的组件
import request from '@/untils/request'
export const playmusicAPI = (id) => {
  return request({
    url: '/song/url',
    method: 'get',
    params: {
      id
    }
  })
}
