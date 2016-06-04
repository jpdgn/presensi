import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { updateKelas } from '../../redux/modules/kelas'
import { getKelasById } from '../../redux/modules/kelas'
import { getProdi } from '../../redux/modules/prodi'

const form = 'editKelasForm'
const fields = ['kode', 'kelas', 'prodi']

const mapStateToProps = (state) => ({
  data: state.kelas.data,
  isLoading: state.kelas.isLoading,
  message: state.kelas.message,
  prodi: state.prodi.data
})

export class EditKelasView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    prodi: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getKelasById(this.props.params.id))
    this.props.dispatch(getProdi())
  }
  ubahData = () => {
    let { dispatch } = this.props
    var kelas = {
      kode: this.props.values.kode,
      kelas: this.props.values.kelas,
      id_prodi: this.props.values.prodi
    }
    console.log(kelas)
    dispatch(updateKelas(nim, kelas))
  }
  render () {
    const {fields: {kode, kelas, prodi}} = this.props
    var prodiData = this.props.prodi
    var prodiOption = []

    for (var x = 0; x < prodiData.data.length; x++) {
      prodiOption.push(<option value={prodiData.data[x].kode}>{prodiData.data[x].prodi.toUpperCase()}</option>)
    }
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
                      <legend>UBAH DATA KELAS</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label>KODE KELAS</label>
                            <input
                              {...kode}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label>NAMA KELAS</label>
                            <input
                              {...kelas}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label>PROGRAM STUDI</label>
                            <select
                              className='form-control'
                              {...prodi}>
                              {prodiOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-8 footer text-center'>
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
})(EditKelasView))
