import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_MAHASISWA_DATA_START = 'GET_MAHASISWA_DATA_START'
export const GET_MAHASISWA_DATA_SUCCESS = 'GET_MAHASISWA_DATA_SUCCESS'
export const GET_MAHASISWA_DATA_BY_NIM_START = 'GET_MAHASISWA_DATA_BY_NIM_START'
export const GET_MAHASISWA_DATA_BY_NIM_SUCCESS = 'GET_MAHASISWA_DATA_BY_NIM_SUCCESS'
export const UPDATE_MAHASISWA_START = 'UPDATE_MAHASISWA_START'
export const UPDATE_MAHASISWA_SUCCESS = 'UPDATE_MAHASISWA_SUCCESS'
export const UPDATE_MAHASISWA_FAILED = 'UPDATE_MAHASISWA_FAILED'
export const ADD_MAHASISWA_START = 'ADD_MAHASISWA_START'
export const ADD_MAHASISWA_SUCCESS = 'ADD_MAHASISWA_SUCCESS'
export const ADD_MAHASISWA_FAILED = 'ADD_MAHASISWA_FAILED'
export const DELETE_START = 'DELETE_START'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILED = 'DELETE_FAILED'
export const HIDE = 'HIDE'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get mahasiswa data
// ------------------------------------
function getMahasiswaDataStart () {
  return {
    type: GET_MAHASISWA_DATA_START
  }
}
function getMahasiswaDataFinish (result) {
  if(result.success){
    return {
      type: GET_MAHASISWA_DATA_SUCCESS,
      data: result,
      rows: result.rows
    }
  }
}
export function getMahasiswaData () {
  return (dispatch) => {
    dispatch(getMahasiswaDataStart())
    return fetch(API_URL + 'mahasiswa', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getMahasiswaDataFinish(json)))
  }
}

// ------------------------------------
// Actions Get mahasiswa data by NIM
// ------------------------------------
function getMahasiswaDataByNimStart () {
  return {
    type: GET_MAHASISWA_DATA_BY_NIM_START
  }
}
function getMahasiswaDataByNimFinish (result) {
  var splitTanggalLahir = result.data[0].tanggal_lahir.split('-')
  var tahun = splitTanggalLahir[0]
  var bulan = splitTanggalLahir[1]
  var tanggal = splitTanggalLahir[2]
  return {
    type: GET_MAHASISWA_DATA_BY_NIM_SUCCESS,
    data: result.data[0],
    tanggal: tanggal,
    bulan: bulan,
    tahun: tahun
  }
}
export function getMahasiswaDataByNim (nim) {
  return (dispatch) => {
    dispatch(getMahasiswaDataByNimStart())
    return fetch(API_URL + 'mahasiswa/' + nim, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getMahasiswaDataByNimFinish(json)))
  }
}

// ------------------------------------
// Actions UPDATE mahasiswa by NIM
// ------------------------------------

function updateMahasiswaStart () {
  return {
    type: UPDATE_MAHASISWA_START
  }
}

function updateMahasiswaFinish (result) {
  if (result.success) {
    return {
      type: UPDATE_MAHASISWA_SUCCESS,
      message: result.message.toUpperCase()
    }
  } else {
    return {
      type: UPDATE_MAHASISWA_FAILED,
      message: result.message || 'GAGAL MERUBAH DATA'
    }
  }
}

export function updateMahasiswa (nim, mahasiswa) {
  return (dispatch) => {
    dispatch(updateMahasiswaStart())
    return fetch(API_URL + 'mahasiswa/' + nim, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      },
      body: JSON.stringify(mahasiswa)
    })
    .then((response) => response.json())
    .then((json) => dispatch(updateMahasiswaFinish(json)))
    .then((json) => dispatch(hideNotification()))
  }
}

// ------------------------------------
// Actions ADD NEW mahasiswa
// ------------------------------------

function addMahasiswaStart () {
  return {
    type: ADD_MAHASISWA_START
  }
}

function addMahasiswaFinish (result) {
  if (result.success) {
    return {
      type: ADD_MAHASISWA_SUCCESS,
      message: result.message.toUpperCase()
    }
  } else {
    return {
      type: ADD_MAHASISWA_FAILED,
      message: 'NIM SUDAH ADA'
    }
  }
}

export function addMahasiswa (mahasiswa) {
  return (dispatch) => {
    dispatch(addMahasiswaStart())
    return fetch(API_URL + 'mahasiswa/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      },
      body: JSON.stringify(mahasiswa)
    })
    .then((response) => response.json())
    .then((json) => dispatch(addMahasiswaFinish(json)))
    .then((json) => dispatch(hideNotification()))
  }
}

function deleteStart () {
  return {
    type: DELETE_START
  }
}

function deleteFinish (result) {
  if (result.success) {
    return {
      type: DELETE_SUCCESS,
      message: result.message
    }
  } else {
    return {
      type: DELETE_FAILED,
      message: result.message
    }
  }
}

export function deleteMahasiswa (nim) {
  return (dispatch) => {
    dispatch(deleteStart())
    return fetch(API_URL + 'mahasiswa/' + nim, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(deleteFinish(json)))
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
  isLoading: false,
  onUpdate: false,
  successUpdate: false,
  text: 'growler--hidden',
  hide: ''
}

export default function mahasiswaReducers (state = initialState, action) {
  switch (action.type) {
    case GET_MAHASISWA_DATA_START:
      return Object.assign({}, state, {
        isLoadingData: true,
        isRequestingUserData: true
      })
    case GET_MAHASISWA_DATA_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data,
        rows: action.rows
      })
    case GET_MAHASISWA_DATA_BY_NIM_START:
      return Object.assign({}, state, {
        isLoadingData: true,
        isRequestingUserData: true
      })
    case GET_MAHASISWA_DATA_BY_NIM_SUCCESS:
      return Object.assign({}, state, {
        data: action.data
      })
    case UPDATE_MAHASISWA_START:
      return Object.assign({}, state, {
        isLoading: true,
        onUpdate: false
      })
    case UPDATE_MAHASISWA_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        successUpdate: true,
        onUpdate: true,
        message: action.message,
        text: 'growler--success',
        hide: ''
      })
    case UPDATE_MAHASISWA_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        successUpdate: false,
        onUpdate: true,
        message: action.message,
        text: 'growler--error',
        hide: ''
      })
    case ADD_MAHASISWA_START:
      return Object.assign({}, state, {
        isLoading: true,
        message: action.message
      })
    case ADD_MAHASISWA_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        message: action.message,
        text: 'growler--success',
        hide: ''
      })
    case ADD_MAHASISWA_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        message: action.message,
        text: 'growler--error',
        hide: ''
      })
    case DELETE_START:
      return Object.assign({}, state, {
        message: 'was deleting'
      })
    case DELETE_SUCCESS:
      return Object.assign({}, state, {
        message: action.message
      })
    case DELETE_FAILED:
      return Object.assign({}, state, {
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
