import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getRuangan } from '../../redux/modules/ruangan'

const mapStateToProps = (state) => ({
  data: state.ruangan.data,
  isLoading: state.ruangan.isLoadingData
})

export class RuanganView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentWillMount () {
    this.props.dispatch(getRuangan())
  }
  render () {
    var row = []
    if (this.props.data) {
      var listRuangan = this.props.data.data
      for (var i = 0; i < listRuangan.length; i++) {
        row.push(
          <tr>
            <td><Link to={'ruangan/' + (listRuangan[i].kode)}>{listRuangan[i].kode}</Link></td>
            <td>{listRuangan[i].ruangan}</td>
            <td>{listRuangan[i].lantai}</td>
            <td>{listRuangan[i].status}</td>
            <td className='td-actions text-right'>
              <Link to={'/ruangan/' + listRuangan[i].kode + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
              <Link to={'/ruangan/' + listRuangan[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
              <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></a>
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
                      <h4 className='title'>Ruangan</h4>
                    </div>
                    <div className='content table-responsive'>
                      <div className='fixed-table-container'>
                        <table className='table table-hover'>
                          <thead>
                            <tr>
                              <th>Kode Ruangan</th>
                              <th>Nama Ruangan</th>
                              <th>Lantai</th>
                              <th>Status Ruangan</th>
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

export default connect(mapStateToProps)(RuanganView)
