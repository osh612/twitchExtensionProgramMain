import axios from 'axios'
import { LiveAPI, TestAPI } from '@/api/socket/config.js'
import twitchTokenStorage from '../../storage/twitch-token-storage'
import apiTokenStorage from '../../storage/api-token-storage'
// import { API } from '../../Pages/config';

const baseUrl =
  window.location.hostname.includes('twitch.tv') === true ? LiveAPI : TestAPI
// const baseUrl = LiveAPI
// const baseUrl = TestAPI

export class ApiError {
  constructor(status, message = 'SomeThing Wrong') {
    this.status = status
    this.message = message
  }
}

export const axiosPost = axios.create({
  baseURL: `${baseUrl}`,
  method: 'POST',
  // headers: { 'content-type': 'application/json', accept: 'application/json' },
  timeout: 20000,
})

export const axiosPatch = axios.create({
  baseURL: `${baseUrl}`,
  method: 'PATCH',
  // headers: { 'content-type': 'application/json', accept: 'application/json' },
  timeout: 20000,
})

export const axiosPut = axios.create({
  baseURL: `${baseUrl}`,
  method: 'PUT',
  // headers: { 'content-type': 'application/json', accept: 'application/json' },
  timeout: 20000,
})

export const axiosDelete = axios.create({
  baseURL: `${baseUrl}`,
  method: 'DELETE',
  // headers: { 'content-type': 'application/json', accept: 'application/json' },
  timeout: 20000,
})

export const axiosGet = axios.create({
  baseURL: `${baseUrl}`,
  method: 'GET',
  // paramsSerializer: (params) => {
  //   return qs.stringify(params, { arrayFormat: 'repeat' });
  // },
  timeout: 5000,
})

const handlePostRequest = config => {
  const _config = addUserData(config)
  return _config
}
const handleGetReqeust = config => {
  const _config = addHeader(config)
  return _config
}

const addUserData = config => {
  const user = twitchTokenStorage.get()
  if (user) {
    // const { token } = JSON.parse(user)
    const token = apiTokenStorage.get()
    const _config = Object.assign(Object.assign({}, config), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return _config
  }
  throw new Error('user data is none.')
}

const addHeader = config => {
  const user = twitchTokenStorage.get()
  if (user) {
    // const { token } = JSON.parse(user)
    const token = apiTokenStorage.get()
    const _config = Object.assign(Object.assign({}, config), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return _config
  }
  throw new Error('user data is none.')
}

const handleError = error => {
  return Promise.reject(error)
}

// // // 요청 인터셉터
axiosPost.interceptors.request.use(handlePostRequest)
axiosGet.interceptors.request.use(handleGetReqeust)
axiosPut.interceptors.request.use(handleGetReqeust)
axiosDelete.interceptors.request.use(handleGetReqeust)
axiosPatch.interceptors.request.use(handleGetReqeust)

// 응답 인터셉터
axiosPost.interceptors.response.use(res => {
  // http 기본응답
  if (res.status > 299 || res.status < 200) {
    console.error('서버에 호출이 들어가지 않았습니다. url을 확인하세요')
  }
  // 서버에서 호출하는 응답 schema
  if (
    Number(res.data.status.status_code) > 299 ||
    Number(res.data.status.status_code) < 200
  ) {
    const { status, message } = res.data
    const error = new ApiError(status, message)
    return Promise.reject(error)
  }
  return res
}, handleError)

// 응답 인터셉터
axiosGet.interceptors.response.use(res => {
  // http 기본응답
  if (res.status > 299 || res.status < 200) {
    console.error('서버에 호출이 들어가지 않았습니다. url을 확인하세요')
  }
  // 서버에서 호출하는 응답 schema
  if (
    Number(res.data.status.status_code) > 299 ||
    Number(res.data.status.status_code) < 200
  ) {
    const { status, message } = res.data
    const error = new ApiError(status, message)
    return Promise.reject(error)
  }
  return res
}, handleError)

// 응답 인터셉터
axiosPut.interceptors.response.use(res => {
  // http 기본응답
  if (res.status > 299 || res.status < 200) {
    console.error('서버에 호출이 들어가지 않았습니다. url을 확인하세요')
  }
  // 서버에서 호출하는 응답 schema
  if (
    Number(res.data.status.status_code) > 299 ||
    Number(res.data.status.status_code) < 200
  ) {
    const { status, message } = res.data
    const error = new ApiError(status, message)
    return Promise.reject(error)
  }
  return res
}, handleError)

// 응답 인터셉터
axiosDelete.interceptors.response.use(res => {
  // http 기본응답
  if (res.status > 299 || res.status < 200) {
    console.error('서버에 호출이 들어가지 않았습니다. url을 확인하세요')
  }
  // 서버에서 호출하는 응답 schema
  if (
    Number(res.data.status.status_code) > 299 ||
    Number(res.data.status.status_code) < 200
  ) {
    const { status, message } = res.data
    const error = new ApiError(status, message)
    return Promise.reject(error)
  }
  return res
}, handleError)

// 응답 인터셉터
axiosPatch.interceptors.response.use(res => {
  // http 기본응답
  if (res.status > 299 || res.status < 200) {
    console.error('서버에 호출이 들어가지 않았습니다. url을 확인하세요')
  }
  // 서버에서 호출하는 응답 schema
  if (
    Number(res.data.status.status_code) > 299 ||
    Number(res.data.status.status_code) < 200
  ) {
    const { status, message } = res.data
    const error = new ApiError(status, message)
    return Promise.reject(error)
  }
  return res
}, handleError)
