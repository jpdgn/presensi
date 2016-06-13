import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'  // in ECMAScript 6

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

  delete = (test, event) => {
    console.log(test)

    var conf = confirm("Anda yakin ingin menghapus ?")
    if(conf) {
      // this.props.dispatch(deleteMahasiswa(test))
      console.log('Youre deleted')
    } else {
      console.log('you do cancel')
    }
  }

  componentDidMount () {
    this.props.dispatch(getDosen())
    this.props.dispatch(getJabatan())
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
    var loader = <div className='ui active inverted dimmer'>
      <div className='ui text loader'>Loading</div>
    </div>
    var data = []
    if (this.props.data && this.props.data.data) {
      var listDosen = this.props.data.data
      for (var i = 0; i < listDosen.length; i++) {
        // row.push(
        //   <tr key={i}>
        //     <td><Link to={'/dosen/' + listDosen[i].nip}>{listDosen[i].nip}</Link></td>
        //     <td>{listDosen[i].nama_dosen}</td>
        //     <td>{listDosen[i].email}</td>
        //     <td>{listDosen[i].jabatan}</td>
        //     <td className='td-actions text-right'>
        //       <Link to={'/dosen/' + listDosen[i].nip + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
        //       <Link to={'/dosen/' + listDosen[i].nip + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
        //       <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></a>
        //     </td>
        //   </tr>
        // )
        data.push({
          nip: listDosen[i].nip,
          nama: listDosen[i].nama_dosen,
          email: listDosen[i].email,
          jabatan: listDosen[i].jabatan,
          action: <div>
            <Link ref='tooltip' title='text' to={'/dosen/' + listDosen[i].nip + '/view'} className='btn btn-info btn-simple btn-xs' data-original-title='View'><i className='fa fa-user'></i></Link>
            <Link to={'/dosen/' + listDosen[i].nip + '/edit'} className='btn btn-success btn-simple btn-xs' data-original-title='Edit'><i className='fa fa-edit'></i></Link>
            <div onClick={this.delete.bind(this, listDosen[i].nip)} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></div>
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
                      <h4 className='title'>Dosen</h4>
                    </div>
                    <div className='content table-responsive'>
                    <div className='fixed-table-toolbar'>
                      <div className='columns columns-right pull-right'>
                        <Link to='add/dosen' className='btn btn-primary btn-fill'>Tambah Data</Link>
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
                            <TableHeaderColumn isKey={true} dataSort={true} dataField="nip" width="160">NIM</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="nama">Nama</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="email">Email</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="jabatan" width="100">Jabatan</TableHeaderColumn>
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
