import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_KELAS_START = 'GET_KELAS_START'
export const GET_KELAS_SUCCESS = 'GET_KELAS_SUCCESS'
export const GET_KELAS_BY_ID_START = 'GET_KELAS_BY_ID_START'
export const GET_KELAS_BY_ID_SUCCESS = 'GET_KELAS_BY_ID_SUCCESS'
export const ADD_KELAS_START = 'ADD_KELAS_START'
export const ADD_KELAS_SUCCESS = 'ADD_KELAS_SUCCESS'
export const ADD_KELAS_FAILED = 'ADD_KELAS_FAILED'
export const UPDATE_KELAS_START = 'UPDATE_KELAS_START'
export const UPDATE_KELAS_SUCCESS = 'UPDATE_KELAS_SUCCESS'
export const UPDATE_KELAS_FAILED = 'UPDATE_KELAS_FAILED'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get mahasiswa data
// ------------------------------------
function getKelasStart () {
  return {
    type: GET_KELAS_START
  }
}
function getKelasFinish (result) {
  return {
    type: GET_KELAS_SUCCESS,
    data: result
  }
}
export function getKelas () {
  return (dispatch) => {
    dispatch(getKelasStart())
    return fetch(API_URL + 'kelas', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getKelasFinish(json)))
  }
}

function getKelasByIdStart () {
  return {
    type: GET_KELAS_BY_ID_START
  }
}
function getKelasByIdFinish (result) {
  return {
    type: GET_KELAS_BY_ID_SUCCESS,
    data: result
  }
}
export function getKelasById (id) {
  return (dispatch) => {
    dispatch(getKelasByIdStart())
    return fetch(API_URL + 'kelas/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getKelasByIdFinish(json)))
  }
}

// ------------------------------------
// Add Kelas Action
// ------------------------------------
function addKelasStart () {
  return {
    type: ADD_KELAS_START
  }
}
function addKelasFinish (result) {
  if(result.success) {
    return {
      type: ADD_KELAS_SUCCESS,
      data: result
    }
  } else {
    return {
      type: ADD_KELAS_FAILED,
      data: result
    }
  }
}
export function addKelas (kelas) {
  return (dispatch) => {
    dispatch(addKelasStart())
    return fetch(API_URL + 'kelas', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      },
      body: JSON.stringify(kelas)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addKelasFinish(json)))
  }
}

// ------------------------------------
// Add Kelas Action
// ------------------------------------
function updateKelasStart () {
  return {
    type: UPDATE_KELAS_START
  }
}
function updateKelasFinish (result) {
  if(result.success) {
    return {
      type: UPDATE_KELAS_SUCCESS,
      data: result
    }
  } else {
    return {
      type: UPDATE_KELAS_FAILED,
      data: result
    }
  }

}
export function updateKelas (kode, kelas) {
  return (dispatch) => {
    dispatch(updateKelasStart())
    return fetch(API_URL + 'kelas/' + kode, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      },
      body: JSON.stringify(kelas)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateKelasFinish(json)))
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
    case GET_KELAS_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_KELAS_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_KELAS_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_KELAS_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case ADD_KELAS_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case ADD_KELAS_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case UPDATE_KELAS_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case UPDATE_KELAS_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
