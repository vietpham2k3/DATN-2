import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from 'service/LoginService'
import { toast } from 'react-toastify'
import { detailGH } from 'service/GioHangService'

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const handleChange = (evt) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  const dangNhap = async (email, password) => {
    const res = await login(email, password)
    if (res.data === 'Not found') {
      toast.error('Sai tài khoản hoặc mật khẩu')
      return
    }
    if (res.data.role === 'KH') {
      navigate('/trang-chu')
      toast.success('Đăng nhập thành công')
      localStorage.setItem('dataLogin', JSON.stringify(res.data))
      detail(res.data.id)
    } else if (res.data.role === 'NV') {
      navigate('/ban-hang-tai-quay')
      toast.success('Đăng nhập thành công')
      localStorage.setItem('dataLoginNV', JSON.stringify(res.data))
    } else {
      navigate('/thong-ke')
      toast.success('Đăng nhập thành công')
      localStorage.setItem('dataLoginAD', JSON.stringify(res.data))
    }
  }

  const detail = async (id) => {
    const res = await detailGH(id)
    if (res.data) {
      localStorage.setItem('idGH', res.data.id)
    }
  }

  const handleOnSubmit = () => {
    dangNhap(state.email, state.password)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Đăng nhập</h1>
                    <p className="text-medium-emphasis">Đăng nhập tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="Email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={state.password}
                        autoComplete="current-password"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleOnSubmit}>
                          Đăng nhập
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Quên mật khẩu
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Đăng ký</h2>
                    <p>
                      Hãy đăng ký tài khoản cho bạn ngay bây giờ để trải nghiệm trang web của chúng
                      tôi
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Đăng ký ngay
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
