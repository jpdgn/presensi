import React, { PropTypes } from 'react'
import '../../styles/core.scss'
import { connect } from 'react-redux';

import { login, auth } from '../../redux/modules/login'

const mapStateToProps = (state) => ({
  token: window.localStorage.getItem('auth-key')
})

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
export class CoreLayout extends React.Component {
  componentDidUpdate () {
    let { dispatch, token } = this.props
    if(token) {
      dispatch(auth(token))
    }
  }
  render () {
    return (
      <div className='page-container'>
        <div className='view-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default connect (mapStateToProps)(CoreLayout)
