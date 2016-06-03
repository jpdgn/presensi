import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_JABATAN_START = 'GET_JABATAN_START'
export const GET_JABATAN_SUCCESS = 'GET_JABATAN_SUCCESS'
export const GET_JABATAN_BY_ID_START = 'GET_JABATAN_BY_ID_START'
export const GET_JABATAN_BY_ID_SUCCESS = 'GET_JABATAN_BY_ID_SUCCESS'
export const ADD_JABATAN_START = 'ADD_JABATAN_START'
export const ADD_JABATAN_SUCCESS = 'ADD_JABATAN_SUCCESS'
export const UPDATE_JABATAN_START = 'UPDATE_JABATAN_START'
export const UPDATE_JABATAN_SUCCESS = 'UPDATE_JABATAN_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get mahasiswa data
// ------------------------------------
function getJabatanStart () {
  return {
    type: GET_JABATAN_START
  }
}
function getJabatanFinish (result) {
  return {
    type: GET_JABATAN_SUCCESS,
    data: result
  }
}
export function getJabatan () {
  return (dispatch) => {
    dispatch(getJabatanStart())
    return fetch(API_URL + 'jabatan', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getJabatanFinish(json)))
  }
}

// ------------------------------------
// Actions Get Jabatan data by ID
// ------------------------------------
function getJabatanByIdStart () {
  return {
    type: GET_JABATAN_BY_ID_START
  }
}
function getJabatanByIdFinish (result) {
  return {
    type: GET_JABATAN_BY_ID_SUCCESS,
    data: result
  }
}
export function getJabatanById (id) {
  return (dispatch) => {
    dispatch(getJabatanByIdStart())
    return fetch(API_URL + 'jabatan/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getJabatanByIdFinish(json)))
  }
}

// ------------------------------------
// Actions insert jabatan data
// ------------------------------------
function addJabatanStart () {
  return {
    type: ADD_JABATAN_START
  }
}
function addJabatanFinish (result) {
  console.log(result)
  return {
    type: ADD_JABATAN_SUCCESS,
    data: result
  }
}
export function addJabatan (jabatan) {
  return (dispatch) => {
    dispatch(addJabatanStart())
    return fetch(API_URL + 'jabatan', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jabatan)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addJabatanFinish(json)))
  }
}

// ------------------------------------
// Actions update jabatan data
// ------------------------------------
function updateJabatanStart () {
  return {
    type: UPDATE_JABATAN_START
  }
}
function updateJabatanFinish (result) {
  console.log(result)
  return {
    type: UPDATE_JABATAN_SUCCESS,
    data: result
  }
}
export function updateJabatan (kode, jabatan) {
  return (dispatch) => {
    dispatch(updateJabatanStart())
    return fetch(API_URL + 'jabatan/' + kode, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jabatan)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateJabatanFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function jabatanReducers (state = initialState, action) {
  switch (action.type) {
    case GET_JABATAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_JABATAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_JABATAN_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_JABATAN_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case ADD_JABATAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case ADD_JABATAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case UPDATE_JABATAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case UPDATE_JABATAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
