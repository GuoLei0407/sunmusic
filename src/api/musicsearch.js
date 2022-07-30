import request from '@/untils/request'

export const musicSearchAPI = (query) => {
  return request({
    url: '/cloudsearch',
    method: 'get',
    params: query
  })
}
