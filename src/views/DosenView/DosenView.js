import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getDosen } from '../../redux/modules/dosen'
import { getJabatan } from '../../redux/modules/jabatan'

const mapStateToProps = (state) => ({
  data: state.dosen.data,
  isLoading: state.dosen.isLoadingData,
  message: state.dosen.message,
  jabatan: state.jabatan.data
})

export class DosenView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    jabatan: PropTypes.object
  }

  componentDidMount () {
    this.props.dispatch(getDosen())
    this.props.dispatch(getJabatan())
  }
  render () {
    var row = []
    var loader = <div className='ui active inverted dimmer'>
      <div className='ui text loader'>Loading</div>
    </div>
    if (this.props.data && this.props.data.data) {
      var listDosen = this.props.data.data
      for (var i = 0; i < listDosen.length; i++) {
        row.push(
          <tr key={i}>
            <td><Link to={'/dosen/' + listDosen[i].nip}>{listDosen[i].nip}</Link></td>
            <td>{listDosen[i].nama_dosen}</td>
            <td>{listDosen[i].email}</td>
            <td>{listDosen[i].jabatan}</td>
            <td className='td-actions text-right'>
              <Link to={'/dosen/' + listDosen[i].nip + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
              <Link to={'/dosen/' + listDosen[i].nip + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
              <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></a>
            </td>
          </tr>
        )
      }
    }
    return (
      <div className='wrapper'>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='header'>
                      <h4 className='title'>Dosen</h4>
                    </div>
                    <div className='content table-responsive'>
                    <div className='fixed-table-toolbar'>
                      <div className='columns columns-right pull-right'>
                        <Link to='add/dosen' className='btn btn-primary btn-fill'>Tambah Data</Link>
                      </div>
                    </div>
                      <div className='fixed-table-container'>
                        <table className='table table-hover'>
                          <thead>
                            <tr>
                              <th>NIP</th>
                              <th>Nama</th>
                              <th>Email</th>
                              <th>Jabatan</th>
                              <th className='text-right'>Action</th>
                            </tr>
                          </thead>
                          <tbody>
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
      // <div>
      //   <TopMenu/>
      //   <div className='row'>
      //     <div className='ui grid container'>
      //       <Menu/>
      //       <Dosen
      //         data={this.props.data}
      //         message={this.props.message}
      //         isLoading={this.props.isLoading}
      //         jabatan={this.props.jabatan}/>
      //     </div>
      //   </div>
      // </div>
    )
  }
}

export default connect(mapStateToProps)(DosenView)
