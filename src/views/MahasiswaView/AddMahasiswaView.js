import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import Notification from '../../components/Notification'

import { getKelas } from '../../redux/modules/kelas'
import { getSemester } from '../../redux/modules/semester'
import { getAkademik } from '../../redux/modules/akademik'
import { addMahasiswa } from '../../redux/modules/mahasiswa'

const form = 'addMahasiswaForm'
const fields = ['nim', 'nama', 'email', 'kelas', 'noHp', 'tanggal', 'bulan',
'tahun', 'alamatRumah', 'alamatTinggal', 'semester', 'akademik', 'kompensasi', 'deviceId', 'tahunMasuk']

const validate = values => {
  const errors = {}
  if (!values.nim) {
    errors.nim = 'Harus diisi'
  } else if (values.nim.length > 10) {
    errors.nim = 'NIM anda harus valid 10 digit'
  }
  if (!values.nama) {
    errors.nama = 'Harus diisi'
  }
  if (!values.email) {
    errors.email = 'Harus diisi'
  }
  if (!values.kelas) {
    errors.kelas = 'Harus diisi'
  }
  if (!values.noHp) {
    errors.noHp = 'Harus diisi'
  }
  if (!values.tanggal) {
    errors.tanggal = 'Harus diisi'
  }
  if (!values.bulan) {
    errors.bulan = 'Harus diisi'
  }
  if (!values.tahun) {
    errors.tahun = 'Harus diisi'
  }
  if (!values.alamatRumah) {
    errors.alamatRumah = 'Harus diisi'
  }
  if (!values.alamatTinggal) {
    errors.alamatTinggal = 'Harus diisi'
  }
  if (!values.semester) {
    errors.semester = 'Harus diisi'
  }
  if (!values.akademik) {
    errors.akademik = 'Harus diisi'
  }
  if (!values.kompensasi) {
    errors.kompensasi = 'Harus diisi'
  }
  if (!values.deviceId) {
    errors.deviceId = 'Harus diisi'
  }
  if (!values.tahunMasuk) {
    errors.tahunMasuk = 'Harus diisi'
  }
  return errors
}

const mapStateToProps = (state) => ({
  isLoading: state.mahasiswa.isLoading,
  message: state.mahasiswa.message,
  text: state.mahasiswa.text,
  hide: state.mahasiswa.hide,
  kelas: state.kelas.data,
  semester: state.semester.data,
  akademik: state.akademik.data
})

export class AddMahasiswaView extends Component {
  _notificationSystem = null
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    kelas: PropTypes.object,
    semester: PropTypes.object,
    akademik: PropTypes.object,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  componentWillMount () {
    this.props.dispatch(getKelas())
    this.props.dispatch(getSemester())
    this.props.dispatch(getAkademik())
  }

  componentDidMount () {
     this._notificationSystem = this.refs.notificationSystem
  }

  componentDidUpdate () {
    this._notificationSystem = this.refs.notificationSystem
    let { message, onUpdate, successUpdate } = this.props
    if(onUpdate) {
      if(successUpdate) {
        this._notificationSystem.addNotification({
          message: this.props.message,
          level: 'success',
          position: 'bc'
        })
      } else {
        this._notificationSystem.addNotification({
          message: this.props.message,
          level: 'error',
          position: 'bc'
        })
      }
    }
  }

  tambahData = () => {
    var tanggal = this.props.values.tanggal
    var bulan = this.props.values.bulan
    var tahun = this.props.values.tahun
    var tanggalLahir = tahun + '-' + bulan + '-' + tanggal
    var mahasiswa = {
      nim: this.props.values.nim,
      nama_mhs: this.props.values.nama,
      email: this.props.values.email,
      tanggal_lahir: tanggalLahir,
      alamat_rumah: this.props.values.alamatRumah,
      alamat_tinggal: this.props.values.alamatRumah,
      tahun_masuk: this.props.values.tahunMasuk,
      no_hp: this.props.values.noHp,
      kompensasi: this.props.values.kompensasi,
      id_kelas: this.props.values.kelas,
      id_semester: this.props.values.semester,
      id_akademik: this.props.values.akademik,
      device_id: this.props.values.deviceId
    }
    console.log(mahasiswa)
    this.props.dispatch(addMahasiswa(mahasiswa))
  }

  render () {
    const {fields: {nim, nama, email, kelas, noHp, tanggal, bulan, tahun, alamatRumah,
     alamatTinggal, semester, akademik, kompensasi, deviceId, tahunMasuk}, submitting, resetForm} = this.props
    var kelasData = this.props.kelas
    var semesterData = this.props.semester
    var akademikData = this.props.akademik
    var tanggalLahirOption = [<option value='' key=''>Pilih Tanggal</option>]
    var tahunLahirOption = [<option value='' key=''>Pilih Tahun</option>]
    var tahunMasukOption = [<option value='' key=''>Pilih Tahun Masuk</option>]
    var kelasOption = [<option value='' key=''>Pilih Kelas</option>]
    var semesterOption = [<option value='' key=''>Pilih Semester</option>]
    var akademikOption = [<option value='' key=''>Pilih Tahun Akademik</option>]
    if (kelasData && semesterData && akademikData) {
      console.log(kelasData)
      for (var i = 1; i <= 31; i++) {
        tanggalLahirOption.push(<option value={i < 10 ? '0' + i : i} key={i}>{i < 10 ? '0' + i : i}</option>)
      }
      for (var j = 1950; j <= 1995; j++) {
        tahunLahirOption.push(<option value={j} key={j}>{j}</option>)
      }
      for (var k = 2011; k <= 2016; k++) {
        tahunMasukOption.push(<option value={k} key={k}>{k}</option>)
      }
      for (var x = 0; x < kelasData.data.length; x++) {
        kelasOption.push(<option value={kelasData.data[x].kode}>{kelasData.data[x].kelas}</option>)
      }
      for (var y = 0; y < semesterData.data.length; y++) {
        semesterOption.push(<option value={semesterData.data[y].kode}>{semesterData.data[y].semester}</option>)
      }
      for (var z = 0; z < akademikData.data.length; z++) {
        akademikOption.push(<option value={akademikData.data[z].kode}>{akademikData.data[z].akademik}</option>)
      }
    }
    return (
      <div className='wrapper'>
      <Notification text={this.props.text} message={this.props.message} hide={this.props.hide}/>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='header'>
                      <legend>Tambah Data Mahasiswa</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-12'>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>NIM</label>
                              <input
                                {...nim}
                                type='text'
                                className={'form-control ' + (nim.touched && nim.error ? 'error' : '')} />
                              {nim.touched && nim.error && <label className='error'>{nim.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>nama</label>
                              <input
                                {...nama}
                                type='text'
                                className={'form-control ' + (nama.touched && nama.error ? 'error' : '')} />
                              {nama.touched && nama.error && <label className='error'>{nama.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>Email</label>
                              <input
                                {...email}
                                type='text'
                                className={'form-control ' + (email.touched && email.error ? 'error' : '')} />
                                {email.touched && email.error && <label className='error'>{email.error}</label>}
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Kelas</label>
                              <select
                                {...kelas}
                                className={'form-control ' + (kelas.touched && kelas.error ? 'error' : '')}>
                                {kelasOption}
                              </select>
                              {kelas.touched && kelas.error && <label className='error'>{kelas.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Semester</label>
                              <select
                                {...semester}
                                className={'form-control ' + (semester.touched && semester.error ? 'error' : '')}>
                                {semesterOption}
                              </select>
                              {semester.touched && semester.error && <label className='error'>{semester.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Akademik</label>
                              <select
                                {...akademik}
                                className={'form-control ' + (akademik.touched && akademik.error ? 'error' : '')}>
                                {akademikOption}
                              </select>
                              {akademik.touched && akademik.error && <label className='error'>{akademik.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Tahun Masuk</label>
                              <select
                                {...tahunMasuk}
                                className={'form-control ' + (tahunMasuk.touched && tahunMasuk.error ? 'error' : '')}>
                                {tahunMasukOption}
                              </select>
                              {tahunMasuk.touched && tahunMasuk.error && <label className='error'>{tahunMasuk.error}</label>}
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Nomor Handphone</label>
                              <input
                                {...noHp}
                                type='text'
                                className={'form-control ' + (noHp.touched && noHp.error ? 'error' : '')} />
                                {noHp.touched && noHp.error && <label className='error'>{noHp.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Tanggal Lahir</label>
                              <select
                                {...tanggal}
                                className={'form-control ' + (tanggal.touched && tanggal.error ? 'error' : '')}>
                                {tanggalLahirOption}
                              </select>
                              {tanggal.touched && tanggal.error && <label className='error'>{tanggal.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Bulan Lahir</label>
                              <select
                                {...bulan}
                                className={'form-control ' + (bulan.touched && bulan.error ? 'error' : '')}>
                                <option value=''>Pilih Bulan</option>
                                <option value='01'>Januari</option>
                                <option value='02'>Februari</option>
                                <option value='03'>Maret</option>
                                <option value='04'>April</option>
                                <option value='05'>Mei</option>
                                <option value='06'>Juni</option>
                                <option value='07'>Juli</option>
                                <option value='08'>Agustus</option>
                                <option value='09'>September</option>
                                <option value='10'>Oktober</option>
                                <option value='11'>November</option>
                                <option value='12'>Desember</option>
                              </select>
                              {bulan.touched && bulan.error && <label className='error'>{bulan.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Tahun Lahir</label>
                              <select
                                {...tahun}
                                className={'form-control ' + (tahun.touched && tahun.error ? 'error' : '')}>
                                {tahunLahirOption}
                              </select>
                              {tahun.touched && tahun.error && <label className='error'>{tahun.error}</label>}
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>Alamat Rumah</label>
                              <input
                                {...alamatRumah}
                                type='text'
                                className={'form-control ' + (alamatRumah.touched && alamatRumah.error ? 'error' : '')} />
                                {alamatRumah.touched && alamatRumah.error && <label className='error'>{alamatRumah.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>Alamat Tinggal</label>
                              <input
                                {...alamatTinggal}
                                type='text'
                                className={'form-control ' + (alamatTinggal.touched && alamatTinggal.error ? 'error' : '')} />
                                {alamatTinggal.touched && alamatTinggal.error && <label className='error'>{alamatTinggal.error}</label>}
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>Device ID</label>
                              <input
                                {...deviceId}
                                type='text'
                                className={'form-control ' + (deviceId.touched && deviceId.error ? 'error' : '')} />
                              {deviceId.touched && deviceId.error && <label className='error'>{deviceId.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>Jumlah Kompensasi</label>
                              <input
                                {...kompensasi}
                                type='text'
                                className={'form-control ' + (kompensasi.touched && kompensasi.error ? 'error' : '')} />
                              {kompensasi.touched && kompensasi.error && <label className='error'>{kompensasi.error}</label>}
                            </div>
                          </div>
                        </div>
                        <div className='footer text-center'>
                          <button
                            id='asd'
                            type='submit'
                            className='btn btn-fill btn-info btn-wd'
                            onClick={this.props.handleSubmit(this.tambahData)}>Simpan</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: form,
  fields,
  validate
})(AddMahasiswaView))
