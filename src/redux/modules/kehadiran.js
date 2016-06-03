import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_KEHADIRAN_START = 'GET_KEHADIRAN_START'
export const GET_KEHADIRAN_SUCCESS = 'GET_KEHADIRAN_SUCCESS'
export const GET_KEHADIRAN_BY_ID_START = 'GET_KEHADIRAN_BY_ID_START'
export const GET_KEHADIRAN_BY_ID_SUCCESS = 'GET_KEHADIRAN_BY_ID_SUCCESS'
export const GET_SORTED_DOSEN_START = 'GET_SORTED_DOSEN_START'
export const GET_SORTED_DOSEN_FINISH = 'GET_SORTED_DOSEN_FINISH'
export const ADD_KEHADIRAN_START = 'ADD_KEHADIRAN_START'
export const ADD_KEHADIRAN_SUCCESS = 'ADD_KEHADIRAN_SUCCESS'
export const UPDATE_KEHADIRAN_START = 'UPDATE_KEHADIRAN_START'
export const UPDATE_KEHADIRAN_SUCCESS = 'UPDATE_KEHADIRAN_SUCCESS'
export const FILTER_KEHADIRAN_START = 'FILTER_KEHADIRAN_START'
export const FILTER_KEHADIRAN_SUCCESS = 'FILTER_KEHADIRAN_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions GET all Kehadiran data
// ------------------------------------
function getKehadiranStart () {
  return {
    type: GET_KEHADIRAN_START
  }
}
function getKehadiranFinish (result) {
  return {
    type: GET_KEHADIRAN_SUCCESS,
    data: result
  }
}
export function getKehadiran () {
  return (dispatch) => {
    dispatch(getKehadiranStart())
    return fetch(API_URL + 'kehadiran', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getKehadiranFinish(json)))
  }
}

// ------------------------------------
// Actions GetKehadiran data by ID
// ------------------------------------
function getKehadiranByIdStart () {
  return {
    type: GET_KEHADIRAN_BY_ID_START
  }
}
function getKehadiranByIdFinish (result) {
  return {
    type: GET_KEHADIRAN_BY_ID_SUCCESS,
    data: result
  }
}
export function getKehadiranById (id) {
  return (dispatch) => {
    dispatch(getKehadiranByIdStart())
    return fetch(API_URL + 'kehadiran/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getKehadiranByIdFinish(json)))
  }
}

// -------------------------------------
// Sort Kehadiran based on Dosen name
// -------------------------------------

function getSortedDosenStart () {
  console.log('start')
  return {
    type: GET_SORTED_DOSEN_START
  }
}
function getSortedDosenFinish (result, sort) {
  console.log('finish')
  console.log(sort)
  return {
    type: GET_SORTED_DOSEN_FINISH,
    data: result,
    sortType: sort
  }
}
export function getSortedDosen (st) {
  return (dispatch) => {
    dispatch(getSortedDosenStart())
    return fetch(API_URL + 'kehadiran-sort-dosen/' + st, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getSortedDosenFinish(json, st)))
  }
}

// ------------------------------------
// ACTION ADD KEHADIRAN DATA
// ------------------------------------
function addKehadiranStart () {
  return {
    type: ADD_KEHADIRAN_START
  }
}
function addKehadiranFinish (result) {
  console.log(result)
  return {
    type: ADD_KEHADIRAN_SUCCESS,
    data: result
  }
}
export function addKehadiran (kehadiran) {
  return (dispatch) => {
    dispatch(addKehadiranStart())
    return fetch(API_URL + 'kehadiran', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(kehadiran)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addKehadiranFinish(json)))
  }
}

// ------------------------------------
// ACTION UPDATE KEHADIRAN DATA
// ------------------------------------
function updateKehadiranStart () {
  return {
    type: UPDATE_KEHADIRAN_START
  }
}
function updateKehadiranFinish (result) {
  console.log(result)
  return {
    type: UPDATE_KEHADIRAN_SUCCESS,
    data: result
  }
}
export function updateKehadiran (kode, kehadiran) {
  return (dispatch) => {
    dispatch(updateKehadiranStart())
    return fetch(API_URL + 'kehadiran/' + kode, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(kehadiran)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateKehadiranFinish(json)))
  }
}

// ------------------------------------
// ACTION FILTER KEHADIRAN DATA
// ------------------------------------
function filterKehadiranStart () {
  return {
    type: FILTER_KEHADIRAN_START
  }
}
function filterKehadiranFinish (result) {
  console.log(result)
  return {
    type: FILTER_KEHADIRAN_SUCCESS,
    data: result
  }
}
export function filterKehadiran (filter) {
  return (dispatch) => {
    dispatch(filterKehadiranStart())
    return fetch(API_URL + 'kehadiran/filter', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filter)
    })
    .then((response) => response.json())
    .then((json) => dispatch(filterKehadiranFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function kehadiranReducers (state = initialState, action) {
  switch (action.type) {
    case GET_KEHADIRAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_KEHADIRAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_KEHADIRAN_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_KEHADIRAN_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_SORTED_DOSEN_START:
      return Object.assign({}, state, {
        isLoadingData: true,
        isRequestingUserData: true
      })
    case GET_SORTED_DOSEN_FINISH:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data,
        sortType: action.sortType
      })
    case ADD_KEHADIRAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case ADD_KEHADIRAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case UPDATE_KEHADIRAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case UPDATE_KEHADIRAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case FILTER_KEHADIRAN_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case FILTER_KEHADIRAN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
