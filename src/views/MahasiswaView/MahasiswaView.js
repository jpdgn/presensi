import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'

import { getMahasiswaData } from '../../redux/modules/mahasiswa'

const form = 'formMahasiswa'
const fields = ['nimOnDelete']

const mapStateToProps = (state) => ({
  data: state.mahasiswa.data,
  nim: state.mahasiswa.nim,
  isLoading: state.mahasiswa.isLoadingData
})

export class MahasiswaView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    nim: PropTypes.string
  }

  handleHapusData = (nim) => {
    let { dispatch } = this.props
    $('.ui.modal')
    .modal('show')
    console.log(nim)
    dispatch(nimOnDelete(nim))
  }

  delete () {
    console.log('haii')
    swal('Hello')
  }

  componentDidMount () {
    this.props.dispatch(getMahasiswaData())
  }
  render () {
    const {fields: {nimOnDelete}} = this.props
    var row = []
    var loadingText = <tr>Sedang memuat data</tr>
    if (this.props.data && this.props.data.data) {
      var listMahasiswa = this.props.data.data
      for (var i = 0; i < listMahasiswa.length; i++) {
        row.push(
          <tr key={i}>
            <td><Link to={'/mahasiswa/' + listMahasiswa[i].nim}>{listMahasiswa[i].nim}</Link></td>
            <td>{listMahasiswa[i].nama_mhs}</td>
            <td>{listMahasiswa[i].email}</td>
            <td>{listMahasiswa[i].kelas}</td>
            <td>{listMahasiswa[i].akademik}</td>
            <td>{listMahasiswa[i].semester}</td>
            <td className='td-actions text-right'>
              <Link rel='tooltip' to={'/mahasiswa/' + listMahasiswa[i].nim + '/view'} className='btn btn-info btn-simple btn-xs' data-original-title='View'><i className='fa fa-user'></i></Link>
              <Link to={'/mahasiswa/' + listMahasiswa[i].nim + '/edit'} className='btn btn-success btn-simple btn-xs' data-original-title='Edit'><i className='fa fa-edit'></i></Link>
              <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs' data-original-title='Delete'><i className='fa fa-times'></i></a>
            </td>
          </tr>
        )
      }
    }

    return (
      <div>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='header'>
                      <h4 className='title'>Mahasiswa</h4>
                    </div>
                    <div className='bootstrap-table'>
                      <div className='fixed-table-container'>
                        <div className='fixed-table-body'>
                          <table id='bootstrap-table' className='table table-hover'>
                            <thead>
                              <tr>
                                <th>NIM</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Kelas</th>
                                <th>Akademik</th>
                                <th>Semester</th>
                                <th className='text-right'>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <div className='fixed-table-loading'>Sedang memuat</div>
                              {row}
                            </tbody>
                          </table>
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
})(MahasiswaView))
