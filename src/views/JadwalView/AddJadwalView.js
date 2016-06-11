import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'

import { getKelas } from '../../redux/modules/kelas'
import { getSemester } from '../../redux/modules/semester'
import { getAkademik } from '../../redux/modules/akademik'
import { getRuangan } from '../../redux/modules/ruangan'
import { getMk } from '../../redux/modules/mk'
import { getDosen } from '../../redux/modules/dosen'

const form = 'addJadwalForm'
const fields = ['kode', 'hari', 'jam_mulai', 'jam_selesai', 'kelas', 'semester', 'akademik',
'ruangan', 'mata_kuliah', 'dosen']

const mapStateToProps = (state) => ({
  data: state.jadwal.data,
  isLoading: state.jadwal.isLoading,
  message: state.jadwal.message,
  kelas: state.kelas.data,
  semester: state.semester.data,
  akademik: state.akademik.data,
  ruangan: state.ruangan.data,
  mk: state.mk.data,
  dosen: state.dosen.data
})

export class AddJadwalView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    kelas: PropTypes.object,
    semester: PropTypes.object,
    akademik: PropTypes.object,
    ruangan: PropTypes.object,
    mk: PropTypes.object,
    dosen: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getKelas())
    this.props.dispatch(getSemester())
    this.props.dispatch(getAkademik())
    this.props.dispatch(getRuangan())
    this.props.dispatch(getMk())
    this.props.dispatch(getDosen())
  }

  tambahData = () => {
    let { dispatch } = this.props
    var kode = this.props.values.kode
    var jadwal = {
      hari: this.props.values.hari,
      jam_mulai: this.props.values.jam_mulai,
      jam_selesai: this.props.values.jam_selesai,
      id_kelas: this.props.values.kelas,
      id_semester: this.props.values.semester,
      id_akademik: this.props.values.akademik,
      id_ruangan: this.props.values.ruangan,
      id_mk: this.props.values.mata_kuliah,
      id_dosen: this.props.values.dosen
    }
    console.log(jadwal)
    dispatch(updateJadwal(kode, jadwal))
  }

  render () {
    const {fields: {kode, hari, jam_mulai, jam_selesai, kelas, semester, akademik, ruangan, mata_kuliah,
     dosen}} = this.props
    var kelasData = this.props.kelas
    var semesterData = this.props.semester
    var akademikData = this.props.akademik
    var ruanganData = this.props.ruangan
    var mataKuliahData = this.props.mk
    var dosenData = this.props.dosen
    var hariData = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

    var kelasOption = []
    var semesterOption = []
    var akademikOption = []
    var ruanganOption = []
    var mataKuliahOption = []
    var dosenOption = []
    var hariOption = []

    if (kelasData && semesterData && akademikData && ruanganData && mataKuliahOption && dosenData && hariData) {
      for (var a = 0; a < kelasData.data.length; a++) {
        kelasOption.push(<option value={kelasData.data[a].kode}>{kelasData.data[a].kelas}</option>)
      }
      for (var b = 0; b < semesterData.data.length; b++) {
        semesterOption.push(<option value={semesterData.data[b].kode}>{semesterData.data[b].semester}</option>)
      }
      for (var c = 0; c < akademikData.data.length; c++) {
        akademikOption.push(<option value={akademikData.data[c].kode}>{akademikData.data[c].akademik}</option>)
      }
      for (var d = 0; d < ruanganData.data.length; d++) {
        ruanganOption.push(<option value={ruanganData.data[d].kode}>{ruanganData.data[d].ruangan}</option>)
      }
      for (var e = 0; e < mataKuliahData.data.length; e++) {
        mataKuliahOption.push(<option value={mataKuliahData.data[e].kode}>{mataKuliahData.data[e].mata_kuliah}</option>)
      }
      for (var f = 0; f < dosenData.data.length; f++) {
        dosenOption.push(<option value={dosenData.data[f].nip}>{dosenData.data[f].nama_dosen}</option>)
      }
      for (var g = 0; g < hariData.length; g++) {
        hariOption.push(<option value={g + 1}>{hariData[g]}</option>)
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
                      <legend>TAMBAH DATA JADWAL</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>KODE JADWAL</label>
                            <input
                              {...kode}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>HARI</label>
                            <select
                              {...hari}
                              className='form-control'>
                              {hariOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>JAM MULAI</label>
                            <select
                              className='form-control'
                              {...jam_mulai}>
                              <option value='07:30:00'>07:30:00</option>
                              <option value='08:20:00'>08:20:00</option>
                              <option value='09:10:00'>09:10:00</option>
                              <option value='10:00:00'>10:00:00</option>
                              <option value='10:50:00'>10:50:00</option>
                              <option value='11:40:00'>11:40:00</option>
                              <option value='12:30:00'>12:30:00</option>
                              <option value='13:20:00'>13:20:00</option>
                              <option value='14:10:00'>14:10:00</option>
                              <option value='15:00:00'>15:00:00</option>
                              <option value='15:50:00'>15:50:00</option>
                              <option value='16:40:00'>16:40:00</option>
                              <option value='17:30:00'>17:30:00</option>
                              <option value='18:20:00'>18:20:00</option>
                              <option value='19:10:00'>19:10:00</option>
                              <option value='20:00:00'>20:00:00</option>
                              <option value='20:50:00'>20:50:00</option>
                              <option value='21:40:00'>21:40:00</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>JAM SELESAI</label>
                            <select
                              className='form-control'
                              {...jam_selesai}>
                              <option value='07:30:00'>07:30:00</option>
                              <option value='08:20:00'>08:20:00</option>
                              <option value='09:10:00'>09:10:00</option>
                              <option value='10:00:00'>10:00:00</option>
                              <option value='10:50:00'>10:50:00</option>
                              <option value='11:40:00'>11:40:00</option>
                              <option value='12:30:00'>12:30:00</option>
                              <option value='13:20:00'>13:20:00</option>
                              <option value='14:10:00'>14:10:00</option>
                              <option value='15:00:00'>15:00:00</option>
                              <option value='15:50:00'>15:50:00</option>
                              <option value='16:40:00'>16:40:00</option>
                              <option value='17:30:00'>17:30:00</option>
                              <option value='18:20:00'>18:20:00</option>
                              <option value='19:10:00'>19:10:00</option>
                              <option value='20:00:00'>20:00:00</option>
                              <option value='20:50:00'>20:50:00</option>
                              <option value='21:40:00'>21:40:00</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>KELAS</label>
                            <select
                              className='form-control'
                              {...kelas}>
                              {kelasOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>SEMESTER</label>
                            <select
                              className='form-control'
                              {...semester}>
                              {semesterOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>AKADEMIK</label>
                            <select
                              className='form-control'
                              {...akademik}>
                              {akademikOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>RUANGAN</label>
                            <select
                              className='form-control'
                              {...ruangan}>
                              {ruanganOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>MATA KULIAH</label>
                            <select
                              className='form-control'
                              {...mata_kuliah}>
                              {mataKuliahOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>DOSEN</label>
                            <select
                              className='form-control'
                              {...dosen}>
                              {dosenOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-8 col-md-offset-2 footer text-center'>
                          <button
                            type='submit'
                            className='btn btn-fill btn-info btn-wd'
                            onClick={this.props.handleSubmit(this.tambahData)}>Simpan</button>
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
})(AddJadwalView))
