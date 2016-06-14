import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import counter from './modules/counter'
import mahasiswa from './modules/mahasiswa'
import dosen from './modules/dosen'
import kelas from './modules/kelas'
import mk from './modules/mk'
import ruangan from './modules/ruangan'
import prodi from './modules/prodi'
import jurusan from './modules/jurusan'
import jabatan from './modules/jabatan'
import jadwal from './modules/jadwal'
import semester from './modules/semester'
import akademik from './modules/akademik'
import kehadiran from './modules/kehadiran'
import kompensasi from './modules/kompensasi'
import login from './modules/login'

export const GET_MAHASISWA_DATA_BY_NIM_SUCCESS = 'GET_MAHASISWA_DATA_BY_NIM_SUCCESS'
export const GET_DOSEN_BY_NIP_SUCCESS = 'GET_DOSEN_BY_NIP_SUCCESS'
export const GET_KELAS_BY_ID_SUCCESS = 'GET_KELAS_BY_ID_SUCCESS'
export const GET_RUANGAN_BY_ID_SUCCESS = 'GET_RUANGAN_BY_ID_SUCCESS'
export const GET_MK_BY_ID_SUCCESS = 'GET_MK_BY_ID_SUCCESS'
export const GET_PRODI_BY_ID_SUCCESS = 'GET_PRODI_BY_ID_SUCCESS'
export const GET_JURUSAN_BY_ID_SUCCESS = 'GET_JURUSAN_BY_ID_SUCCESS'
export const GET_JABATAN_BY_ID_SUCCESS = 'GET_JABATAN_BY_ID_SUCCESS'
export const GET_JADWAL_BY_ID_SUCCESS = 'GET_JADWAL_BY_ID_SUCCESS'

const normalizeUpperCase = (value) => {
  if (!value) {
    return value
  }
  return value.toUpperCase()
}
export default combineReducers({
  counter,
  mahasiswa,
  dosen,
  kelas,
  mk,
  ruangan,
  prodi,
  jurusan,
  jabatan,
  jadwal,
  semester,
  akademik,
  kehadiran,
  kompensasi,
  login,
  router,
  form: formReducer.plugin({
    editMahasiswaForm: (state, action) => {
      switch (action.type) {
        case GET_MAHASISWA_DATA_BY_NIM_SUCCESS:
          return {
            ...state,
            nim: { value: action.data.nim },
            nama: { value: action.data.nama_mhs },
            email: { value: action.data.email },
            kelas: { value: action.data.id_kelas },
            tahunMasuk: { value: action.data.tahun_masuk },
            noHp: { value: action.data.no_hp },
            tanggal: { value: action.tanggal },
            bulan: { value: action.bulan },
            tahun: { value: action.tahun },
            alamatRumah: { value: action.data.alamat_rumah },
            alamatTinggal: { value: action.data.alamat_tinggal },
            semester: { value: action.data.id_semester },
            akademik: { value: action.data.id_akademik },
            kompensasi: { value: action.data.kompensasi },
            deviceId: { value: action.data.device_id }
          }
        default:
          return state
      }
    },
    editDosenForm: (state, action) => {
      switch (action.type) {
        case GET_DOSEN_BY_NIP_SUCCESS:
          return {
            ...state,
            nip: { value: action.data.nip },
            nama: { value: action.data.nama_dosen },
            email: { value: action.data.email },
            jabatan: { value: action.data.id_jabatan },
            noHp: { value: action.data.no_hp },
            tanggal: { value: action.tanggal },
            bulan: { value: action.bulan },
            tahun: { value: action.tahun },
            alamatRumah: { value: action.data.alamat_rumah },
            alamatTinggal: { value: action.data.alamat_tinggal },
            deviceId: { value: action.data.device_id }
          }
        default:
          return state
      }
    },
    editKelasForm: (state, action) => {
      switch (action.type) {
        case GET_KELAS_BY_ID_SUCCESS:
          return {
            ...state,
            kode: { value: action.data.data[0].kode.toUpperCase() },
            kelas: { value: action.data.data[0].kelas.toUpperCase() },
            prodi: { value: action.data.data[0].id_prodi.toUpperCase() }
          }
        default:
          return state
      }
    },
    editMataKuliahForm: (state, action) => {
      switch (action.type) {
        case GET_MK_BY_ID_SUCCESS:
          return {
            ...state,
            kode: { value: action.data.data[0].kode },
            mata_kuliah: { value: action.data.data[0].mata_kuliah },
            bobot: { value: action.data.data[0].bobot }
          }
        default:
          return state
      }
    },
    editProdiForm: (state, action) => {
      switch (action.type) {
        case GET_PRODI_BY_ID_SUCCESS:
          return {
            ...state,
            kode: { value: action.data.data[0].kode },
            prodi: { value: action.data.data[0].prodi },
            jurusan: { value: action.data.data[0].id_jurusan }
          }
        default:
          return state
      }
    },
    editJurusanForm: (state, action) => {
      switch (action.type) {
        case GET_JURUSAN_BY_ID_SUCCESS:
          return {
            ...state,
            kode: { value: action.data.data[0].kode },
            jurusan: { value: action.data.data[0].jurusan }
          }
        default:
          return state
      }
    },
    editJabatanForm: (state, action) => {
      switch (action.type) {
        case GET_JABATAN_BY_ID_SUCCESS:
          return {
            ...state,
            kode: { value: action.data.data[0].kode },
            jabatan: { value: action.data.data[0].jabatan.toUpperCase() }
          }
        default:
          return state
      }
    },
    editRuanganForm: (state, action) => {
      switch (action.type) {
        case GET_RUANGAN_BY_ID_SUCCESS:
          return {
            ...state,
            kode: { value: action.data.data[0].kode.toUpperCase() },
            ruangan: { value: action.data.data[0].ruangan.toUpperCase() },
            lantai: { value: action.data.data[0].lantai },
            lat_a: { value: action.data.data[0].latitude_a },
            lat_b: { value: action.data.data[0].latitude_b },
            long_a: { value: action.data.data[0].longitude_a },
            long_b: { value: action.data.data[0].longitude_b }
          }
        default:
          return state
      }
    },
    editJadwalForm: (state, action) => {
      switch (action.type) {
        case GET_JADWAL_BY_ID_SUCCESS:
          return {
            ...state,
            kode: { value: action.data.data[0].kode },
            hari: { value: action.data.data[0].hari },
            jam_mulai: { value: action.data.data[0].jam_mulai },
            jam_selesai: { value: action.data.data[0].jam_selesai },
            kelas: { value: action.data.data[0].id_kelas },
            semester: { value: action.data.data[0].id_semester },
            akademik: { value: action.data.data[0].id_akademik },
            ruangan: { value: action.data.data[0].id_ruangan },
            mata_kuliah: { value: action.data.data[0].id_mk },
            dosen: { value: action.data.data[0].id_dosen }
          }
        default:
          return state
      }
    }
  }).normalize({
    editMataKuliahForm: {
      kode: value => normalizeUpperCase(value),
      mata_kuliah: value => normalizeUpperCase(value)
    },
    editDosenForm: {
      nip: value => normalizeUpperCase(value),
      nama: value => normalizeUpperCase(value)
    },
    addDosenForm: {
      nip: value => normalizeUpperCase(value),
      nama: value => normalizeUpperCase(value)
    }
  })
})
