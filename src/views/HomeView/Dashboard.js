import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { getMahasiswaData } from '../../redux/modules/mahasiswa'

const mapStateToProps = (state) => ({
  data: state.mahasiswa.data,
  rows: state.mahasiswa.rows,
  isLoading: state.mahasiswa.isLoadingData
})

export class Dashboard extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentDidMount () {
    this.props.dispatch(getMahasiswaData())
  }
  render () {
    if (this.props.rows) {
      var totalMahasiswa = this.props.rows
    }
    return (
      <div>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
            <h4 className='title text-center'>Dashboard</h4>
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
                              <label>Total Mahasiswa: </label>
                              <p>{totalMahasiswa ? totalMahasiswa : 'Memuat data'}</p>
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
    )
  }
}

export default connect(mapStateToProps)(Dashboard)
