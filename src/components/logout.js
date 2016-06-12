import React from 'react'
import { connect } from 'react-redux'
import Router from 'react-router'
let Logout;

Logout = class extends React.Component {
    contextTypes: {
      router: React.PropTypes.object.isRequired
    }
    componentWillMount () {
        // this.props.dispatch(authenticationActionCreator.logout());
        // this.props.dispatch(pushPath('/'));
        const { router } = this.context
        router.push('/login')
    }

    render () {
        return null;
    }
};

export default connect()(Logout);
