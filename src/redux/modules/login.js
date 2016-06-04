import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const CHECK_START = 'CHECK_START'
export const CHECK_SUCCESS = 'CHECK_SUCCESS'
export const CHECK_EXPIRED = 'CHECK_EXPIRED'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Login
// ------------------------------------
function loginStart () {
  return {
    type: LOGIN_START
  }
}
function loginFinish (result) {
  console.log(result)
  if (result.success) {
    var token = result.token
    window.localStorage.setItem('auth-key', token)
    return {
      type: LOGIN_SUCCESS,
      data: result.token
    }
  } else {
    return {
      type: LOGIN_FAILED
    }
  }

}
export function login (login, redirect) {
  return (dispatch) => {
    dispatch(loginStart())
    return fetch(API_URL + 'auth', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    .then((response) => response.json())
    .then((json) => dispatch(loginFinish(json)))
    .then(() => {
      if (redirect) redirect()
    })
  }
}

// ------------------------------------
// Actions Authorize Token
// ------------------------------------
function authStart () {
  return {
    type: CHECK_START
  }
}
function authFinish (result) {
  console.log(result)
  if (result.error) {
    window.localStorage.removeItem('auth-key')
    return {
      type: CHECK_EXPIRED,
      data: result.message
    }
  } else {
    return {
      type: CHECK_SUCCESS
    }
  }

}
export function auth (token) {
  return (dispatch) => {
    dispatch(authStart())
    return fetch(API_URL + 'check', {
      method: 'post',
      headers: {
        'x-access-token': token
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(authFinish(json)))
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function kelasReducers (state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return Object.assign({}, state, {
        isLoading: true
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        token: action.data,
        message: 'Login Berhasil'
      })
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        message: 'Login Gagal'
      })
    case CHECK_SUCCESS:
      return Object.assign({}, state, {
        isExpire: false
      })
    case CHECK_EXPIRED:
      return Object.assign({}, state, {
        isExpire: true,
        message: action.data
      })
    default:
      return state
  }
}
