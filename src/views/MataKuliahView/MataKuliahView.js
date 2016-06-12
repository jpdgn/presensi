import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getMk } from '../../redux/modules/mk'

const mapStateToProps = (state) => ({
  data: state.mk.data,
  isLoading: state.mk.isLoadingData
})

export class MataKuliahView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentWillMount () {
    this.props.dispatch(getMk())
  }
  render () {
    var row = []
    if (this.props.data && this.props.data) {
      var listMk = this.props.data.data
      for (var i = 0; i < listMk.length; i++) {
        row.push(
          <tr>
            <td><Link to={'mata-kuliah/' + (listMk[i].kode)}>{listMk[i].kode}</Link></td>
            <td>{listMk[i].mata_kuliah}</td>
            <td>{listMk[i].bobot}</td>
            <td className='td-actions text-right'>
              <Link to={'/mata-kuliah/' + listMk[i].kode + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
              <Link to={'/mata-kuliah/' + listMk[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
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
                      <h4 className='title'>Mata Kuliah</h4>
                    </div>
                    <div className='content table-responsive'>
                    <div className='fixed-table-toolbar'>
                      <div className='columns columns-right pull-right'>
                        <Link to='add/mata-kuliah' className='btn btn-primary btn-fill'>Tambah Data</Link>
                      </div>
                    </div>
                      <div className='fixed-table-container'>
                        <table className='table table-hover'>
                          <thead>
                            <tr>
                              <th>Kode Mata Kuliah</th>
                              <th>Nama Mata Kuliah</th>
                              <th>Bobot SKS</th>
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
      //       <MataKuliah data={this.props.data} isLoading={this.props.isLoading}/>
      //     </div>
      //   </div>
      // </div>
    )
  }
}

export default connect(mapStateToProps)(MataKuliahView)
