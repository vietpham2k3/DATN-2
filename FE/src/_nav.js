import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilCursor, cilDrop, cilPencil, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Thống kê',
    to: '/thong-ke',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Bán hàng',
  },
  {
    component: CNavItem,
    name: 'Bán hàng trực tiếp',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Đơn hàng',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Sản Phẩm',
  },
  {
    component: CNavGroup,
    name: 'Quản lý sản phẩm',
    to: '/quan-ly-san-pham',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sản phẩm',
        to: '/quan-ly-san-pham/san-pham',
      },
      {
        component: CNavItem,
        name: 'Chất liệu',
        to: '/quan-ly-san-pham/chat-lieu',
      },
      {
        component: CNavItem,
        name: 'Nhà sản xuất',
        to: '/quan-ly-san-pham/nsx',
      },
      {
        component: CNavItem,
        name: 'Màu sắc',
        to: '/quan-ly-san-pham/mau-sac',
      },
      {
        component: CNavItem,
        name: 'Loại sản phẩm',
        to: '/quan-ly-san-pham/lsp',
      },
      {
        component: CNavItem,
        name: 'Kích cỡ',
        to: '/quan-ly-san-pham/kich-co',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Quản lý ưu đãi',
  },
  {
    component: CNavItem,
    name: 'Quản lý khuyến mãi',
    to: '/khuyen-mai/hien-thi',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản lý người dùng',
  },
  {
    component: CNavItem,
    name: 'Quản lý nhân viên',
    to: '/nhan-vien/hien-thi',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý khách hàng',
    to: '/khach-hang/hien-thi',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
]

export default _nav
