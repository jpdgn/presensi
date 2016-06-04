import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getJurusanById } from '../../redux/modules/jurusan'
import { updateJurusan } from '../../redux/modules/jurusan'

const form = 'editJurusanForm'
const fields = ['kode', 'jurusan']

const mapStateToProps = (state) => ({
  data: state.jurusan.data,
  isLoading: state.jurusan.isLoading,
  message: state.jurusan.message
})

export class EditJurusanView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string
  }

  componentWillMount () {
    this.props.dispatch(getJurusanById(this.props.params.id))
  }

  ubahData = () => {
    let { dispatch } = this.props
    var kode = this.props.values.kode
    var jurusan = {
      jurusan: this.props.values.jurusan
    }
    console.log(jurusan)
    dispatch(updateJurusan(kode, jurusan))
  }

  render () {
    const {fields: {kode, jurusan}} = this.props
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
                      <legend>UBAH DATA JURUSAN</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label>KODE JURUSAN</label>
                            <input
                              {...kode}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label>NAMA JURUSAN</label>
                            <input
                              {...jurusan}
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
})(EditJurusanView))
