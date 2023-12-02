/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { searchByTrangThai } from 'service/ServiceDonHang'
import Slidebar from 'views/trang-chu/thong-tin-khach-hang/layout/Slidebar'

function ContentHistory({ dataLogin }) {
  const [values, setValues] = useState([])
  useEffect(() => {
    if (dataLogin) {
      searchByTT(dataLogin.id, [0, 1, 2, 3, 4])
    }
  }, [dataLogin])

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    return formatter.format(number)
  }

  function formatDate(dateString) {
    const dateObject = new Date(dateString)
    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1 // Tháng bắt đầu từ 0, cần cộng thêm 1
    const year = dateObject.getFullYear()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`
    return formattedDate
  }

  const searchByTT = async (id, values) => {
    const res = await searchByTrangThai(id, values)
    if (res) {
      setValues(res.data.hoaDonList)
      console.log(res)
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="col-3">
          <Slidebar></Slidebar>
        </div>
        <div className="col-9">
          <h1>Lịch sử mua hàng</h1>
          <hr />{' '}
          <table className="my-2 table text-center">
            <tr>
              <td className="pb-3">Mã hoá đơn</td>
              <td className="pb-3">Ngày đặt</td>
              <td className="pb-3">Thành tiền</td>
              <td className="pb-3">Trạng thái</td>
              <td className="pb-3">Vận chuyển</td>
            </tr>
            <tbody className="table-group-divider">
              {values.map((product, index) => (
                <tr key={index}>
                  <td className="pt-3">{product.hoaDon.ma}</td>
                  <td className="pt-3">{formatDate(product.hoaDon.ngayTao)}</td>
                  <td className="pt-3">{convertToCurrency(product.hoaDon.tongTienKhiGiam)}</td>
                  <td className="pt-3">
                    {product.hoaDon.trangThai === 0 && 'Chờ xác nhận'}
                    {product.hoaDon.trangThai === 1 && 'Chờ vận chuyển'}
                    {product.hoaDon.trangThai === 2 && 'Đã huỷ'}
                    {product.hoaDon.trangThai === 3 && 'Đang giao'}
                    {product.hoaDon.trangThai === 4 && 'Đã hoàn thành'}
                  </td>
                  <td className="pt-3">
                    {product.hoaDon.trangThai === 0 && 'Chưa giao hàng'}
                    {product.hoaDon.trangThai === 1 && 'Chưa giao hàng'}
                    {product.hoaDon.trangThai === 2 && 'Chưa giao hàng'}
                    {product.hoaDon.trangThai === 3 && 'Đang giao hàng'}
                    {product.hoaDon.trangThai === 4 && 'Đã giao hàng'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ContentHistory
