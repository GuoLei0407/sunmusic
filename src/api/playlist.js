import request from '@/untils/request'

export const topListAPI = (params) => {
  return request({
    url: '/top/playlist/highquality',
    method: 'get',
    params
  })
}
export const playListAPI = (params) => {
  return request({
    url: '/top/playlist/',
    method: 'get',
    params
  })
}
