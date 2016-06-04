import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'
import { updateRuangan } from '../../redux/modules/ruangan'

const form = 'editRuanganForm'
const fields = ['kode', 'ruangan', 'lantai', 'lat_a', 'lat_b', 'long_a', 'long_b', 'status']

import { getRuanganById } from '../../redux/modules/ruangan'
const mapStateToProps = (state) => ({
  data: state.ruangan.data,
  isLoading: state.ruangan.isLoading,
  message: state.ruangan.message
})

export class EditRuanganView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string
  }

  componentWillMount () {
    this.props.dispatch(getRuanganById(this.props.params.id))
  }

  ubahData = () => {
    let { dispatch } = this.props
    var kode = this.props.values.kode
    var ruangan = {
      ruangan: this.props.values.ruangan,
      lantai: this.props.values.lantai,
      latitude_a: this.props.values.lat_a,
      latitude_b: this.props.values.lat_b,
      longitude_a: this.props.values.long_a,
      longitude_b: this.props.values.long_b,
      status: this.props.values.status
    }
    console.log(ruangan)
    dispatch(updateRuangan(kode, ruangan))
  }

  render () {
    const {fields: {kode, ruangan, lantai, lat_a, lat_b,
    long_a, long_b, status}} = this.props
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
                      <legend>UBAH DATA RUANGAN</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label>KODE RUANGAN</label>
                            <input
                              {...kode}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label>NAMA RUANGAN</label>
                            <input
                              {...ruangan}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-10'>
                          <div className='form-group'>
                            <label>LANTAI</label>
                            <input
                              {...lantai}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>LATITUDE A</label>
                            <input
                              {...lat_a}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>LATITUDE B</label>
                            <input
                              {...lat_b}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>LONGITUDE A</label>
                            <input
                              {...long_a}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>LONGITUDE B</label>
                            <input
                              {...long_b}
                              type='text'
                              className='form-control' />
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
})(EditRuanganView))
