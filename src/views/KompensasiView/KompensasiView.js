import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'
import SA from 'sweetalert-react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'  // in ECMAScript 6
import 'sweetalert-react/node_modules/sweetalert/dist/sweetalert.css'

import { getKompensasi } from '../../redux/modules/kompensasi'
// import { deleteKompensasi } from '../../redux/modules/kompensasi'

const form = 'formKompensasi'
const fields = []

const mapStateToProps = (state) => ({
  data: state.kompensasi.data,
  isLoading: state.mahasiswa.isLoadingData
})

export class KompensasiView extends Component {
  constructor(props) {
    super(props)
    this.state = {show: false, id: ''}
  }

  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  hapusData = (row, event) => {
    console.log(row)

    var conf = confirm("Anda yakin ingin menghapus ?")
    if(conf) {
      this.props.dispatch(deleteMahasiswa(test))
      console.log('Youre deleted')
    } else {
      console.log('you do cancel')
    }
  }

  componentDidMount () {
    this.props.dispatch(getKompensasi())
  }
  render () {
    var row = []
    var columns = [
      { title: 'NIM', prop: 'nim'  },
      { title: 'NAMA', prop: 'nama' },
      { title: 'KOMPENSASI', prop: 'kompensasi' },
      { title: 'KELAS', prop: 'kelas' },
      { title: 'ACTION', prop: 'action' }
    ]

    var columnDownload = [
      {title: "NIM", dataKey: "nim"},
      {title: "NAMA", dataKey: "nama"},
      {title: "KOMPENSASI", dataKey: "kompensasi"},
    ]
    var data = []
    var loadingText = <tr>Sedang memuat data</tr>
    if (this.props.data && this.props.data.data) {
      var listKompensasi = this.props.data.data
      for (var i = 0; i < listKompensasi.length; i++) {
        data.push({
          nim: listKompensasi[i].nim,
          nama: listKompensasi[i].nama_mhs,
          kompensasi: listKompensasi[i].kompensasi,
          kelas: listKompensasi[i].kelas,
          action: <div>
            <Link ref='tooltip' title='text' to={'/kompensasi/' + listKompensasi[i].nim + '/view'} className='btn btn-info btn-simple btn-xs' data-original-title='View'><i className='fa fa-user'></i></Link>
            <Link to={'/kompensasi/' + listKompensasi[i].nim + '/edit'} className='btn btn-success btn-simple btn-xs' data-original-title='Edit'><i className='fa fa-edit'></i></Link>
            <div onClick={this.hapusData.bind(this, listKompensasi[i].nim)} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></div>
          </div>
        })
      }
    }

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
      },
      onExportToCSV: () => {
        var a = {ada: "asd", gada: "gadas"}
        return [{nama:'ads'},{nama:'ads'},{nama:'ads'}]
      }
    }
    function onRowSelect (row, isSelected) {
      console.log(row)
      console.log("selected: " + isSelected)
    }
    var selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(241, 241, 241)",
      onSelect: onRowSelect
    }

    function download () {
      var doc = new jsPDF('p', 'pt')
        doc.autoTable(columnDownload, data)
        doc.save('table.pdf')
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
                      <h4 className='title'>Kompensasi</h4>
                    </div>
                    <div className='content table-responsive'>
                      <div className='fixed-table-toolbar'>
                        <div className='columns columns-right pull-right'>
                          <Link to='add/mahasiswa' className='btn btn-primary btn-fill'>Tambah Data</Link>
                        </div>
                        <div className='columns columns-right pull-right'>
                          <a onClick={download} className='btn btn-primary btn-fill'>Download PDF</a>
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
                            columnFilter={true}
                            exportCSV={true}
                            csvFileName="data.csv"
                            selectRow={selectRowProp}
                            options={options}>
                              <TableHeaderColumn isKey={true} dataSort={true} dataField="nim" width="110">NIM</TableHeaderColumn>
                              <TableHeaderColumn dataSort={true} dataField="nama">Nama</TableHeaderColumn>
                              <TableHeaderColumn dataSort={true} dataField="kompensasi">Kompensasi</TableHeaderColumn>
                              <TableHeaderColumn dataSort={true} dataField="kelas">kelas</TableHeaderColumn>
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
})(KompensasiView))
