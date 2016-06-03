import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getDosenByNip } from '../../redux/modules/dosen'
import { getJabatan } from '../../redux/modules/jabatan'
import { updateDosen } from '../../redux/modules/dosen'

const form = 'editDosenForm'
const fields = ['nip', 'nama', 'email', 'jabatan', 'noHp', 'tanggal', 'bulan',
'tahun', 'alamatRumah', 'alamatTinggal', 'deviceId']

const mapStateToProps = (state) => ({
  data: state.dosen.data,
  isLoading: state.dosen.isLoading,
  message: state.dosen.message,
  jabatan: state.jabatan.data
})

export class EditDosenView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    jabatan: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getDosenByNip(this.props.params.nip))
    this.props.dispatch(getJabatan())
  }
  ubahData = () => {
    let { dispatch } = this.props
    var nip = this.props.values.nip
    var tanggal = this.props.values.tanggal
    var bulan = this.props.values.bulan
    var tahun = this.props.values.tahun
    var tanggalLahir = tahun + '-' + bulan + '-' + tanggal
    var dosen = {
      nama_dosen: this.props.values.nama,
      email: this.props.values.email,
      id_jabatan: this.props.values.jabatan,
      no_hp: this.props.values.noHp,
      tanggal_lahir: tanggalLahir,
      alamat_rumah: this.props.values.alamatRumah,
      alamat_tinggal: this.props.values.alamatRumah,
      device_id: this.props.values.deviceId
    }
    console.log(dosen)
    dispatch(updateDosen(nip, dosen))
  }

  render () {
    const {fields: {nip, nama, email, jabatan, noHp, tanggal, bulan, tahun, alamatRumah,
     alamatTinggal, deviceId}} = this.props
    var jabatanData = this.props.jabatan
    var tanggalLahirOption = []
    var tahunLahirOption = []
    var tahunMasukOption = []
    var jabatanOption = []
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
      jabatanOption.push(<option value={jabatanData.data[x].kode} key={x}>{jabatanData.data[x].jabatan.toUpperCase()}</option>)
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
                      <legend>Ubah Data Dosen</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>NIP</label>
                            <input
                              {...nip}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>Nama</label>
                            <input
                              {...nama}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>Email</label>
                            <input
                              {...email}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Jabatan</label>
                            <select
                              {...jabatan}
                              className='form-control'>
                              {jabatanOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>No Hp</label>
                            <input
                              {...noHp}
                              className='form-control' />
                          </div>
                        </div>
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
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>Device ID</label>
                            <input
                              {...deviceId}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='footer text-center'>
                          <button
                            type='submit'
                            className='btn btn-fill btn-info btn-wd'
                            onClick={this.props.handleSubmit(this.ubahData)}>Simpan</button>
                        </div>
                      </div>
                    </div>
                    <div
                      data-notify='container'
                      className={'col-xs-11 col-sm-4 alert alert-info alert-with-icon animated fadeInDown' + (this.props.onUpdate ? '' : ' hide')}
                      role='alert'
                      data-notify-position='bottom-center'
                      style={{display: 'inline-block',
                        margin:' 0 auto',
                        position: 'fixed',
                        transition: 'all 0.5s ease-in-out',
                        zIndex: '1031',
                        bottom: '20',
                        left: '0',
                        right: '0'}}>
                      <button
                        type='button'
                        aria-hidden='true'
                        className='close'
                        data-notify='dismiss'
                        style={{position: 'absolute',
                          right: '10',
                          top: '50%',
                          marginTop: '-13',
                          zIndex: '1033'}}>×</button>
                        <span data-notify='icon' className='pe-7s-gift'></span>
                        <span data-notify='title'></span>
                        <span data-notify='message'>
                        <b>{this.props.successUpdate ? 'Berhasil perbarui data' : 'Gagal perbarui data'}</b></span>
                        <a href='#'
                          target='_blank'
                          data-notify='url'></a>
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
  fields
})(EditDosenView))
