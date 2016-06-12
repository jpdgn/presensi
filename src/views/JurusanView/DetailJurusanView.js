import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'
import { getJurusanById } from '../../redux/modules/jurusan'

const form = 'formProdi'
const fields = ['nimOnDelete']

const mapStateToProps = (state) => ({
  data: state.jurusan.data,
  isLoading: state.mahasiswa.isLoadingData
})

export class DetailJurusanView extends Component {
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
    this.props.dispatch(getJurusanById(this.props.params.id))
  }
  render () {
    if (this.props.data) {
      var dataJurusan = this.props.data.data[0]
    }
    return (
      <div className='wrapper'>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
            <h4 className='title text-center'>Detail Jurusan</h4>
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
                              <label>KODE JURUSAN</label>
                              <p>{dataJurusan.kode ? dataJurusan.kode : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>NAMA JURUSAN</label>
                              <p>{dataJurusan.jurusan ? dataJurusan.jurusan : 'Memuat data'}</p>
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
})(DetailJurusanView))
