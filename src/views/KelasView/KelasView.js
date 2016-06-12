import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getKelas } from '../../redux/modules/kelas'

const mapStateToProps = (state) => ({
  data: state.kelas.data,
  isLoading: state.kelas.isLoadingData
})

export class KelasView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentWillMount () {
    this.props.dispatch(getKelas())
  }
  render () {
    var row = []
    if (this.props.data) {
      var listKelas = this.props.data.data
      var pageTotal = Math.ceil(listKelas.length / 5)
      var page = []
      for (var a = 0; a < pageTotal; a++) {
        page.push(
          <a className='item'>{a + 1}</a>
        )
      }
      console.log(pageTotal)
      for (var i = 0; i < listKelas.length; i++) {
        row.push(
          <tr>
            <td><Link to={'kelas/' + (listKelas[i].kode)}>{listKelas[i].kode}</Link></td>
            <td>{listKelas[i].kelas.toUpperCase()}</td>
            <td className='td-actions text-right'>
              <Link to={'/kelas/' + listKelas[i].kode + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
              <Link to={'/kelas/' + listKelas[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
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
                      <h4 className='title'>Kelas</h4>
                    </div>
                    <div className='content table-responsive'>
                      <div className='fixed-table-toolbar'>
                        <div className='columns columns-right pull-right'>
                          <Link to='add/kelas' className='btn btn-primary btn-fill'>Tambah Data</Link>
                        </div>
                      </div>
                      <div className='fixed-table-container'>
                        <table className='table table-hover'>
                          <thead>
                            <tr>
                              <th>Kode Kelas</th>
                              <th>Nama Kelas</th>
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
    )
  }
}

export default connect(mapStateToProps)(KelasView)
