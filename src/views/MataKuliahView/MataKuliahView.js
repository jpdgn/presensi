import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'  // in ECMAScript 6

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

  componentWillMount () {
    this.props.dispatch(getMk())
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
    if (this.props.data && this.props.data) {
      var listMk = this.props.data.data
      for (var i = 0; i < listMk.length; i++) {
        // row.push(
        //   <tr>
        //     <td><Link to={'mata-kuliah/' + (listMk[i].kode)}>{listMk[i].kode}</Link></td>
        //     <td>{listMk[i].mata_kuliah}</td>
        //     <td>{listMk[i].bobot}</td>
        //     <td className='td-actions text-right'>
        //       <Link to={'/mata-kuliah/' + listMk[i].kode + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
        //       <Link to={'/mata-kuliah/' + listMk[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
        //       <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></a>
        //     </td>
        //   </tr>
        // )
        data.push({
          kode: listMk[i].kode,
          mata_kuliah: listMk[i].mata_kuliah,
          bobot: listMk[i].bobot,
          action: <div>
            <Link ref='tooltip' title='text' to={'/mata-kuliah/' + listMk[i].kode + '/view'} className='btn btn-info btn-simple btn-xs' data-original-title='View'><i className='fa fa-user'></i></Link>
            <Link to={'/mata-kuliah/' + listMk[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs' data-original-title='Edit'><i className='fa fa-edit'></i></Link>
            <div onClick={this.delete.bind(this, listMk[i].kode)} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></div>
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
                      <h4 className='title'>Mata Kuliah</h4>
                    </div>
                    <div className='content table-responsive'>
                    <div className='fixed-table-toolbar'>
                      <div className='columns columns-right pull-right'>
                        <Link to='add/mata-kuliah' className='btn btn-primary btn-fill'>Tambah Data</Link>
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
                          <TableHeaderColumn isKey={true} dataSort={true} dataField="kode" width="160">KODE MATA KULIAH</TableHeaderColumn>
                          <TableHeaderColumn dataSort={true} dataField="mata_kuliah" width='400'>MATA KULIAH</TableHeaderColumn>
                          <TableHeaderColumn dataSort={true} dataField="bobot">BOBOT</TableHeaderColumn>
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
      //       <MataKuliah data={this.props.data} isLoading={this.props.isLoading}/>
      //     </div>
      //   </div>
      // </div>
    )
  }
}

export default connect(mapStateToProps)(MataKuliahView)
