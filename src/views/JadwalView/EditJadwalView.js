import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getJadwalById } from '../../redux/modules/jadwal'
import { getKelas } from '../../redux/modules/kelas'
import { getSemester } from '../../redux/modules/semester'
import { getAkademik } from '../../redux/modules/akademik'
import { getRuangan } from '../../redux/modules/ruangan'
import { getMk } from '../../redux/modules/mk'
import { getDosen } from '../../redux/modules/dosen'

const mapStateToProps = (state) => ({
  data: state.jadwal.data,
  isLoading: state.jadwal.isLoading,
  message: state.jadwal.message,
  kelas: state.kelas.data,
  semester: state.semester.data,
  akademik: state.akademik.data,
  ruangan: state.ruangan.data,
  mk: state.mk.data,
  dosen: state.dosen.data
})

export class EditJadwalView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    kelas: PropTypes.object,
    semester: PropTypes.object,
    akademik: PropTypes.object,
    ruangan: PropTypes.object,
    mk: PropTypes.object,
    dosen: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getJadwalById(this.props.params.id))
    this.props.dispatch(getKelas())
    this.props.dispatch(getSemester())
    this.props.dispatch(getAkademik())
    this.props.dispatch(getRuangan())
    this.props.dispatch(getMk())
    this.props.dispatch(getDosen())
  }
  render () {
    return (
      <div>
        <TopMenu />
        <div className='row'>
          <div className='ui grid container'>
            <Menu />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(EditJadwalView)
