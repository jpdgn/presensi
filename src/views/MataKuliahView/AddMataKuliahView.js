import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import NS from 'react-notification-system'

import { addMk } from '../../redux/modules/mk'

const form = 'addMataKuliahForm'
const fields = ['kode', 'mata_kuliah', 'bobot']
const mapStateToProps = (state) => ({
  isLoading: state.kelas.isLoading,
  message: state.kelas.message
})

export class AddMataKuliahView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string
  }

  componentWillMount () {
  }

  tambahData = () => {
    var tanggal = this.props.values.tanggal
    var bulan = this.props.values.bulan
    var tahun = this.props.values.tahun
    var tanggalLahir = tahun + '-' + bulan + '-' + tanggal
    var mk = {
      kode: this.props.values.kode,
      mata_kuliah: this.props.values.mata_kuliah,
      bobot: this.props.values.bobot
    }
    console.log(mk)
    this.props.dispatch(addMk(mk))
  }

  render () {
    const {fields: {kode, mata_kuliah, bobot}, submitting, resetForm} = this.props
    return (
      <div className='wrapper'>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='header'>
                      <legend>Tambah Data Mata Kuliah</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-12'>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>Kode Mata Kuliah</label>
                              <input
                                {...kode}
                                type='text'
                                className={'form-control ' + (kode.touched && kode.error ? 'error' : '')} />
                              {kode.touched && kode.error && <label className='error'>{kode.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>Mata Kuliah</label>
                              <input
                                {...mata_kuliah}
                                type='text'
                                className={'form-control ' + (mata_kuliah.touched && mata_kuliah.error ? 'error' : '')} />
                              {mata_kuliah.touched && mata_kuliah.error && <label className='error'>{mata_kuliah.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>Bobot</label>
                              <input
                                {...bobot}
                                type='text'
                                className={'form-control ' + (bobot.touched && bobot.error ? 'error' : '')} />
                                {bobot.touched && bobot.error && <label className='error'>{bobot.error}</label>}
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
})(AddMataKuliahView))
