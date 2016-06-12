import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'
import { getProdiById } from '../../redux/modules/prodi'

const form = 'formProdi'
const fields = ['nimOnDelete']

const mapStateToProps = (state) => ({
  data: state.prodi.data,
  isLoading: state.mahasiswa.isLoadingData
})

export class DetailProdiView extends Component {
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
    this.props.dispatch(getProdiById(this.props.params.id))
  }
  render () {
    if (this.props.data) {
      var dataProdi = this.props.data.data[0]
    }
    return (
      <div className='wrapper'>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
            <h4 className='title text-center'>Detail Program Studi</h4>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='tab-content'>
                    <div className='tab-pane active' id='description-logo'>
                      <div className='card'>
                        <div className='header'>
                            <h4 className='title'></h4>
                        </div>
                        <div className='content'>
                          <div className='row'>
                            <div className='form-group col-md-6'>
                              <label>KODE PROGRAM STUDI</label>
                              <p>{dataProdi.kode ? dataProdi.kode : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>NAMA PROGRAM STUDI</label>
                              <p>{dataProdi.prodi ? dataProdi.prodi : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>JURUSAN</label>
                              <p>{dataProdi.jurusan ? dataProdi.jurusan : 'Memuat data'}</p>
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
})(DetailProdiView))
