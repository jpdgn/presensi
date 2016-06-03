import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'

import { getProdi } from '../../redux/modules/prodi'

const mapStateToProps = (state) => ({
  isLoading: state.kelas.isLoading,
  message: state.kelas.message,
  prodi: state.prodi.data
})

export class AddKelasView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    prodi: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getProdi())
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
                  <AddKelasForm
                    isLoading={this.props.isLoading}
                    message={this.props.message}
                    prodi={this.props.prodi} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddKelasView)
