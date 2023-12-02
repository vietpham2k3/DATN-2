import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import { toast } from 'react-toastify'
import { SignUp } from 'service/LoginService'

const Register = () => {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    passwordMatch: false, // Trạng thái kiểm tra mật khẩu xác nhận
  })
  const handleChange = (evt) => {
    const { name, value } = evt.target

    setState({
      ...state,
      [name]: value,
      // Kiểm tra mật khẩu xác nhận và cập nhật trạng thái passwordMatch
      passwordMatch:
        name === 'passwordConfirmation' ? state.password === value : state.passwordMatch,
      [evt.target.name]: value,
    })
  }
  const post = async ({ name, email, password, passwordConfirmation }) => {
    if (!name || !email || !password || !passwordConfirmation) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }
    //Name
    if (/\d/.test(name)) {
      toast.error('Tên không được chứa chữ số')
      return
    } else if (name.length > 30) {
      toast.error('Tên không được quá 30 ký tự')
      return
    }
    //Email
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      toast.error('Email không đúng định dạng')
      return
    }
    //Password
    if (password.length > 16) {
      toast.error('Mật khẩu không được quá 16 ký tự')
      return
    } else if (password.length < 6) {
      toast.error('Mật khẩu không được ít hơn 6 ký tự')
      return
    }
    // Kiểm tra xem mật khẩu có ít nhất một chữ cái và ít nhất một số, và không có ký tự đặc biệt
    if (!/(?=.*[a-zA-Z])(?=.*\d)^[a-zA-Z0-9]*$/.test(password)) {
      toast.error(
        'Mật khẩu phải chứa ít nhất một chữ cái và ít nhất một số, và không được chứa ký tự đặc biệt',
      )
      return
    }
    if (password !== passwordConfirmation) {
      toast.error('Mật khẩu và mật khẩu xác nhận không khớp')
      return
    }

    const userData = {
      tenKhachHang: name,
      email: email,
      matKhau: password,
    }

    try {
      const res = await SignUp(userData)
      if (res) {
        toast.success('Đăng Ký Thành Công')
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Xử lý khi email đã tồn tại
        toast.error(error.response.data)
      } else {
        // Xử lý lỗi khác nếu cần
        toast.error('Đã có lỗi xảy ra')
      }
    }
  }

  const handleOnSubmit = (evt) => {
    evt.preventDefault()
    post(state)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Đăng ký</h1>
                  <p className="text-medium-emphasis">Tạo tài khoản của bạn</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      name="name"
                      value={state.name}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      value={state.password}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      className={`ipt ${state.passwordMatch ? 'valid' : ''}`}
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="passwordConfirmation"
                      value={state.passwordConfirmation}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleOnSubmit}>
                      Đăng ký
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
