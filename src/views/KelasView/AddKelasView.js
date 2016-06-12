import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import NS from 'react-notification-system'

import { getProdi } from '../../redux/modules/prodi'
import { addKelas } from '../../redux/modules/kelas'

const form = 'addKelasForm'
const fields = ['kode', 'kelas', 'prodi']

const validate = values => {
  const errors = {}
  if (!values.kode) {
    errors.kode = 'Harus diisi'
  }
  if (!values.kelas) {
    errors.kelas = 'Harus diisi'
  }
  if (!values.prodi) {
    errors.prodi = 'Harus diisi'
  }
  return errors
}

const mapStateToProps = (state) => ({
  isLoading: state.kelas.isLoading,
  message: state.kelas.message,
  prodi: state.prodi.data
})

export class AddKelasView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    prodi: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getProdi())
  }

  tambahData = () => {
    var kelas = {
      kode: this.props.values.kode,
      kelas: this.props.values.kelas,
      id_prodi: this.props.values.prodi
    }
    console.log(kelas)
    this.props.dispatch(addKelas(kelas))
  }

  render () {
    const {fields: {kode, kelas, prodi}, submitting, resetForm} = this.props
    var prodiData = this.props.prodi
    var prodiOption = [<option value='' key=''>Pilih Kelas</option>]
    if (prodiData) {
      for (var x = 0; x < prodiData.data.length; x++) {
        prodiOption.push(<option value={prodiData.data[x].kode}>{prodiData.data[x].prodi}</option>)
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
                      <legend>Tambah Data Kelas</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-12'>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>Kode Kelas</label>
                              <input
                                {...kode}
                                type='text'
                                className={'form-control ' + (kode.touched && kode.error ? 'error' : '')} />
                              {kode.touched && kode.error && <label className='error'>{kode.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>Kelas</label>
                              <input
                                {...kelas}
                                type='text'
                                className={'form-control ' + (kelas.touched && kelas.error ? 'error' : '')} />
                              {kelas.touched && kelas.error && <label className='error'>{kelas.error}</label>}
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label>Program Studi</label>
                              <select
                                {...prodi}
                                type='text'
                                className={'form-control ' + (prodi.touched && prodi.error ? 'error' : '')}>
                                {prodiOption}
                              </select>
                                {prodi.touched && prodi.error && <label className='error'>{prodi.error}</label>}
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
  fields,
  validate
})(AddKelasView))
