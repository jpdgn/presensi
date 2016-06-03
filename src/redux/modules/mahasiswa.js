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
export const SET_NIM_TO_DELETE = 'SET_NIM_TO_DELETE'

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
  return {
    type: GET_MAHASISWA_DATA_SUCCESS,
    data: result
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
  console.log(result.data[0])
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
  console.log('update start')
  return {
    type: UPDATE_MAHASISWA_START
  }
}

function updateMahasiswaFinish (result) {
  console.log(result)
  if (result.success) {
    return {
      type: UPDATE_MAHASISWA_SUCCESS,
      message: result.message
    }
  } else {
    return {
      type: UPDATE_MAHASISWA_FAILED,
      message: result.message
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
  }
}

// ------------------------------------
// Actions ADD NEW mahasiswa
// ------------------------------------

function addMahasiswaStart () {
  console.log('addMahasiswa start')
  return {
    type: ADD_MAHASISWA_START
  }
}

function addMahasiswaFinish (result) {
  console.log(result)
  if (result.success) {
    return {
      type: ADD_MAHASISWA_SUCCESS,
      message: result.message
    }
  } else {
    return {
      type: ADD_MAHASISWA_FAILED,
      message: result.message
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
  }
}

function setNimToDelete (nim) {
  return {
    type: SET_NIM_TO_DELETE,
    nim: nim
  }
}
export function nimOnDelete (nim) {
  return (dispatch) => {
    dispatch(setNimToDelete(nim))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false,
  onUpdate: false,
  successUpdate: false
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
        data: action.data
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
        message: action.message
      })
    case UPDATE_MAHASISWA_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        successUpdate: false,
        onUpdate: true,
        message: action.message
      })
    case ADD_MAHASISWA_START:
      return Object.assign({}, state, {
        isLoading: true,
        message: action.message
      })
    case ADD_MAHASISWA_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        message: action.message
      })
    case ADD_MAHASISWA_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        message: action.message
      })
    case SET_NIM_TO_DELETE:
      return Object.assign({}, state, {
        nim: action.nim
      })
    default:
      return state
  }
}
