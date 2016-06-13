import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

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

  delete = (row, event) => {
    console.log(row)
    var conf = confirm("Anda yakin ingin menghapus ?")
    if(conf) {
      // this.props.dispatch(deleteMahasiswa(test))
      console.log('Youre deleted')
    } else {
      console.log('you do cancel')
    }
  }

  componentWillMount () {
    this.props.dispatch(getKelas())
  }
  render () {
    var options = {
      noDataText: "Data tidak ditemukan",
      clearSearch: true,
      paginationShowsTotal: true,
      sizePerPageList: ['5', '10', '25'],
      sizePerPage: 5,
      onDeleteRow: (row) => {
        console.log(row)
      },
      onAddRow: (row) => {
        console.log(row)
      }
    }
    function onRowSelect (row, isSelected) {
      console.log(row)
      console.log("selected: " + isSelected)
    }
    var selectRowProp = {
      mode: "radio",
      clickToSelect: true,
      bgColor: "rgb(241, 241, 241)",
      onSelect: onRowSelect
    }
    var row = []
    var data = []

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
        // row.push(
        //   <tr>
        //     <td><Link to={'kelas/' + (listKelas[i].kode)}>{listKelas[i].kode}</Link></td>
        //     <td>{listKelas[i].kelas.toUpperCase()}</td>
        //     <td className='td-actions text-right'>
        //       <Link to={'/kelas/' + listKelas[i].kode + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
        //       <Link to={'/kelas/' + listKelas[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
        //       <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></a>
        //     </td>
        //   </tr>
        // )
        data.push({
          kode: listKelas[i].kode,
          kelas: listKelas[i].kelas,
          action: <div>
            <Link ref='tooltip' title='text' to={'/kelas/' + listKelas[i].kode + '/view'} className='btn btn-info btn-simple btn-xs' data-original-title='View'><i className='fa fa-user'></i></Link>
            <Link to={'/kelas/' + listKelas[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs' data-original-title='Edit'><i className='fa fa-edit'></i></Link>
            <div onClick={this.delete.bind(this, listKelas[i].kode)} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></div>
          </div>
        })
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
                        <BootstrapTable
                          data={data}
                          hover={true}
                          pagination={true}
                          deleteRow={true}
                          search={true}
                          searchPlaceholder="Cari"
                          exportCSV={true}
                          selectRow={selectRowProp}
                          options={options}>
                            <TableHeaderColumn isKey={true} dataSort={true} dataField="kode" width="160">KODE KELAS</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="kelas">KELAS</TableHeaderColumn>
                            <TableHeaderColumn dataField="action" width="100">Action</TableHeaderColumn>
                        </BootstrapTable>
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
