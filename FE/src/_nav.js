import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilChartPie,
  cilCursor,
  cilDrop,
  cilPencil,
  cilSpeedometer,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Thống kê",
    to: "/thong-ke",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavTitle,
    name: "Theme",
  },
  {
    component: CNavItem,
    name: "Colors",
    to: "/theme/colors",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Typography",
    to: "/theme/typography",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Sản Phẩm",
  },
  {
    component: CNavGroup,
    name: "Quản lý sản phẩm",
    to: "/san-pham",
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Sản phẩm",
        to: "/san-pham",
      },
      {
        component: CNavItem,
        name: "Màu sắc",
        to: "/san-pham/mau-sac",
      },
      {
        component: CNavItem,
        name: "Chất liệu",
        to: "/san-pham/chat-lieu",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Charts",
    to: "/charts",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
];

export default _nav;
