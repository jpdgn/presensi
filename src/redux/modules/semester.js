import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SEMESTER_START = 'GET_SEMESTER_START'
export const GET_SEMESTER_SUCCESS = 'GET_SEMESTER_SUCCESS'
export const GET_SEMESTER_BY_ID_START = 'GET_SEMESTER_BY_ID_START'
export const GET_SEMESTER_BY_ID_SUCCESS = 'GET_SEMESTER_BY_ID_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get semester data
// ------------------------------------
function getSemesterStart () {
  return {
    type: GET_SEMESTER_START
  }
}
function getSemesterFinish (result) {
  return {
    type: GET_SEMESTER_SUCCESS,
    data: result
  }
}
export function getSemester () {
  return (dispatch) => {
    dispatch(getSemesterStart())
    return fetch(API_URL + 'semester', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getSemesterFinish(json)))
  }
}

// -------------------------------
// Get Ruangan By Id
// -------------------------------
function getSemesterByIdStart () {
  return {
    type: GET_SEMESTER_BY_ID_START
  }
}
function getSemesterByIdFinish (result) {
  return {
    type: GET_SEMESTER_BY_ID_SUCCESS,
    data: result
  }
}
export function getSemesterById (id) {
  return (dispatch) => {
    dispatch(getSemesterByIdStart())
    return fetch(API_URL + 'semester/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getSemesterByIdFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function semesterReducers (state = initialState, action) {
  switch (action.type) {
    case GET_SEMESTER_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_SEMESTER_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_SEMESTER_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_SEMESTER_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
