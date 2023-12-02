import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import avatar8 from './../../assets/images/403411770_2031398280564552_5774784347015942044_n.jpg'
import { useNavigate } from 'react-router'

const AppHeaderDropdown = () => {
  const dataLoginNV = JSON.parse(localStorage.getItem('dataLoginNV'))
  const dataLoginAD = JSON.parse(localStorage.getItem('dataLoginAD'))
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
    localStorage.removeItem('dataLogin')
    localStorage.removeItem('dataLoginNV')
    localStorage.removeItem('dataLoginAD')
    localStorage.removeItem('idGH')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
       
        <CDropdownHeader className="bg-light fw-semibold py-2">Xin chào sếp {(dataLoginNV && dataLoginNV.ten) || (dataLoginAD && dataLoginAD.ten)}</CDropdownHeader>

        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
