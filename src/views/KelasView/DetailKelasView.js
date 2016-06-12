import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'
import { getKelasById } from '../../redux/modules/kelas'

const form = 'formKelas'
const fields = []

const mapStateToProps = (state) => ({
  data: state.kelas.data,
  isLoading: state.kelas.isLoadingData
})

export class DetailKelasView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentWillMount () {
    this.props.dispatch(getKelasById(this.props.params.id))
  }
  render () {
    if (this.props.data) {
      var dataKelas = this.props.data.data[0]
    }
    return (
      <div>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
            <h4 className='title text-center'>Detail Kelas</h4>
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
                              <label>KODE KELAS</label>
                              <p>{dataKelas.kode ? dataKelas.kode : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>NAMA KELAS</label>
                              <p>{dataKelas.kelas ? dataKelas.kelas : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>PROGRAM STUDI</label>
                              <p>{dataKelas.prodi ? dataKelas.prodi : 'Memuat data'}</p>
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
})(DetailKelasView))
