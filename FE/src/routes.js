import React from 'react'
import AddNV from 'views/nhanvien/addNV'
import NhanVien from 'views/nhanvien/nhanvien'
import UpdateNV from 'views/nhanvien/updateNV'
import AddChatLieu from 'views/sanpham/chatlieu/AddChatLieu'
import UpdateChatLieu from 'views/sanpham/chatlieu/UpdateChatLieu'
import AddKC from 'views/sanpham/kichco/addkc'
import KC from 'views/sanpham/kichco/kichco'
import UpdateKC from 'views/sanpham/kichco/updatekc'
import AddLSP from 'views/sanpham/loaisanpham/addlsp'
import LSP from 'views/sanpham/loaisanpham/loaisp'
import UpdateLSP from 'views/sanpham/loaisanpham/updatelsp'
import AddNSX from 'views/sanpham/nhasanxuat/addnsx'
import NSX from 'views/sanpham/nhasanxuat/nsx'
import UpdateNSX from 'views/sanpham/nhasanxuat/updatensx'
import KhachHang from './views/khachhang/khachhang'
import AddKH from 'views/khachhang/addKH'
import UpdateKH from 'views/khachhang/updateKH'
import KhuyenMai from 'views/khuyenmai/khuyenmai'
import AddKM from 'views/khuyenmai/addKM'
import UpdateKM from 'views/khuyenmai/updateKM'
import HoaDon from 'views/hoadon/hoadon'
import HDCT from 'views/hoadon/hoa-don-chi-tiet'
import ThongKe from 'views/thong-ke/thongke'
// Buttons
const SanPham = React.lazy(() => import('./views/sanpham/sanpham/SanPham'))
const AddSanPham = React.lazy(() => import('./views/sanpham/sanpham/AddSanPham'))
const UpdateSanPham = React.lazy(() => import('./views/sanpham/sanpham/UpdateSanPham'))
const MauSac = React.lazy(() => import('./views/sanpham/mausac/MauSac'))
const AddMauSac = React.lazy(() => import('./views/sanpham/mausac/AddMS'))
const UpdateMauSac = React.lazy(() => import('./views/sanpham/mausac/UpdateMS'))
const ChatLieu = React.lazy(() => import('./views/sanpham/chatlieu/ChatLieu'))
// Bán hàng tại quầy
const BanHangTaiQuay = React.lazy(() => import('./views/ban-hang-tai-quay/BanHangTaiQuay'))
const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/ban-hang-tai-quay', name: 'Bán hàng tại quầy', element: BanHangTaiQuay, exact: true },

  { path: '/quan-ly-san-pham/san-pham', name: 'Sản Phẩm', element: SanPham },
  { path: '/quan-ly-san-pham/san-pham/add', element: AddSanPham },
  {
    path: '/quan-ly-san-pham/san-pham/detail/:id/:idSP',
    element: UpdateSanPham,
  },
  { path: '/quan-ly-san-pham/mau-sac', name: 'Màu Sắc', element: MauSac },
  { path: '/quan-ly-san-pham/mau-sac/add', element: AddMauSac },
  { path: '/quan-ly-san-pham/mau-sac/update', element: UpdateMauSac },
  {
    path: '/quan-ly-san-pham/mau-sac/detail/:id',
    element: UpdateMauSac,
  },

  { path: '/quan-ly-san-pham/chat-lieu', name: 'Chất Liệu', element: ChatLieu },
  { path: '/quan-ly-san-pham/chat-lieu/add', element: AddChatLieu },
  { path: '/quan-ly-san-pham/chat-lieu/update', element: UpdateChatLieu },
  {
    path: '/quan-ly-san-pham/chat-lieu/detail/:id',
    element: UpdateChatLieu,
  },

  { path: '/quan-ly-san-pham/nsx', name: 'Nhà sản xuất', element: NSX },
  { path: '/quan-ly-san-pham/nsx/add', element: AddNSX },
  { path: '/quan-ly-san-pham/nsx/update', element: UpdateNSX },
  {
    path: '/quan-ly-san-pham/nsx/detail/:id',
    element: UpdateNSX,
  },

  { path: '/quan-ly-san-pham/kich-co', name: 'Kích cỡ', element: KC },
  { path: '/quan-ly-san-pham/kich-co/add', element: AddKC },
  { path: '/quan-ly-san-pham/kich-co/update', element: UpdateKC },
  {
    path: '/quan-ly-san-pham/kich-co/detail/:id',
    element: UpdateKC,
  },

  { path: '/quan-ly-san-pham/lsp', name: 'Loại SP', element: LSP },
  { path: '/quan-ly-san-pham/lsp/add', element: AddLSP },
  { path: '/quan-ly-san-pham/lsp/update', element: UpdateLSP },
  {
    path: '/quan-ly-san-pham/lsp/detail/:id',
    element: UpdateLSP,
  },

  { path: '/nhan-vien/hien-thi', name: 'Nhân viên', element: NhanVien },
  { path: '/nhan-vien/add', element: AddNV },
  { path: '/nhan-vien/update', element: UpdateNV },
  {
    path: '/nhan-vien/detail/:id',
    element: UpdateNV,
  },

  { path: '/khach-hang/hien-thi', name: 'Khách hàng', element: KhachHang },
  { path: '/khach-hang/add', element: AddKH },
  { path: '/khach-hang/update', element: UpdateKH },
  {
    path: '/khach-hang/detail/:id',
    element: UpdateKH,
  },
  
  { path: '/khuyen-mai/hien-thi', name: 'Khuyến Mãi', element: KhuyenMai },
  { path: '/khuyen-mai/add', element: AddKM },
  { path: '/khuyen-mai/update', element: UpdateKM },
  {
    path: '/khuyen-mai/detail/:id',
    element: UpdateKM,
  },
  
  { path: '/hoa-don/hien-thi', name: 'Hóa Đơn', element: HoaDon },
  { path: '/hoa-don/chi-tiet/:id', name: 'Hóa Đơn Chi Tiết', element: HDCT },


  { path: '/thong-ke', name: 'Thống kê', element: ThongKe },

]

export default routes
