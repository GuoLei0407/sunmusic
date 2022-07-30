import request from '@/untils/request'
export const mvsListAPI = (params) => {
  return request({
    url: '/mv/all',
    method: 'get',
    params
  })
}
