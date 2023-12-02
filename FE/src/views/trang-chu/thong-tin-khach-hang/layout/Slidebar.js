import React from 'react'
import { Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router'

function Slidebar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/login')
    localStorage.removeItem('dataLogin')
    localStorage.removeItem('dataLoginNV')
    localStorage.removeItem('dataLoginAD')
    localStorage.removeItem('idGH')
  }
  return (
    <div style={{ backgroundColor: 'rgb(250,250,250)', display: 'flex', justifyContent: 'center' }}>
      <div>
        <i
          className="fa-regular fa-user mt-3"
          style={{
            fontSize: 100,
            border: '3px solid gray',
            borderRadius: '50%',
            width: 150,
            height: 150,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></i>
        <br />
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link style={{ color: 'black' }} href="/#/thong-tin-khach-hang">
            Thông tin của tôi
          </Nav.Link>
          <Nav.Link style={{ color: 'black' }} href="/#/history">
            Đơn hàng
          </Nav.Link>
          <Nav.Link style={{ color: 'black', marginBottom: 50 }} onClick={handleLogout}>
            Đăng xuất
          </Nav.Link>
        </Nav>
      </div>
    </div>
  )
}

export default Slidebar
