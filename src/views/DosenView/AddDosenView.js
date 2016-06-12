import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import NS from 'react-notification-system'

import { getJabatan } from '../../redux/modules/jabatan'
import { addDosen } from '../../redux/modules/dosen'

const form = 'addDosenForm'
const fields = ['nip', 'nama', 'email', 'jabatan', 'noHp', 'tanggal', 'bulan',
'tahun', 'alamatRumah', 'alamatTinggal', 'deviceId']

const mapStateToProps = (state) => ({
  isLoading: state.dosen.isLoading,
  message: state.dosen.message,
  jabatan: state.jabatan.data
})

export class AddDosenView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
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
    console.log(dosen)
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
          jabatanOption.push(<option value={jabatanData.data[x].kode}>{jabatanData.data[x].jabatan}</option>)
        }
      }
    return (
      <div>
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
                              <label>Kelas</label>
                              <select
                                {...jabatan}
                                className='form-control'>
                                {jabatanOption}
                              </select>
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
                                className='form-control' />
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Tanggal Lahir</label>
                              <select
                                {...tanggal}
                                className='form-control'>
                                {tanggalLahirOption}
                              </select>
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Bulan Lahir</label>
                              <select
                                {...bulan}
                                className='form-control'>
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
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Tahun Lahir</label>
                              <select
                                {...tahun}
                                className='form-control'>
                                {tahunLahirOption}
                              </select>
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
                                className='form-control' />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>Alamat Tinggal</label>
                              <input
                                {...alamatTinggal}
                                type='text'
                                className='form-control' />
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
                                className='form-control' />
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
                  <NS ref="notificationSystem" />
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
  fields
})(AddDosenView))
