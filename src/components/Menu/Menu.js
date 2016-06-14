import React from 'react'
import { Link } from 'react-router'

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {collapseMaster: true, collapseProfile: true}
  }
  
  componentDidMount () {

  }
  render () {
    return (
      <div className='sidebar' data-color='blue'>
        <div className='sidebar-wrapper'>
          <div className='user'>
            <div className='photo'>
              <img src='/img/default-avatar.png' />
            </div>
            <div className='info'>
              <a data-toggle='collapse' href='#collapseExample' className='collapsed' aria-expanded={this.state.collapseProfile}>
                  Jonathan Marthen
                  <b className='caret'></b>
              </a>
              <div className='collapse' id='collapseExample'>
                <ul className='nav'>
                  <li><a href='#'>My Profile</a></li>
                  <li><a href='#'>Edit Profile</a></li>
                  <li><a href='#'>Settings</a></li>
                </ul>
              </div>
            </div>
          </div>
          <ul className='nav'>
              <li>
                  <a href='../dashboard.html'>
                      <i className='pe-7s-graph'></i>
                      <p>Dashboard</p>
                  </a>
              </li>
              <li>
                  <a data-toggle='collapse' href='#masterDataExamples' aria-expanded={this.state.collapseMaster}>
                      <i className='pe-7s-plugin'></i>
                      <p>Master Data
                         <b className='caret'></b>
                      </p>
                  </a>
                  <div className='collapse' id='masterDataExamples'>
                      <ul className='nav'>
                          <li><Link activeClassName='active' to='/mahasiswa'>Mahasiswa</Link></li>
                          <li><Link activeClassName='active' to='/dosen'>Dosen</Link></li>
                          <li><Link activeClassName='active' to='/mata-kuliah'>Mata Kuliah</Link></li>
                          <li><Link activeClassName='active' to='/kelas'>Kelas</Link></li>
                          <li><Link activeClassName='active' to='/prodi'>Prodi</Link></li>
                          <li><Link activeClassName='active' to='/jurusan'>Jurusan</Link></li>
                          <li><Link activeClassName='active' to='/ruangan'>Ruangan</Link></li>
                      </ul>
                  </div>
              </li>
              <li>
                <Link activeClassName='active' to='/jadwal'>
                  <i className='pe-7s-date'></i>
                  <p>Jadwal</p>
                </Link>
              </li>
              <li>
                <Link activeClassName='active' to='/kehadiran'>
                  <i className='pe-7s-note2'></i>
                  <p>Kehadiran</p>
                </Link>
              </li>
              <li>
                <Link activeClassName='active' to='/kompensasi'>
                  <i className='pe-7s-medal'></i>
                  <p>Kompensasi</p>
                </Link>
              </li>
          </ul>
        </div>
      </div>
      // <div className='ui left fixed vertical inverted menu' style={{'marginTop': '48px'}}>
      //   <Link to='/mahasiswa' className='item' activeClassName='active'>
      //     Mahasiswa
      //   </Link>
      //   <Link to='/dosen' className='item' activeClassName='active'>
      //     Dosen
      //   </Link>
      //   <Link to='/kelas' className='item' activeClassName='active'>
      //     Kelas
      //   </Link>
      //   <Link to='/mata-kuliah' className='item' activeClassName='active'>
      //     Mata Kuliah
      //   </Link>
      //   <Link to='/ruangan' className='item' activeClassName='active'>
      //     Ruangan
      //   </Link>
      //   <Link to='/prodi' className='item' activeClassName='active'>
      //     Prodi
      //   </Link>
      //   <Link to='/jurusan' className='item' activeClassName='active'>
      //     Jurusan
      //   </Link>
      //   <Link to='/jabatan' className='item' activeClassName='active'>
      //     Jabatan
      //   </Link>
      //   <Link to='/jadwal' className='item' activeClassName='active'>
      //     Jadwal
      //   </Link>
      //   <Link to='/kehadiran' className='item' activeClassName='active'>
      //     Kehadiran
      //   </Link>
      // </div>
    )
  }
}

export default Menu
