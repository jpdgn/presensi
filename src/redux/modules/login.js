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
export const LOGOUT_FINISH = 'LOGOUT_FINISH'
export const HIDE = 'HIDE'

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
      type: LOGIN_FAILED,
      message: 'Username atau password anda salah'
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
    .then((json) => dispatch(hideNotification()))
    .then(() => {
      if (redirect) redirect()
    })
  }
}

function logoutFinish (redirect) {
  window.localStorage.removeItem('auth-key')
  return {
    type: LOGOUT_FINISH,
    message: 'Anda berhasil keluar'
  }
}

export function logout () {
  return (dispatch) => {
    dispatch(logoutFinish())
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

function hideNotification () {
  return (dispatch) => {
      window.setTimeout(() => {
        dispatch({
          type: HIDE
        })
      }, 3000)
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function loginReducers (state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return Object.assign({}, state, {
        isLoading: true
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        token: action.data,
        message: 'Login Berhasil',
        text: 'growler--success',
        hide: ''
      })
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        message: action.message,
        text: 'growler--error',
        hide: ''
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
    case LOGOUT_FINISH:
      return Object.assign({}, state, {
        isLogout: true,
        message: action.message
      })
    case HIDE:
      return Object.assign({}, state, {
        hide: ' growler--hiding'
      })
    default:
      return state
  }
}
