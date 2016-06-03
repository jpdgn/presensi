import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getJabatan } from '../../redux/modules/jabatan'

const mapStateToProps = (state) => ({
  isLoading: state.dosen.isLoading,
  message: state.dosen.message,
  jabatan: state.jabatan.data
})

export class AddDosenView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    jabatan: PropTypes.object
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
            <div className='ui main grid'>
              <div className='sixteen wide stretched column'>
                <div className='ui segment'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddDosenView)
