import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_MK_START = 'GET_MK_START'
export const GET_MK_SUCCESS = 'GET_MK_SUCCESS'
export const GET_MK_BY_ID_START = 'GET_MK_BY_ID_START'
export const GET_MK_BY_ID_SUCCESS = 'GET_MK_BY_ID_SUCCESS'
export const ADD_MK_START = 'ADD_MK_START'
export const ADD_MK_SUCCESS = 'ADD_MK_SUCCESS'
export const UPDATE_MK_START = 'UPDATE_MK_START'
export const UPDATE_MK_SUCCESS = 'UPDATE_MK_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get mahasiswa data
// ------------------------------------
function getMkStart () {
  return {
    type: GET_MK_START
  }
}
function getMkFinish (result) {
  return {
    type: GET_MK_SUCCESS,
    data: result
  }
}
export function getMk () {
  return (dispatch) => {
    dispatch(getMkStart())
    return fetch(API_URL + 'mk', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getMkFinish(json)))
  }
}

// -----------------------
// Get Mata Kuliah By Id
// -----------------------

function getMkByIdStart () {
  return {
    type: GET_MK_BY_ID_START
  }
}
function getMkByIdFinish (result) {
  return {
    type: GET_MK_BY_ID_SUCCESS,
    data: result
  }
}
export function getMkById (id) {
  return (dispatch) => {
    dispatch(getMkByIdStart())
    return fetch(API_URL + 'mk/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getMkByIdFinish(json)))
  }
}

// -----------------------
// Add Mata Kuliah
// -----------------------

function addMkStart () {
  return {
    type: ADD_MK_START
  }
}
function addMkFinish (result) {
  return {
    type: ADD_MK_SUCCESS,
    data: result
  }
}
export function addMk (mk) {
  return (dispatch) => {
    dispatch(addMkStart())
    return fetch(API_URL + 'mk', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mk)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addMkFinish(json)))
  }
}

// -----------------------
// Add Mata Kuliah
// -----------------------

function updateMkStart () {
  return {
    type: UPDATE_MK_START
  }
}
function updateMkFinish (result) {
  return {
    type: UPDATE_MK_SUCCESS,
    data: result
  }
}
export function updateMk (kode, mk) {
  return (dispatch) => {
    dispatch(updateMkStart())
    return fetch(API_URL + 'mk/' + kode, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mk)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateMkFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function mataKuliahReducers (state = initialState, action) {
  switch (action.type) {
    case GET_MK_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_MK_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_MK_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_MK_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case ADD_MK_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case ADD_MK_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case UPDATE_MK_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case UPDATE_MK_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
