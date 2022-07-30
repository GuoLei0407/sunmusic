import request from '@/untils/request'
// 导出轮播图API
export const bannerAPI = () => {
  return request({
    url: '/banner',
    method: 'get'
  })
}
// 导出推荐歌单API
export const playlistAPI = (params) => {
  return request({
    url: '/personalized',
    method: 'get',
    params
  })
}
// 导出新歌推荐API
export const newsongAPI = () => {
  return request({
    url: '/personalized/newsong',
    method: 'get'
  })
}
// 导出mv推荐API
export const mvAPI = () => {
  return request({
    url: '/personalized/mv',
    method: 'get'
  })
}
