import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Thống kê',
    to: '/thong-ke',
    icon: <i className="fa-solid fa-magnifying-glass-chart nav-icon"></i>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Bán hàng',
  },
  {
    component: CNavItem,
    name: 'Bán hàng trực tiếp',
    to: '/ban-hang-tai-quay',
    icon: <i className="fa-solid fa-shop nav-icon"></i>,
  },
  {
    component: CNavItem,
    name: 'Đơn hàng',
    to: '/hoa-don/hien-thi',
    icon: <i className="fa-solid fa-bag-shopping nav-icon"></i>,
  },
  {
    component: CNavTitle,
    name: 'Sản Phẩm',
  },
  {
    component: CNavGroup,
    name: 'Quản lý sản phẩm',
    to: '/quan-ly-san-pham',
    icon: <i className="fa-solid fa-shoe-prints nav-icon"></i>,
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
    icon: <i className="fa-solid fa-gift nav-icon"></i>,
  },
  {
    component: CNavTitle,
    name: 'Quản lý người dùng',
  },
  {
    component: CNavItem,
    name: 'Quản lý nhân viên',
    to: '/nhan-vien/hien-thi',
    icon: <i className="fa-solid fa-user nav-icon"></i>,
  },
  {
    component: CNavItem,
    name: 'Quản lý khách hàng',
    to: '/khach-hang/hien-thi',
    icon: <i className="fa-solid fa-users nav-icon"></i>,
  },
]

export default _nav
