import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import Notification from '../../components/Notification'

import { getJabatan } from '../../redux/modules/jabatan'
import { addDosen } from '../../redux/modules/dosen'

const form = 'addDosenForm'
const fields = ['nip', 'nama', 'email', 'jabatan', 'noHp', 'tanggal', 'bulan',
'tahun', 'alamatRumah', 'alamatTinggal', 'deviceId']

const validate = values => {
  const errors = {}
  if (!values.nip) {
    errors.nip = 'Harus diisi'
  }
  if (!values.nama) {
    errors.nama = 'Harus diisi'
  }
  if (!values.email) {
    errors.email = 'Harus diisi'
  }
  if (!values.jabatan) {
    errors.jabatan = 'Harus diisi'
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
  if (!values.deviceId) {
    errors.deviceId = 'Harus diisi'
  }
  return errors
}

const mapStateToProps = (state) => ({
  isLoading: state.dosen.isLoading,
  message: state.dosen.message,
  text: state.dosen.text,
  hide: state.dosen.hide,
  jabatan: state.jabatan.data
})

export class AddDosenView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    jabatan: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getJabatan())
  }

  tambahData = () => {
    var tanggal = this.props.values.tanggal
    var bulan = this.props.values.bulan
    var tahun = this.props.values.tahun
    var tanggalLahir = tahun + '-' + bulan + '-' + tanggal
    var dosen = {
      nip: this.props.values.nip,
      nama_dosen: this.props.values.nama,
      email: this.props.values.email,
      tanggal_lahir: tanggalLahir,
      alamat_rumah: this.props.values.alamatRumah,
      alamat_tinggal: this.props.values.alamatRumah,
      no_hp: this.props.values.noHp,
      id_jabatan: this.props.values.jabatan,
      device_id: this.props.values.deviceId
    }
    this.props.dispatch(addDosen(dosen))
  }
  render () {
    const {fields: {nip, nama, email, jabatan, noHp, tanggal, bulan, tahun, alamatRumah,
     alamatTinggal, deviceId}, submitting, resetForm} = this.props
      var jabatanData = this.props.jabatan
      var tanggalLahirOption = [<option value='' key=''>Pilih Tanggal</option>]
      var tahunLahirOption = [<option value='' key=''>Pilih Tahun</option>]
      var tahunMasukOption = [<option value='' key=''>Pilih Tahun Masuk</option>]
      var jabatanOption = [<option value='' key=''>Pilih Jabatan</option>]
      if (jabatanData) {
        for (var i = 1; i <= 31; i++) {
          tanggalLahirOption.push(<option value={i < 10 ? '0' + i : i} key={i}>{i < 10 ? '0' + i : i}</option>)
        }
        for (var j = 1950; j <= 1995; j++) {
          tahunLahirOption.push(<option value={j} key={j}>{j}</option>)
        }
        for (var k = 2011; k <= 2016; k++) {
          tahunMasukOption.push(<option value={k} key={k}>{k}</option>)
        }
        for (var x = 0; x < jabatanData.data.length; x++) {
          jabatanOption.push(<option value={jabatanData.data[x].kode} key={jabatanData.data[x].kode}>{jabatanData.data[x].jabatan}</option>)
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
                      <legend>Tambah Data Dosen</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-12'>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>NIP</label>
                              <input
                                {...nip}
                                type='text'
                                className={'form-control ' + (nip.touched && nip.error ? 'error' : '')} />
                              {nip.touched && nip.error && <label className='error'>{nip.error}</label>}
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
                              <label>Jabatan</label>
                              <select
                                {...jabatan}
                                className={'form-control ' + (jabatan.touched && jabatan.error ? 'error' : '')}>
                                {jabatanOption}
                              </select>
                              {jabatan.touched && jabatan.error && <label className='error'>{jabatan.error}</label>}
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
                                className={'form-control ' + (tanggal.touched && tanggal.error ? 'error' : '')} >
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
                                className={'form-control ' + (bulan.touched && bulan.error ? 'error' : '')} >
                                <option value=''>Bulan</option>
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
                                className={'form-control ' + (tahun.touched && tahun.error ? 'error' : '')} >
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
                        </div>
                        <div className='footer text-center'>
                          <button
                            id='asd'
                            type='submit'
                            className='btn btn-fill btn-info btn-wd'
                            disabled={submitting}
                            onClick={this.props.handleSubmit(this.tambahData)}>Simpan</button>
                          <button
                            type='button'
                            className='btn btn-fill btn-info btn-wd'
                            disabled={submitting}
                            onClick={resetForm}>Reset</button>
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
})(AddDosenView))
