import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'

import { getDosenByNip } from '../../redux/modules/dosen'
import { getJabatan } from '../../redux/modules/jabatan'

const form = 'formMahasiswa'
const fields = ['nimOnDelete']

const mapStateToProps = (state) => ({
  data: state.dosen.data,
  nip: state.dosen.nip,
  jabatan: state.jabatan.data,
  isLoading: state.mahasiswa.isLoadingData
})

export class DetailDosenView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    nip: PropTypes.string
  }

  handleHapusData = (nim) => {
    let { dispatch } = this.props
    console.log(nim)
    dispatch(nimOnDelete(nim))
  }

  componentWillMount () {
    this.props.dispatch(getDosenByNip(this.props.params.nip))
    this.props.dispatch(getJabatan())
  }
  render () {
    if (this.props.data) {
      var dataDosen = this.props.data
    }
    return (
      <div>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
            <h4 className='title text-center'>Detil Mahasiswa</h4>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='tab-content'>
                    <div className='tab-pane active' id='description-logo'>
                      <div className='card'>
                        <div className='header'>
                            <h4 className='title'>Informasi Diri</h4>
                        </div>
                        <div className='content'>
                          <div className='row'>
                            <div className='form-group col-md-6'>
                              <label>Nama</label>
                              <p>{dataDosen.nama_dosen}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Email</label>
                              <p>{dataDosen.email}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Tanggal Lahir</label>
                              <p>{dataDosen.tanggal_lahir}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Nomor Handphone</label>
                              <p>{dataDosen.no_hp}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Alamat Rumah</label>
                              <p>{dataDosen.alamat_rumah}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Alamat Tinggal</label>
                              <p>{dataDosen.alamat_tinggal}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='tab-content'>
                    <div className='tab-pane active' id='description-logo'>
                      <div className='card'>
                        <div className='header'>
                            <h4 className='title'>Detil Pendidikan</h4>
                        </div>
                        <div className='content'>
                          <div className='row'>
                            <div className='form-group col-md-6'>
                              <label>NIP</label>
                              <p>{dataDosen.nip}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Jabatan</label>
                              <p>{dataDosen.jabatan}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Device ID</label>
                              <p>{dataDosen.device_id}</p>
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
})(DetailDosenView))
