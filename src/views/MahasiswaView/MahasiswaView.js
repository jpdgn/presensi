import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import { reduxForm } from 'redux-form'
import SA from 'sweetalert-react'
import 'sweetalert-react/node_modules/sweetalert/dist/sweetalert.css'

import { getMahasiswaData } from '../../redux/modules/mahasiswa'

const form = 'formMahasiswa'
const fields = ['nimOnDelete']

const mapStateToProps = (state) => ({
  data: state.mahasiswa.data,
  nim: state.mahasiswa.nim,
  isLoading: state.mahasiswa.isLoadingData
})

export class MahasiswaView extends Component {
  constructor(props) {
    super(props);

    this.state = {show: false, id: ''}
  }

  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    nim: PropTypes.string
  }

  handleHapusData = (nim) => {
    let { dispatch } = this.props
    $('.ui.modal')
    .modal('show')
    console.log(nim)
    dispatch(nimOnDelete(nim))
  }

  delete () {
    console.log('haii')
    swal('Hello')
  }

  componentDidMount () {
    this.props.dispatch(getMahasiswaData())
    jQuery(React.findDOMNode(this.refs.tooltip)).tooltip();
    $("#asd").click(function() {
      $.notify({
      	// options
      	icon: 'glyphicon glyphicon-warning-sign',
      	title: 'Bootstrap notify',
      	message: 'Turning standard Bootstrap alerts into "notify" like notifications',
      	url: 'https://github.com/mouse0270/bootstrap-notify',
      	target: '_blank'
      },{
      	// settings
      	element: 'body',
      	position: null,
      	type: "info",
      	allow_dismiss: true,
      	newest_on_top: false,
      	showProgressbar: false,
      	placement: {
      		from: "top",
      		align: "right"
      	},
      	offset: 20,
      	spacing: 10,
      	z_index: 1031,
      	delay: 5000,
      	timer: 1000,
      	url_target: '_blank',
      	mouse_over: null,
      	animate: {
      		enter: 'animated fadeInDown',
      		exit: 'animated fadeOutUp'
      	},
      	onShow: null,
      	onShown: null,
      	onClose: null,
      	onClosed: null,
      	icon_type: 'class',
      	template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
      		'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
      		'<span data-notify="icon"></span> ' +
      		'<span data-notify="title">{1}</span> ' +
      		'<span data-notify="message">{2}</span>' +
      		'<div class="progress" data-notify="progressbar">' +
      			'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      		'</div>' +
      		'<a href="{3}" target="{4}" data-notify="url"></a>' +
      	'</div>'
      })
    })
  }
  render () {
    const {fields: {nimOnDelete}} = this.props
    var row = []
    var loadingText = <tr>Sedang memuat data</tr>
    if (this.props.data && this.props.data.data) {
      var listMahasiswa = this.props.data.data
      for (var i = 0; i < listMahasiswa.length; i++) {
        row.push(
          <tr key={i}>
            <td><Link to={'/mahasiswa/' + listMahasiswa[i].nim}>{listMahasiswa[i].nim}</Link></td>
            <td>{listMahasiswa[i].nama_mhs}</td>
            <td>{listMahasiswa[i].email}</td>
            <td>{listMahasiswa[i].kelas}</td>
            <td>{listMahasiswa[i].akademik}</td>
            <td>{listMahasiswa[i].semester}</td>
            <td className='td-actions text-right'>
              <Link ref='tooltip' title='text' to={'/mahasiswa/' + listMahasiswa[i].nim + '/view'} className='btn btn-info btn-simple btn-xs' data-original-title='View'><i className='fa fa-user'></i></Link>
              <Link to={'/mahasiswa/' + listMahasiswa[i].nim + '/edit'} className='btn btn-success btn-simple btn-xs' data-original-title='Edit'><i className='fa fa-edit'></i></Link>
              <button onClick={() => this.setState({ show: true, id: i })} className='btn btn-danger btn-simple btn-xs' data-original-title='Delete'><i className='fa fa-times'></i></button>
            </td>
          </tr>
        )
      }
    }

    return (
      <div>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='header'>
                      <h4 className='title'>Mahasiswa</h4>
                    </div>
                    <div className='content table-responsive'>
                      <div className='fixed-table-container'>
                        <div className='fixed-table-body'>
                          <table id='bootstrap-table' className='table table-hover'>
                            <thead>
                              <tr>
                                <th>NIM</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Kelas</th>
                                <th>Akademik</th>
                                <th>Semester</th>
                                <th className='text-right'>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <div className='fixed-table-loading'>Sedang memuat</div>
                              {row}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <SA
                        show={this.state.show}
                        title="Hapus Data"
                        text="Belum berfungsi"
                        onConfirm={() => this.setState({ show: false })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div className='row'>
      //   <div className='ui grid container'>
      //     <Menu />
      //     <Mahasiswa
      //       nim={this.props.nim}
      //       data={this.props.data}
      //       isLoading={this.props.isLoading}/>
      //   </div>
      // </div>
    )
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: form,
  fields
})(MahasiswaView))
