import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_JURUSAN_START = 'GET_JURUSAN_START'
export const GET_JURUSAN_SUCCESS = 'GET_JURUSAN_SUCCESS'
export const GET_JURUSAN_BY_ID_START = 'GET_JURUSAN_BY_ID_START'
export const GET_JURUSAN_BY_ID_SUCCESS = 'GET_JURUSAN_BY_ID_SUCCESS'
export const ADD_JURUSAN_START = 'ADD_JURUSAN_START'
export const ADD_JURUSAN_SUCCESS = 'ADD_JURUSAN_SUCCESS'
export const UPDATE_JURUSAN_START = 'UPDATE_JURUSAN_START'
export const UPDATE_JURUSAN_SUCCESS = 'UPDATE_JURUSAN_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get mahasiswa data
// ------------------------------------
function getJurusanStart () {
  return {
    type: GET_JURUSAN_START
  }
}
function getJurusanFinish (result) {
  return {
    type: GET_JURUSAN_SUCCESS,
    data: result
  }
}
export function getJurusan () {
  return (dispatch) => {
    dispatch(getJurusanStart())
    return fetch(API_URL + 'jurusan', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getJurusanFinish(json)))
  }
}

// ------------------------------------
// Actions Get Jurusan data By Id
// ------------------------------------
function getJurusanByIdStart () {
  return {
    type: GET_JURUSAN_BY_ID_START
  }
}
function getJurusanByIdFinish (result) {
  return {
    type: GET_JURUSAN_BY_ID_SUCCESS,
    data: result
  }
}
export function getJurusanById (id) {
  return (dispatch) => {
    dispatch(getJurusanByIdStart())
    return fetch(API_URL + 'jurusan/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getJurusanByIdFinish(json)))
  }
}

// ------------------------------------
// Actions insert jurusan data
// ------------------------------------
function addJurusanStart () {
  return {
    type: ADD_JURUSAN_START
  }
}
function addJurusanFinish (result) {
  console.log(result)
  return {
    type: ADD_JURUSAN_SUCCESS,
    data: result
  }
}
export function addJurusan (jurusan) {
  return (dispatch) => {
    dispatch(addJurusanStart())
    return fetch(API_URL + 'jurusan', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jurusan)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addJurusanFinish(json)))
  }
}

// ------------------------------------
// Actions update jurusan data
// ------------------------------------
function updateJurusanStart () {
  return {
    type: UPDATE_JURUSAN_START
  }
}
function updateJurusanFinish (result) {
  console.log(result)
  return {
    type: UPDATE_JURUSAN_SUCCESS,
    data: result
  }
}
export function updateJurusan (kode, jurusan) {
  return (dispatch) => {
    dispatch(updateJurusanStart())
    return fetch(API_URL + 'jurusan/' + kode, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jurusan)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateJurusanFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function jurusanReducers (state = initialState, action) {
  switch (action.type) {
    case GET_JURUSAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_JURUSAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_JURUSAN_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_JURUSAN_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case ADD_JURUSAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case ADD_JURUSAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case UPDATE_JURUSAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case UPDATE_JURUSAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
