import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getMkById } from '../../redux/modules/mk'

const mapStateToProps = (state) => ({
  data: state.mk.data,
  isLoading: state.mk.isLoading,
  message: state.mk.message
})

export class EditMataKuliahView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string
  }

  componentWillMount () {
    this.props.dispatch(getMkById(this.props.params.id))
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

export default connect(mapStateToProps)(EditMataKuliahView)
