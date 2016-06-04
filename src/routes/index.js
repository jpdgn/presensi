import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import MahasiswaView from 'views/MahasiswaView/MahasiswaView'
import AddMahasiswaView from 'views/MahasiswaView/AddMahasiswaView'
import EditMahasiswaView from 'views/MahasiswaView/EditMahasiswaView'
import DetailMahasiswaView from 'views/MahasiswaView/DetailMahasiswaView'
import DosenView from 'views/DosenView/DosenView'
import AddDosenView from 'views/DosenView/AddDosenView'
import EditDosenView from 'views/DosenView/EditDosenView'
import DetailDosenView from 'views/DosenView/DetailDosenView'
import KelasView from 'views/KelasView/KelasView'
import AddKelasView from 'views/KelasView/AddKelasView'
import EditKelasView from 'views/KelasView/EditKelasView'
import MataKuliahView from 'views/MataKuliahView/MataKuliahView'
import AddMataKuliahView from 'views/MataKuliahView/AddMataKuliahView'
import EditMataKuliahView from 'views/MataKuliahView/EditMataKuliahView'
import RuanganView from 'views/RuanganView/RuanganView'
import AddRuanganView from 'views/RuanganView/AddRuanganView'
import EditRuanganView from 'views/RuanganView/EditRuanganView'
import ProdiView from 'views/ProdiView/ProdiView'
import AddProdiView from 'views/ProdiView/AddProdiView'
import EditProdiView from 'views/ProdiView/EditProdiView'
import JurusanView from 'views/JurusanView/JurusanView'
import AddJurusanView from 'views/JurusanView/AddJurusanView'
import EditJurusanView from 'views/JurusanView/EditJurusanView'
import JabatanView from 'views/JabatanView/JabatanView'
import AddJabatanView from 'views/JabatanView/AddJabatanView'
import EditJabatanView from 'views/JabatanView/EditJabatanView'
import JadwalView from 'views/JadwalView/JadwalView'
import AddJadwalView from 'views/JadwalView/AddJadwalView'
import EditJadwalView from 'views/JadwalView/EditJadwalView'
import KehadiranView from 'views/KehadiranView/KehadiranView'
import LoginView from 'views/LoginView/LoginView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route component={MahasiswaView} onEnter={requireAuth} path='/mahasiswa' />
    <Route component={AddMahasiswaView} onEnter={requireAuth} path='/add/mahasiswa' />
    <Route component={EditMahasiswaView} onEnter={requireAuth} path='/mahasiswa/:nim/edit' />
    <Route component={DetailMahasiswaView} onEnter={requireAuth} path='/mahasiswa/:nim/view' />
    <Route component={DosenView} onEnter={requireAuth} path='/dosen' />
    <Route component={AddDosenView} onEnter={requireAuth} path='/add/dosen' />
    <Route component={EditDosenView} onEnter={requireAuth} path='/dosen/:nip/edit' />
    <Route component={DetailDosenView} onEnter={requireAuth} path='/dosen/:nip/view' />
    <Route component={KelasView} onEnter={requireAuth} path='/kelas' />
    <Route component={AddKelasView} onEnter={requireAuth} path='/add/kelas' />
    <Route component={EditKelasView} onEnter={requireAuth} path='/kelas/:id/edit' />
    <Route component={MataKuliahView} onEnter={requireAuth} path='/mata-kuliah' />
    <Route component={AddMataKuliahView} onEnter={requireAuth} path='/add/mata-kuliah' />
    <Route component={EditMataKuliahView} onEnter={requireAuth} path='/mata-kuliah/:id/edit' />
    <Route component={RuanganView} onEnter={requireAuth} path='/ruangan' />
    <Route component={AddRuanganView} onEnter={requireAuth} path='/add/ruangan' />
    <Route component={EditRuanganView} onEnter={requireAuth} path='/ruangan/:id/edit' />
    <Route component={ProdiView} onEnter={requireAuth} path='/prodi' />
    <Route component={AddProdiView} onEnter={requireAuth} path='/add/prodi' />
    <Route component={EditProdiView} onEnter={requireAuth} path='/prodi/:id/edit' />
    <Route component={JurusanView} onEnter={requireAuth} path='/jurusan' />
    <Route component={AddJurusanView} onEnter={requireAuth} path='/add/jurusan' />
    <Route component={EditJurusanView} onEnter={requireAuth} path='/jurusan/:id/edit' />
    <Route component={JabatanView} onEnter={requireAuth}path='/jabatan' />
    <Route component={AddJabatanView} onEnter={requireAuth} path='/add/jabatan' />
    <Route component={EditJabatanView} onEnter={requireAuth} path='/jabatan/:id/edit' />
    <Route component={JadwalView} onEnter={requireAuth} path='/jadwal' />
    <Route component={AddJadwalView} onEnter={requireAuth} path='/add/jadwal' />
    <Route component={EditJadwalView} onEnter={requireAuth} path='/jadwal/:id/edit' />
    <Route component={KehadiranView} onEnter={requireAuth} path='/kehadiran' />
    <Route component={LoginView} path='/login' />
  </Route>
)

function requireAuth (nextState, replaceState) {
  console.log('requireAuth hitted')
  const token = window.localStorage.getItem('auth-key')
  if (!token)
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login')
}
