import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getKelasById } from '../../redux/modules/kelas'
import { getProdi } from '../../redux/modules/prodi'

const mapStateToProps = (state) => ({
  data: state.kelas.data,
  isLoading: state.kelas.isLoading,
  message: state.kelas.message,
  prodi: state.prodi.data
})

export class EditKelasView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    prodi: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getKelasById(this.props.params.id))
    this.props.dispatch(getProdi())
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

export default connect(mapStateToProps)(EditKelasView)
