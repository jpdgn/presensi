import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import { getJurusan } from '../../redux/modules/jurusan'

const mapStateToProps = (state) => ({
  data: state.jurusan.data,
  isLoading: state.jurusan.isLoadingData
})

export class JurusanView extends Component {
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
    this.props.dispatch(getJurusan())
  }
  render () {
    var options = {
      noDataText: "Data tidak ditemukan",
      clearSearch: true,
      paginationShowsTotal: true,
      sizePerPageList: ['5', '10', '25'],
      sizePerPage: 5,
      deleteText: 'Hapus',
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
      var listJurusan = this.props.data.data
      for (var i = 0; i < listJurusan.length; i++) {
        // row.push(
        //   <tr>
        //     <td><Link to={'jurusan/' + (listJurusan[i].kode)}>{listJurusan[i].kode}</Link></td>
        //     <td>{listJurusan[i].jurusan.toUpperCase()}</td>
        //     <td className='td-actions text-right'>
        //       <Link to={'/jurusan/' + listJurusan[i].kode + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
        //       <Link to={'/jurusan/' + listJurusan[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
        //       <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></a>
        //     </td>
        //   </tr>
        // )
        data.push({
          kode: listJurusan[i].kode,
          jurusan: listJurusan[i].jurusan,
          action: <div>
            <Link ref='tooltip' title='text' to={'/jurusan/' + listJurusan[i].kode + '/view'} className='btn btn-info btn-simple btn-xs' data-original-title='View'><i className='fa fa-user'></i></Link>
            <Link to={'/jurusan/' + listJurusan[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs' data-original-title='Edit'><i className='fa fa-edit'></i></Link>
            <div onClick={this.delete.bind(this, listJurusan[i].kode)} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></div>
          </div>
        })
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
                      <h4 className='title'>Jurusan</h4>
                    </div>
                    <div className='content table-responsive'>
                      <div className='fixed-table-container'>
                        <BootstrapTable
                          data={data}
                          hover={true}
                          bordered={false}
                          pagination={true}
                          deleteRow={true}
                          search={true}
                          searchPlaceholder="Cari"
                          exportCSV={true}
                          selectRow={selectRowProp}
                          options={options}>
                            <TableHeaderColumn isKey={true} dataSort={true} dataField="kode" width="160">KODE JURUSAN</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="jurusan">JURUSAN</TableHeaderColumn>
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

export default connect(mapStateToProps)(JurusanView)
