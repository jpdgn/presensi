import fetch from 'isomorphic-fetch'
import { apiUrlConfig } from '../../utils/config'
const API_URL = apiUrlConfig + 'api/'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_AKADEMIK_START = 'GET_AKADEMIK_START'
export const GET_AKADEMIK_SUCCESS = 'GET_AKADEMIK_SUCCESS'
export const GET_AKADEMIK_BY_ID_START = 'GET_AKADEMIK_BY_ID_START'
export const GET_AKADEMIK_BY_ID_SUCCESS = 'GET_AKADEMIK_BY_ID_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions Get semester data
// ------------------------------------
function getAkademikStart () {
  return {
    type: GET_AKADEMIK_START
  }
}
function getAkademikFinish (result) {
  return {
    type: GET_AKADEMIK_SUCCESS,
    data: result
  }
}
export function getAkademik () {
  return (dispatch) => {
    dispatch(getAkademikStart())
    return fetch(API_URL + 'akademik', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getAkademikFinish(json)))
  }
}

// -------------------------------
// Get Ruangan By Id
// -------------------------------
function getAkademikByIdStart () {
  return {
    type: GET_AKADEMIK_BY_ID_START
  }
}
function getAkademikByIdFinish (result) {
  return {
    type: GET_AKADEMIK_BY_ID_SUCCESS,
    data: result
  }
}
export function getAkademikById (id) {
  return (dispatch) => {
    dispatch(getAkademikByIdStart())
    return fetch(API_URL + 'akademik/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('auth-key')
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(getAkademikByIdFinish(json)))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  isLoading: false
}

export default function akademikReducers (state = initialState, action) {
  switch (action.type) {
    case GET_AKADEMIK_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_AKADEMIK_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    case GET_AKADEMIK_BY_ID_START:
      return Object.assign({}, state, {
        isLoadingData: true
      })
    case GET_AKADEMIK_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isLoadingData: false,
        data: action.data
      })
    default:
      return state
  }
}
