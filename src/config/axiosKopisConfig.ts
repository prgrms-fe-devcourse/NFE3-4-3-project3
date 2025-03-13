import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser()

const KopisApi = axios.create({
  baseURL: 'http://www.kopis.or.kr/openApi/restful',
  timeout: 4000,
  headers: {
    Accept: 'application/xml',
  },
})

KopisApi.interceptors.response.use(
  function (response) {
    const object = parser.parse(response.data)
    response.data = object
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default KopisApi
