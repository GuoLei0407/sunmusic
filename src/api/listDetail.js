import request from '@/untils/request'

export const listDetailAPI = (id) => {
  return request({
    url: 'playlist/detail',
    method: 'get',
    params: {
      id: id
    }
  })
}

export const playListCommentAPI = (params) => {
  return request({
    url: '/comment/playlist',
    method: 'get',
    params
  })
}
