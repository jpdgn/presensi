import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DOSEN_START = 'GET_DOSEN_START'
export const GET_DOSEN_SUCCESS = 'GET_DOSEN_SUCCESS'
export const GET_DOSEN_BY_NIP_START = 'GET_DOSEN_BY_NIP_START'
export const GET_DOSEN_BY_NIP_SUCCESS = 'GET_DOSEN_BY_NIP_SUCCESS'
export const ADD_DOSEN_START = 'ADD_DOSEN_START'
export const ADD_DOSEN_FINISH = 'ADD_DOSEN_FINISH'
export const UPDATE_DOSEN_START = 'UPDATE_DOSEN_START'
export const UPDATE_DOSEN_FINISH = 'UPDATE_DOSEN_FINISH'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get user data
// ------------------------------------
function getDosenStart () {
  return {
    type: GET_DOSEN_START
  }
}
function getDosenFinish (result) {
  return {
    type: GET_DOSEN_SUCCESS,
    data: result
  }
}
export function getDosen () {
  return (dispatch) => {
    dispatch(getDosenStart())
    return fetch(API_URL + 'dosen', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getDosenFinish(json)))
  }
}

// ------------------------------------
// GET DOSEN DATA BY ID
// ------------------------------------
function getDosenByNipStart () {
  return {
    type: GET_DOSEN_BY_NIP_START
  }
}
function getDosenByNipFinish (result) {
  console.log(result.data[0])
  var splitTanggalLahir = result.data[0].tanggal_lahir.split('-')
  var tahun = splitTanggalLahir[0]
  var bulan = splitTanggalLahir[1]
  var tanggal = splitTanggalLahir[2]
  return {
    type: GET_DOSEN_BY_NIP_SUCCESS,
    data: result.data[0],
    tanggal: tanggal,
    bulan: bulan,
    tahun: tahun
  }
}
export function getDosenByNip (nip) {
  return (dispatch) => {
    dispatch(getDosenByNipStart())
    return fetch(API_URL + 'dosen/' + nip, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getDosenByNipFinish(json)))
  }
}

// ------------------------------------
// ADD DOSEN
// ------------------------------------
function addDosenStart () {
  return {
    type: ADD_DOSEN_START
  }
}
function addDosenFinish (result) {
  console.log(result)
  // var splitTanggalLahir = result.data[0].tanggal_lahir.split('-')
  // var tahun = splitTanggalLahir[0]
  // var bulan = splitTanggalLahir[1]
  // var tanggal = splitTanggalLahir[2]
  return {
    type: ADD_DOSEN_FINISH
    // data: result.data[0],
    // tanggal: tanggal,
    // bulan: bulan,
    // tahun: tahun
  }
}
export function addDosen (dosen) {
  return (dispatch) => {
    dispatch(addDosenStart())
    return fetch(API_URL + 'dosen/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dosen)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addDosenFinish(json)))
  }
}

// ------------------------------------
// Actions Update Dosen
// ------------------------------------
function updateDosenStart () {
  return {
    type: UPDATE_DOSEN_START
  }
}
function updateDosenFinish (result) {
  console.log(result)
  return {
    type: UPDATE_DOSEN_FINISH,
    data: result
  }
}
export function updateDosen (nip, dosen) {
  return (dispatch) => {
    dispatch(updateDosenStart())
    return fetch(API_URL + 'dosen/' + nip, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      },
      body: JSON.stringify(dosen)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateDosenFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
}

export default function dosenReducers (state = initialState, action) {
  switch (action.type) {
    case GET_DOSEN_START:
      return Object.assign({}, state, {
        isLoadingData: true,
        isRequestingUserData: true
      })
    case GET_DOSEN_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_DOSEN_BY_NIP_START:
      return Object.assign({}, state, {
        isLoadingData: true,
        data: action.data
      })
    case GET_DOSEN_BY_NIP_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case ADD_DOSEN_START:
      return Object.assign({}, state, {
        isLoadingData: true,
        data: action.data
      })
    case ADD_DOSEN_FINISH:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case UPDATE_DOSEN_START:
      return Object.assign({}, state, {
        isLoadingData: true,
        data: action.data
      })
    case UPDATE_DOSEN_FINISH:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
