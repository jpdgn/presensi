import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'

import { getJadwalById } from '../../redux/modules/jadwal'

const form = 'formKelas'
const fields = ['nimOnDelete']

const mapStateToProps = (state) => ({
  data: state.jadwal.data,
  isLoading: state.jadwal.isLoadingData
})

export class DetailJadwalView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  handleHapusData = (nim) => {
    let { dispatch } = this.props
    $('.ui.modal')
    .modal('show')
    console.log(nim)
    dispatch(nimOnDelete(nim))
  }

  componentWillMount () {
    this.props.dispatch(getJadwalById(this.props.params.id))
  }
  render () {
    if (this.props.data) {
      var hari = ['Hari', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
      var dataJadwal = this.props.data.data[0]
    }
    return (
      <div>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
            <h4 className='title text-center'>Detail Jadwal</h4>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='tab-content'>
                    <div className='tab-pane active' id='description-logo'>
                      <div className='card'>
                        <div className='header'>
                        </div>
                        <div className='content'>
                          <div className='row'>
                            <div className='form-group col-md-3'>
                              <label>KODE JADWAL</label>
                              <p>{dataJadwal.kode_jadwal ? dataJadwal.kode_jadwal : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-3'>
                              <label>MATA KULIAH</label>
                              <p>{dataJadwal.mk ? dataJadwal.mk : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-3'>
                              <label>DOSEN</label>
                              <p>{dataJadwal.dosen ? dataJadwal.dosen : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-3'>
                              <label>KELAS</label>
                              <p>{dataJadwal.kelas ? dataJadwal.kelas : 'Memuat data'}</p>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='form-group col-md-3'>
                              <label>HARI</label>
                              <p>{dataJadwal.hari ? hari[dataJadwal.hari] : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-3'>
                              <label>RUANGAN</label>
                              <p>{dataJadwal.ruangan ? dataJadwal.ruangan : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-3'>
                              <label>JAM MULAI</label>
                              <p>{dataJadwal.mulai ? dataJadwal.mulai : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-3'>
                              <label>JAM SELESAI</label>
                              <p>{dataJadwal.selesai ? dataJadwal.selesai : 'Memuat data'}</p>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='form-group col-md-3'>
                              <label>SEMESTER</label>
                              <p>{dataJadwal.semester ? dataJadwal.semester : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-3'>
                              <label>AKADEMIK</label>
                              <p>{dataJadwal.akademik ? dataJadwal.akademik : 'Memuat data'}</p>
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
        </div>
      </div>
      // <div className='row'>
      //   <div className='ui grid container'>
      //     <Menu />
      //     <Mahasiswa
      //       nim={this.props.nim}
      //       data={this.props.data}
      //       isLoading={this.props.isLoading}/>
      //   </div>
      // </div>
    )
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: form,
  fields
})(DetailJadwalView))
