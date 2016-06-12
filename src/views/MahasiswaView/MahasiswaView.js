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

const form = 'formMahasiswa'
const fields = ['nimOnDelete']

const mapStateToProps = (state) => ({
  data: state.mahasiswa.data,
  nim: state.mahasiswa.nim,
  isLoading: state.mahasiswa.isLoadingData
})

export class MahasiswaView extends Component {
  constructor(props) {
    super(props);

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

  delete () {
    console.log('haii')
    swal('Hello')
  }

  componentDidMount () {
    this.props.dispatch(getMahasiswaData())
    jQuery(React.findDOMNode(this.refs.tooltip)).tooltip();
    $("#asd").click(function() {
      $.notify({
      	// options
      	icon: 'glyphicon glyphicon-warning-sign',
      	title: 'Bootstrap notify',
      	message: 'Turning standard Bootstrap alerts into "notify" like notifications',
      	url: 'https://github.com/mouse0270/bootstrap-notify',
      	target: '_blank'
      },{
      	// settings
      	element: 'body',
      	position: null,
      	type: "info",
      	allow_dismiss: true,
      	newest_on_top: false,
      	showProgressbar: false,
      	placement: {
      		from: "top",
      		align: "right"
      	},
      	offset: 20,
      	spacing: 10,
      	z_index: 1031,
      	delay: 5000,
      	timer: 1000,
      	url_target: '_blank',
      	mouse_over: null,
      	animate: {
      		enter: 'animated fadeInDown',
      		exit: 'animated fadeOutUp'
      	},
      	onShow: null,
      	onShown: null,
      	onClose: null,
      	onClosed: null,
      	icon_type: 'class',
      	template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
      		'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
      		'<span data-notify="icon"></span> ' +
      		'<span data-notify="title">{1}</span> ' +
      		'<span data-notify="message">{2}</span>' +
      		'<div class="progress" data-notify="progressbar">' +
      			'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      		'</div>' +
      		'<a href="{3}" target="{4}" data-notify="url"></a>' +
      	'</div>'
      })
    })
  }
  render () {
    const {fields: {nimOnDelete}} = this.props
    var options = {
      noDataText: "Data tidak ditemukan",
      clearSearch: {true},
      paginationShowsTotal: {true},
      onDeleteRow: (row) => {
        console.log(row)
      },
      onAddRow: (row) => {
        console.log(row)
      }
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
            <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></a>
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
                            pagination={true}
                            insertRow={true}
                            deleteRow={true}
                            search={true}
                            searchPlaceholder="Cari"
                            exportCSV={true}
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
                      <SA
                        show={this.state.show}
                        title="Hapus Data"
                        text="Apakah anda ingin menghapus data ini ?"
                        showCancelButton
                        confirmButtonColor='#DD6B55'
                        confirmButtonText='Ya, Hapus data ini'
                        cancelButtonText='Batal'
                        onConfirm={() => {
                            swal("Deleted!", "Berhasil", "success")
                            //this.setState({ show: false })
                          }
                        }
                        onCancel={() => {
                            swal("Batal", "Data batal dihapus", "error")
                            // this.setState({ show: false })
                          }
                        }
                      />
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
