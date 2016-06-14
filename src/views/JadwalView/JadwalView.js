import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import SA from 'sweetalert-react'
import 'sweetalert-react/node_modules/sweetalert/dist/sweetalert.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import { getJadwal } from '../../redux/modules/jadwal'

import { getKelas } from '../../redux/modules/kelas'
import { getSemester } from '../../redux/modules/semester'
import { getAkademik } from '../../redux/modules/akademik'
import { getRuangan } from '../../redux/modules/ruangan'
import { getMk } from '../../redux/modules/mk'
import { getDosen } from '../../redux/modules/dosen'
import { filterJadwal } from '../../redux/modules/jadwal'

const mapStateToProps = (state) => ({
  data: state.jadwal.data,
  sortType: state.jadwal.sortType,
  isLoading: state.jadwal.isLoadingData,
  kelas: state.kelas.data,
  semester: state.semester.data,
  akademik: state.akademik.data,
  ruangan: state.ruangan.data,
  mk: state.mk.data,
  dosen: state.dosen.data
})

export class JadwalView extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      tipeFilter: ''
    }
  }

  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    sortType: PropTypes.string,
    kelas: PropTypes.object,
    semester: PropTypes.object,
    akademik: PropTypes.object,
    ruangan: PropTypes.object,
    mk: PropTypes.object,
    dosen: PropTypes.object
  }

  delete = (row, event) => {
    var conf = confirm("Anda yakin ingin menghapus ?")
    if(conf) {
      // this.props.dispatch(deleteMahasiswa(test))
      console.log('Youre deleted')
    } else {
      console.log('you do cancel')
    }
  }

  componentWillMount () {
    this.props.dispatch(getJadwal())
    this.props.dispatch(getKelas())
    this.props.dispatch(getSemester())
    this.props.dispatch(getAkademik())
    this.props.dispatch(getRuangan())
    this.props.dispatch(getMk())
    this.props.dispatch(getDosen())
  }

  changeFilterOption = (e) => {
    // this.state.tipeFilter = e.target.value
    this.setState({tipeFilter: e.target.value})
  }

  changeFilterValue = (e) => {
    var filter = {
      option: this.state.tipeFilter,
      val: e.target.value
    }
    this.props.dispatch(filterJadwal(filter))
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

    var filterOption
    var hariData = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
    var kelasData = this.props.kelas
    var ruanganData = this.props.ruangan
    var mataKuliahData = this.props.mk
    var dosenData = this.props.dosen
    var hariOption = []
    var kelasOption = []
    var ruanganOption = []
    var mataKuliahOption = []
    var dosenOption = []
    var row = []
    var data = []
    var days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
    if (this.props.data && this.props.data.data && kelasData && ruanganData && mataKuliahData && dosenData) {
      var listJadwal = this.props.data.data
      for (var a = 0; a < kelasData.data.length; a++) {
        kelasOption.push(<option value={kelasData.data[a].kode}>{kelasData.data[a].kelas}</option>)
      }
      for (var d = 0; d < ruanganData.data.length; d++) {
        ruanganOption.push(<option value={ruanganData.data[d].kode}>{ruanganData.data[d].ruangan}</option>)
      }
      for (var e = 0; e < mataKuliahData.data.length; e++) {
        mataKuliahOption.push(<option value={mataKuliahData.data[e].kode}>{mataKuliahData.data[e].mata_kuliah}</option>)
      }
      for (var f = 0; f < dosenData.data.length; f++) {
        dosenOption.push(<option value={dosenData.data[f].nip}>{dosenData.data[f].nama_dosen}</option>)
      }
      for (var g = 0; g < hariData.length; g++) {
        hariOption.push(<option value={g + 1}>{hariData[g]}</option>)
      }
      if (listJadwal.length < 1) {
        row = <tr className='no-records-found'><td colSpan='9'><span>Tidak ada data</span></td></tr>
      }
      for (var i = 0; i < listJadwal.length; i++) {
        // row.push(
        //   <tr>
        //     <td><Link to={'jadwal/' + (listJadwal[i].kode)}>{listJadwal[i].kode}</Link></td>
        //     <td>{days[listJadwal[i].hari - 1]}</td>
        //     <td>{listJadwal[i].kelas}</td>
        //     <td>{listJadwal[i].ruangan}</td>
        //     <td>{listJadwal[i].mata_kuliah}</td>
        //     <td>{listJadwal[i].nama_dosen}</td>
        //     <td>{listJadwal[i].jam_mulai}</td>
        //     <td>{listJadwal[i].jam_selesai}</td>
        //     <td className='td-actions text-right'>
        //       <Link to={'/jadwal/' + listJadwal[i].kode + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
        //       <Link to={'/jadwal/' + listJadwal[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
        //       <button onClick={() => this.setState({ show: true, id: i })} className='btn btn-danger btn-simple btn-xs' data-original-title='Delete'><i className='fa fa-times'></i></button>
        //     </td>
        //   </tr>
        // )
        data.push({
          kode: listJadwal[i].kode,
          hari: days[listJadwal[i].hari-1],
          kelas: listJadwal[i].kelas,
          ruangan: listJadwal[i].ruangan,
          mata_kuliah: listJadwal[i].mata_kuliah,
          nama_dosen: listJadwal[i].nama_dosen,
          jam_mulai: listJadwal[i].jam_mulai,
          jam_selesai: listJadwal[i].jam_selesai,
          action: <div>
            <Link ref='tooltip' title='text' to={'/jadwal/' + listJadwal[i].kode + '/view'} className='btn btn-info btn-simple btn-xs' data-original-title='View'><i className='fa fa-user'></i></Link>
            <Link to={'/jadwal/' + listJadwal[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs' data-original-title='Edit'><i className='fa fa-edit'></i></Link>
            <div onClick={this.delete.bind(this, listJadwal[i].kode)} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></div>
          </div>
        })
      }
    }
    switch (this.state.tipeFilter) {
      case 'hari':
        filterOption = hariOption
        break
      case 'id_kelas':
        filterOption = kelasOption
        break
      case 'id_ruangan':
        filterOption = ruanganOption
        break
      case 'id_mk':
        filterOption = mataKuliahOption
        break
      case 'id_dosen':
        filterOption = dosenOption
        break
      default:
        filterOption = <option>A</option>
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
                      <h4 className='title'>Jadwal</h4>
                    </div>
                    <div className='col-md-12'>
                      <label>Filter</label>
                      <div className='row'>
                        <div className='form-group col-md-4'>
                          <select onChange={this.changeFilterOption.bind(this)} className='form-control'>
                            <option value=''>Pilih</option>
                            <option value='hari'>Hari</option>
                            <option value='id_kelas'>Kelas</option>
                            <option value='id_ruangan'>Ruangan</option>
                            <option value='id_mk'>Mata Kuliah</option>
                            <option value='id_dosen'>Dosen</option>
                          </select>
                        </div>
                        <div className='form-group col-md-4'>
                          <select disabled={this.state.tipeFilter === '' ? 'disabled' : ''} className={this.state.tipeFilter === '' ? 'disabled form-control' : 'form-control'} onChange={this.changeFilterValue.bind(this)}>
                            <option value='hari'>Pilih</option>
                            {filterOption}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='content table-responsive'>
                    <div className='fixed-table-toolbar'>
                      <div className='columns columns-right pull-right'>
                        <Link to='add/jadwal' className='btn btn-primary'>Tambah Data</Link>
                      </div>
                    </div>
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
                            <TableHeaderColumn isKey={true} dataSort={true} dataField="kode" width="100">KODE JADWAL</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="hari" width='60'>HARI</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="kelas" width='75'>KELAS</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="ruangan" width='70'>RUANGAN</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="mata_kuliah">MATA KULIAH</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="nama_dosen">DOSEN</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="jam_mulai" width='80'>JAM MULAI</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField="jam_selesai" width='80'>JAM SELESAI</TableHeaderColumn>
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
    )
  }
}

export default connect(mapStateToProps)(JadwalView)
