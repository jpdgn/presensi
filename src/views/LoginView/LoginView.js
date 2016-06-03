import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/modules/login'

const form = 'loginForm'
const fields = ['username', 'password']

const mapStateToProps = (state) => ({
  token: window.localStorage.getItem('auth-key')
})

export class LoginView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentWillMount () {
    if (this.props.token) {
      this.props.history.pushState(null, '/')
    }
  }

  submitLogin = (e) => {
    let { dispatch } = this.props
    let nextPath = '/mahasiswa'
    var loginData = {
      user: this.props.values.username,
      password: this.props.values.password
    }
    if (this.props.location.state && this.props.location.state.nextPathname) {
      nextPath = this.props.location.state.nextPathname
    }
    console.log(loginData)
    console.log(nextPath)
    dispatch(login(loginData, () => {
      this.props.history.pushState({}, nextPath)
    }))
  }

  render () {
    const {fields: {username, password}} = this.props
    return (
        <div className='wrapper wrapper-full-page'>
          <div className='full-page login-page' data-color='green'>
            <div className='content'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3'>
                    <form>
                      <div className='card'>
                        <div className='header text-center'>Login</div>
                        <div className='content'>
                          <div className='form-group'>

                            <label>Username</label>
                            <input
                              {...username}
                              type='text'
                              placeholder='Enter username'
                              className='form-control' />
                          </div>
                          <div className='form-group'>
                            <label>Password</label>
                            <input
                              {...password}
                              type='password'
                              placeholder='Password'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='footer text-center'>
                            <button
                              type='submit'
                              className='btn btn-fill btn-warning btn-wd'
                              onClick={this.props.handleSubmit(this.submitLogin)}>Login</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        // <div className='ui middle aligned center aligned grid'>
        //   <div className='column'>
        //   <h2 className="ui teal image header">
        //     <div className="content">
        //       Log-in to your account
        //     </div>
        //   </h2>
        //     <Login token={this.props.token} location={this.props.location} history={this.props.history}/>
        //   </div>
        // </div>
    )
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: form,
  fields
})(LoginView))
