import request from '@/untils/request'
export const musiclistAPI = (params) => {
  return request({
    url: '/top/song',
    method: 'get',
    params
  })
}
