import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'
import SA from 'sweetalert-react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'  // in ECMAScript 6
import 'sweetalert-react/node_modules/sweetalert/dist/sweetalert.css'
var DataTable = require('react-data-components').DataTable
// var DataTable = require('../../components/Datatable/DataTable')

// import * as DataTable from 'react-data-components'
// var DataTable = DataTable.DataTable

import { getMahasiswaData } from '../../redux/modules/mahasiswa'
import { deleteMahasiswa } from '../../redux/modules/mahasiswa'

const form = 'formMahasiswa'
const fields = []

const mapStateToProps = (state) => ({
  data: state.mahasiswa.data,
  nim: state.mahasiswa.nim,
  isLoading: state.mahasiswa.isLoadingData
})

export class MahasiswaView extends Component {
  constructor(props) {
    super(props)
    this.state = {show: false, id: ''}
  }

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

  delete = (test, event) => {
    console.log(test)

    var conf = confirm("Anda yakin ingin menghapus ?")
    if(conf) {
      this.props.dispatch(deleteMahasiswa(test))
      console.log('Youre deleted')
    } else {
      console.log('you do cancel')
    }
  }

  componentDidMount () {
    this.props.dispatch(getMahasiswaData())
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
    var columns = [
      { title: 'NIM', prop: 'nim'  },
      { title: 'NAMA', prop: 'nama' },
      { title: 'EMAIL', prop: 'email' },
      { title: 'KELAS', prop: 'kelas' },
      { title: 'AKADEMIK', prop: 'akademik' },
      { title: 'SEMESTER', prop: 'semester' },
      { title: 'ACTION', prop: 'action' }
    ]
    var data = []
    var loadingText = <tr>Sedang memuat data</tr>
    if (this.props.data && this.props.data.data) {
      var listMahasiswa = this.props.data.data
      for (var i = 0; i < listMahasiswa.length; i++) {
        data.push({
          nim: listMahasiswa[i].nim,
          nama: listMahasiswa[i].nama_mhs,
          email: listMahasiswa[i].email,
          kelas: listMahasiswa[i].kelas,
          akademik: listMahasiswa[i].akademik,
          semester: listMahasiswa[i].semester,
          action: <div>
            <Link ref='tooltip' title='text' to={'/mahasiswa/' + listMahasiswa[i].nim + '/view'} className='btn btn-info btn-simple btn-xs' data-original-title='View'><i className='fa fa-user'></i></Link>
            <Link to={'/mahasiswa/' + listMahasiswa[i].nim + '/edit'} className='btn btn-success btn-simple btn-xs' data-original-title='Edit'><i className='fa fa-edit'></i></Link>
            <div onClick={this.delete.bind(this, listMahasiswa[i].nim)} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></div>
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
                      <h4 className='title'>Mahasiswa</h4>
                    </div>
                    <div className='content table-responsive'>
                      <div className='fixed-table-toolbar'>
                        <div className='columns columns-right pull-right'>
                          <Link to='add/mahasiswa' className='btn btn-primary btn-fill'>Tambah Data</Link>
                        </div>
                      </div>
                      <div className='fixed-table-container'>
                        <div className=''>
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
                            <TableHeaderColumn isKey={true} dataSort={true} dataField="nim" width="110">NIM</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="nama">Nama</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="email">Email</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="kelas" width="70">Kelas</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="akademik" width="90">Akademik</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="semester" width="90">Semester</TableHeaderColumn>
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
