import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_PRODI_START = 'GET_PRODI_START'
export const GET_PRODI_SUCCESS = 'GET_PRODI_SUCCESS'
export const GET_PRODI_BY_ID_START = 'GET_PRODI_BY_ID_START'
export const GET_PRODI_BY_ID_SUCCESS = 'GET_PRODI_BY_ID_SUCCESS'
export const ADD_PRODI_START = 'ADD_PRODI_START'
export const ADD_PRODI_SUCCESS = 'ADD_PRODI_SUCCESS'
export const UPDATE_PRODI_START = 'UPDATE_PRODI_START'
export const UPDATE_PRODI_SUCCESS = 'UPDATE_PRODI_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get mahasiswa data
// ------------------------------------
function getProdiStart () {
  return {
    type: GET_PRODI_START
  }
}
function getProdiFinish (result) {
  return {
    type: GET_PRODI_SUCCESS,
    data: result
  }
}
export function getProdi () {
  return (dispatch) => {
    dispatch(getProdiStart())
    return fetch(API_URL + 'prodi', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getProdiFinish(json)))
  }
}

// ------------------------------------
// Actions Get Prodi By Id data
// ------------------------------------
function getProdiByIdStart () {
  return {
    type: GET_PRODI_BY_ID_START
  }
}
function getProdiByIdFinish (result) {
  return {
    type: GET_PRODI_BY_ID_SUCCESS,
    data: result
  }
}
export function getProdiById (id) {
  return (dispatch) => {
    dispatch(getProdiByIdStart())
    return fetch(API_URL + 'prodi/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getProdiByIdFinish(json)))
  }
}

// ------------------------------------
// Actions Get mahasiswa data
// ------------------------------------
function addProdiStart () {
  return {
    type: ADD_PRODI_START
  }
}
function addProdiFinish (result) {
  console.log(result)
  return {
    type: ADD_PRODI_SUCCESS,
    data: result
  }
}
export function addProdi (prodi) {
  return (dispatch) => {
    dispatch(addProdiStart())
    return fetch(API_URL + 'prodi', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prodi)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addProdiFinish(json)))
  }
}

// ------------------------------------
// Actions Get mahasiswa data
// ------------------------------------
function updateProdiStart () {
  return {
    type: UPDATE_PRODI_START
  }
}
function updateProdiFinish (result) {
  console.log(result)
  return {
    type: UPDATE_PRODI_SUCCESS,
    data: result
  }
}
export function updateProdi (kode, prodi) {
  return (dispatch) => {
    dispatch(updateProdiStart())
    return fetch(API_URL + 'prodi/' + kode, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prodi)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateProdiFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function prodiReducers (state = initialState, action) {
  switch (action.type) {
    case GET_PRODI_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_PRODI_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_PRODI_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_PRODI_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case ADD_PRODI_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case ADD_PRODI_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case UPDATE_PRODI_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case UPDATE_PRODI_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
