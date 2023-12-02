import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { ToastContainer } from 'react-toastify'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const TrangChu = React.lazy(() => import('views/trang-chu/home/home'))
const CuaHang = React.lazy(() => import('views/trang-chu/cua-hang/sanpham/SanPham'))
const DetailSP = React.lazy(() => import('views/trang-chu/cua-hang/sanpham/DetailSanPham'))
const GioHang = React.lazy(() => import('views/trang-chu/gio-hang/GioHang'))
const CheckOut = React.lazy(() => import('views/check-out/CheckOut'))
const History = React.lazy(() => import('views/trang-chu/history/History'))
const ThongTinKhachHang = React.lazy(() =>
  import('views/trang-chu/thong-tin-khach-hang/ThongTinKhachHang'),
)

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
            <Route path="/trang-chu" name="Trang Chủ" element={<TrangChu />} />

            <Route path="/cua-hang" name="Cửa Hàng" element={<CuaHang />} />
            <Route path="/chi-tiet-sp/:id/:idSP/:idMS" name="Chi Tiết" element={<DetailSP />} />

            <Route path="/gio-hang" name="Giỏ hàng" element={<GioHang />} />
            <Route path="/checkout/:id" name="CheckOut" element={<CheckOut />} />
            <Route
              path="/thong-tin-khach-hang"
              name="Thông tin khách hàng"
              element={<ThongTinKhachHang />}
            />
            <Route path="/history" name="Lịch sử mua hàng" element={<History />} />
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </HashRouter>
    )
  }
}

export default App
