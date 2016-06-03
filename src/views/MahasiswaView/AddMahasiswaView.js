import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getKelas } from '../../redux/modules/kelas'
import { getSemester } from '../../redux/modules/semester'
import { getAkademik } from '../../redux/modules/akademik'

const mapStateToProps = (state) => ({
  isLoading: state.mahasiswa.isLoading,
  message: state.mahasiswa.message,
  kelas: state.kelas.data,
  semester: state.semester.data,
  akademik: state.akademik.data
})

export class AddMahasiswaView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    kelas: PropTypes.object,
    semester: PropTypes.object,
    akademik: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getKelas())
    this.props.dispatch(getSemester())
    this.props.dispatch(getAkademik())
  }

  render () {
    return (
      <div>
        <TopMenu />
        <div className='row'>
          <div className='ui grid container'>
            <Menu />
            <AddMahasiswaForm
              isLoading={this.props.isLoading}
              message={this.props.message}
              kelas={this.props.kelas}
              semester={this.props.semester}
              akademik={this.props.akademik} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddMahasiswaView)
