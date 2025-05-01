import axios from 'axios'

const axiosBase = axios.create({
  baseURL: 'http://localhost:5300/api',
})

export default axiosBase
