import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

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
    console.log(e.target.value)
    var filter = {
      option: this.state.tipeFilter,
      val: e.target.value
    }
    this.props.dispatch(filterJadwal(filter))
  }
  render () {
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
        row.push(
          <tr>
            <td><Link to={'jadwal/' + (listJadwal[i].kode)}>{listJadwal[i].kode}</Link></td>
            <td>{days[listJadwal[i].hari - 1]}</td>
            <td>{listJadwal[i].kelas}</td>
            <td>{listJadwal[i].ruangan}</td>
            <td>{listJadwal[i].mata_kuliah}</td>
            <td>{listJadwal[i].nama_dosen}</td>
            <td>{listJadwal[i].jam_mulai}</td>
            <td>{listJadwal[i].jam_selesai}</td>
            <td className='td-actions text-right'>
              <Link to={'/jadwal/' + listJadwal[i].kode + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
              <Link to={'/jadwal/' + listJadwal[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
              <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></a>
            </td>
          </tr>
        )
      }
    }
    console.log(this.state.tipeFilter)
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
                      <div className='fixed-table-container'>
                        <table className='table table-hover'>
                          <thead>
                            <tr>
                              <th>Kode Jadwal</th>
                              <th>Hari</th>
                              <th>Kelas</th>
                              <th>Ruangan</th>
                              <th>Mata Kuliah</th>
                              <th>Dosen</th>
                              <th>Jam Mulai</th>
                              <th>Jam Selesai</th>
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

export default connect(mapStateToProps)(JadwalView)
