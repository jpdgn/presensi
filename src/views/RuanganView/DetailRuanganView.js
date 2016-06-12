import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'
import { getRuanganById } from '../../redux/modules/ruangan'

const form = 'formProdi'
const fields = []

const mapStateToProps = (state) => ({
  data: state.ruangan.data,
  isLoading: state.mahasiswa.isLoadingData
})

export class DetailRuanganView extends Component {
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
    this.props.dispatch(getRuanganById(this.props.params.id))
  }
  render () {
    if (this.props.data) {
      var dataRuangan = this.props.data.data[0]
    }
    return (
      <div className='wrapper'>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
            <h4 className='title text-center'>Detail Ruangan</h4>
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
                              <label>KODE RUANGAN</label>
                              <p>{dataRuangan.kode ? dataRuangan.kode : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>NAMA RUANGAN</label>
                              <p>{dataRuangan.ruangan ? dataRuangan.ruangan : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>LANTAI</label>
                              <p>{dataRuangan.lantai ? dataRuangan.lantai : 'Memuat data'}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>LATITUDE LONGITUDE A</label>
                              <p>{dataRuangan.latlong_a}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>LATITUDE LONGITUDE B</label>
                              <p>{dataRuangan.latlong_b}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>LATITUDE LONGITUDE C</label>
                              <p>{dataRuangan.latlong_c}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>LATITUDE LONGITUDE D</label>
                              <p>{dataRuangan.latlong_d}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>STATUS RUANGAN</label>
                              <p>{dataRuangan.status}</p>
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
})(DetailRuanganView))
