import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { login, auth } from '../../redux/modules/login'
import Notification from '../../components/Notification'

const form = 'loginForm'
const fields = ['username', 'password']

const mapStateToProps = (state) => ({
  token: window.localStorage.getItem('auth-key'),
  isLoading: state.login.isLoading,
  text: state.login.text,
  message: state.login.message,
  hide: state.login.hide,
})

export class LoginView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentWillMount () {
    let { dispatch } = this.props
    let token = this.props.token
    if (token) {
      dispatch(auth(token))
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
    var loading = <div className='Spinner Spinner-default'>
      <span className='Spinner-dot Spinner-1'></span>
      <span className='Spinner-dot Spinner-2'></span>
      <span className='Spinner-dot Spinner-3'></span>
    </div>
    return (
        <div className='wrapper wrapper-full-page'>
          <div className='full-page login-page' data-color='blue'>
          <Notification text={this.props.text} message={this.props.message} hide={this.props.hide}/>
            <div className='content'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3'>
                    <form>
                      <div className='card'>
                        <div className='header text-center'>Login</div>
                        <div className='content'>
                          <div className='form-group'>

                            <label>Nama Pengguna</label>
                            <input
                              {...username}
                              type='text'
                              placeholder='Masukkan nama pengguna'
                              className='form-control' />
                          </div>
                          <div className='form-group'>
                            <label>Kata Sandi</label>
                            <input
                              {...password}
                              type='password'
                              placeholder='Masukkan kata sandi'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='footer text-center'>
                            <button
                              type='submit'
                              className='btn btn-fill btn-warning btn-wd'
                              onClick={this.props.handleSubmit(this.submitLogin)}>
                              {this.props.isLoading ? loading : 'Login'}
                              </button>
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
