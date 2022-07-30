import request from '@/untils/request'
// mv的请求API
export const getMvAPI = (params) => {
  return request({
    url: 'mv/url',
    method: 'get',
    params
  })
}
// 推荐相关MV接口
export const recommendMvAPI = (params) => {
  return request({
    url: '/simi/mv',
    method: 'get',
    params
  })
}
// 获取mv信息
export const getMvDetailAPI = (params) => {
  return request({
    url: '/mv/detail',
    method: 'get',
    params
  })
}
// 获取mv评论
export const getCommentAPI = (params) => {
  return request({
    url: '/comment/mv',
    method: 'get',
    params
  })
}
// 获取歌手信息
export const getArtistsAPI = (id) => {
  return request({
    url: '/artists',
    method: 'get',
    params: {
      id: id
    }
  })
}
