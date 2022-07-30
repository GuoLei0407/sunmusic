import axios from 'axios'

const request = axios.create({
  // baseURL: 'https://autumnfish.cn/' // 不让用了
  baseURL: 'http://localhost:3000/'
})
export default request
