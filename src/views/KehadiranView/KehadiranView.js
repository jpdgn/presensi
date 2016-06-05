import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getKehadiran } from '../../redux/modules/kehadiran'

// import { getKelas } from '../../redux/modules/kelas'
// import { getSemester } from '../../redux/modules/semester'
// import { getAkademik } from '../../redux/modules/akademik'
// import { getRuangan } from '../../redux/modules/ruangan'
// import { getMk } from '../../redux/modules/mk'
// import { getDosen } from '../../redux/modules/dosen'

const mapStateToProps = (state) => ({
  data: state.kehadiran.data,
  sortType: state.kehadiran.sortType,
  isLoading: state.kehadiran.isLoadingData
  // kelas: state.kelas.data,
  // semester: state.semester.data,
  // akademik: state.akademik.data,
  // ruangan: state.ruangan.data,
  // mk: state.mk.data,
  // dosen: state.dosen.data
})

export class KehadiranView extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      tipeFilter: ''
    }
  }
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
    // sortType: PropTypes.string,
    // kelas: PropTypes.object,
    // semester: PropTypes.object,
    // akademik: PropTypes.object,
    // ruangan: PropTypes.object,
    // mk: PropTypes.object,
    // dosen: PropTypes.object
  }

  sortDosen = () => {
    var sortType = this.props.sortType
    if (sortType === 'asc') {
      sortType = 'desc'
    } else {
      sortType = 'asc'
    }
    this.props.dispatch(getSortedDosen(sortType))
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
    this.props.dispatch(filterKehadiran(filter))
  }

  componentWillMount () {
    this.props.dispatch(getKehadiran())
    // this.props.dispatch(getKelas())
    // this.props.dispatch(getSemester())
    // this.props.dispatch(getAkademik())
    // this.props.dispatch(getRuangan())
    // this.props.dispatch(getMk())
    // this.props.dispatch(getDosen())
  }
  render () {
    var filterOption = []
    var row = []
    var loader = <div className='ui active inverted dimmer'>
      <div className='ui text loader'>Loading</div>
    </div>
    if (this.props.data) {
      var listKehadiran = this.props.data.data
      if (listKehadiran.length < 1) {
        row = <tr><td colSpan='12' className='center aligned'><span>Tidak ada data</span></td></tr>
      }
      for (var i = 0; i < listKehadiran.length; i++) {
        row.push(
          <tr>
            <td>{listKehadiran[i].tanggal}</td>
            <td>{listKehadiran[i].jam_mulai}</td>
            <td>{listKehadiran[i].jam_presensi}</td>
            <td>{listKehadiran[i].nama_mahasiswa}</td>
            <td>{listKehadiran[i].mata_kuliah}</td>
            <td>{listKehadiran[i].nama_dosen}</td>
            <td>{listKehadiran[i].status}</td>
            <td className='td-actions text-right'>
              <Link to={'/kehadiran/' + listKehadiran[i].id + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
              <Link to={'/kehadiran/' + listKehadiran[i].id + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
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
                      <div className='fixed-table-container'>
                        <table className='table table-hover'>
                          <thead>
                            <tr>
                              <th>TANGGAL</th>
                              <th>JAM MASUK</th>
                              <th>JAM PRESENSI</th>
                              <th>NAMA</th>
                              <th>MATA KULIAH</th>
                              <th>DOSEN</th>
                              <th>STATUS</th>
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

export default connect(mapStateToProps)(KehadiranView)
