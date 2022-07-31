import axios from 'axios'

const request = axios.create({
  // baseURL: 'https://autumnfish.cn/' // 不让用了
  baseURL: 'https://autumnfish.cn/'
})
export default request
