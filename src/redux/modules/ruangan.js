import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_RUANGAN_START = 'GET_RUANGAN_START'
export const GET_RUANGAN_SUCCESS = 'GET_RUANGAN_SUCCESS'
export const GET_RUANGAN_BY_ID_START = 'GET_RUANGAN_BY_ID_START'
export const GET_RUANGAN_BY_ID_SUCCESS = 'GET_RUANGAN_BY_ID_SUCCESS'
export const ADD_RUANGAN_START = 'ADD_RUANGAN_START'
export const ADD_RUANGAN_SUCCESS = 'ADD_RUANGAN_SUCCESS'
export const UPDATE_RUANGAN_START = 'UPDATE_RUANGAN_START'
export const UPDATE_RUANGAN_SUCCESS = 'UPDATE_RUANGAN_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get ruangan data
// ------------------------------------
function getRuanganStart () {
  return {
    type: GET_RUANGAN_START
  }
}
function getRuanganFinish (result) {
  return {
    type: GET_RUANGAN_SUCCESS,
    data: result
  }
}
export function getRuangan () {
  return (dispatch) => {
    dispatch(getRuanganStart())
    return fetch(API_URL + 'ruangan', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getRuanganFinish(json)))
  }
}

// -------------------------------
// Get Ruangan By Id
// -------------------------------
function getRuanganByIdStart () {
  return {
    type: GET_RUANGAN_BY_ID_START
  }
}
function getRuanganByIdFinish (result) {
  return {
    type: GET_RUANGAN_BY_ID_SUCCESS,
    data: result
  }
}
export function getRuanganById (id) {
  return (dispatch) => {
    dispatch(getRuanganByIdStart())
    return fetch(API_URL + 'ruangan/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getRuanganByIdFinish(json)))
  }
}

// ------------------------------------
// Actions Insert Ruangan data
// ------------------------------------
function addRuanganStart () {
  return {
    type: ADD_RUANGAN_START
  }
}
function addRuanganFinish (result) {
  return {
    type: ADD_RUANGAN_SUCCESS,
    data: result
  }
}
export function addRuangan (ruangan) {
  return (dispatch) => {
    dispatch(addRuanganStart())
    return fetch(API_URL + 'ruangan', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ruangan)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addRuanganFinish(json)))
  }
}

// ------------------------------------
// Actions update ruangan data
// ------------------------------------
function updateRuanganStart () {
  return {
    type: UPDATE_RUANGAN_START
  }
}
function updateRuanganFinish (result) {
  return {
    type: UPDATE_RUANGAN_SUCCESS,
    data: result
  }
}
export function updateRuangan (kode, ruangan) {
  return (dispatch) => {
    dispatch(updateRuanganStart())
    return fetch(API_URL + 'ruangan/' + kode, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      },
      body: JSON.stringify(ruangan)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateRuanganFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function ruanganReducers (state = initialState, action) {
  switch (action.type) {
    case GET_RUANGAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_RUANGAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_RUANGAN_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_RUANGAN_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case ADD_RUANGAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case ADD_RUANGAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case UPDATE_RUANGAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case UPDATE_RUANGAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
