import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_JADWAL_START = 'GET_JADWAL_START'
export const GET_JADWAL_SUCCESS = 'GET_JADWAL_SUCCESS'
export const GET_JADWAL_BY_ID_START = 'GET_JADWAL_BY_ID_START'
export const GET_JADWAL_BY_ID_SUCCESS = 'GET_JADWAL_BY_ID_SUCCESS'
export const GET_SORTED_DOSEN_START = 'GET_SORTED_DOSEN_START'
export const GET_SORTED_DOSEN_FINISH = 'GET_SORTED_DOSEN_FINISH'
export const ADD_JADWAL_START = 'ADD_JADWAL_START'
export const ADD_JADWAL_SUCCESS = 'ADD_JADWAL_SUCCESS'
export const UPDATE_JADWAL_START = 'UPDATE_JADWAL_START'
export const UPDATE_JADWAL_SUCCESS = 'UPDATE_JADWAL_SUCCESS'
export const FILTER_JADWAL_START = 'FILTER_JADWAL_START'
export const FILTER_JADWAL_SUCCESS = 'FILTER_JADWAL_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions GET all Jadwal data
// ------------------------------------
function getJadwalStart () {
  return {
    type: GET_JADWAL_START
  }
}
function getJadwalFinish (result) {
  return {
    type: GET_JADWAL_SUCCESS,
    data: result
  }
}
export function getJadwal () {
  return (dispatch) => {
    dispatch(getJadwalStart())
    return fetch(API_URL + 'jadwal', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getJadwalFinish(json)))
  }
}

// ------------------------------------
// Actions GetJadwal data by ID
// ------------------------------------
function getJadwalByIdStart () {
  return {
    type: GET_JADWAL_BY_ID_START
  }
}
function getJadwalByIdFinish (result) {
  return {
    type: GET_JADWAL_BY_ID_SUCCESS,
    data: result
  }
}
export function getJadwalById (id) {
  return (dispatch) => {
    dispatch(getJadwalByIdStart())
    return fetch(API_URL + 'jadwal/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getJadwalByIdFinish(json)))
  }
}

// -------------------------------------
// Sort Jadwal based on Dosen name
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
    return fetch(API_URL + 'jadwal-sort-dosen/' + st, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getSortedDosenFinish(json, st)))
  }
}

// ------------------------------------
// ACTION ADD JADWAL DATA
// ------------------------------------
function addJadwalStart () {
  return {
    type: ADD_JADWAL_START
  }
}
function addJadwalFinish (result) {
  console.log(result)
  return {
    type: ADD_JADWAL_SUCCESS,
    data: result
  }
}
export function addJadwal (jadwal) {
  return (dispatch) => {
    dispatch(addJadwalStart())
    return fetch(API_URL + 'jadwal', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      },
      body: JSON.stringify(jadwal)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addJadwalFinish(json)))
  }
}

// ------------------------------------
// ACTION UPDATE JADWAL DATA
// ------------------------------------
function updateJadwalStart () {
  return {
    type: UPDATE_JADWAL_START
  }
}
function updateJadwalFinish (result) {
  console.log(result)
  return {
    type: UPDATE_JADWAL_SUCCESS,
    data: result
  }
}
export function updateJadwal (kode, jadwal) {
  return (dispatch) => {
    dispatch(updateJadwalStart())
    return fetch(API_URL + 'jadwal/' + kode, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      },
      body: JSON.stringify(jadwal)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateJadwalFinish(json)))
  }
}

// ------------------------------------
// ACTION FILTER JADWAL DATA
// ------------------------------------
function filterJadwalStart () {
  return {
    type: FILTER_JADWAL_START
  }
}
function filterJadwalFinish (result) {
  console.log(result)
  return {
    type: FILTER_JADWAL_SUCCESS,
    data: result
  }
}
export function filterJadwal (filter) {
  return (dispatch) => {
    dispatch(filterJadwalStart())
    return fetch(API_URL + 'jadwal/filter', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      },
      body: JSON.stringify(filter)
    })
    .then((response) => response.json())
    .then((json) => dispatch(filterJadwalFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function jadwalReducers (state = initialState, action) {
  switch (action.type) {
    case GET_JADWAL_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_JADWAL_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_JADWAL_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_JADWAL_BY_ID_SUCCESS:
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
    case ADD_JADWAL_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case ADD_JADWAL_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case UPDATE_JADWAL_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case UPDATE_JADWAL_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case FILTER_JADWAL_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case FILTER_JADWAL_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
