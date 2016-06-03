import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getJabatan } from '../../redux/modules/jabatan'

const mapStateToProps = (state) => ({
  data: state.jabatan.data,
  isLoading: state.jabatan.isLoadingData
})

export class JabatanView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentWillMount () {
    this.props.dispatch(getJabatan())
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

export default connect(mapStateToProps)(JabatanView)
