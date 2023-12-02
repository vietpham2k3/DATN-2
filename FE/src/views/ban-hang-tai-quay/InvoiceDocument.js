/* eslint-disable react/prop-types */
import { Document, Page, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { styles } from './Style'

function InvoiceDocument({
  dataDetailHD,
  valuesSanPham,
  dataHDKM,
  convertToCurrency,
  totalAmount,
  tienThua,
}) {
  function formatDate(dateString) {
    if (dateString === null) {
      return '' // Trả về chuỗi rỗng nếu giá trị là null
    }

    const dateObject = new Date(dateString)

    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()

    const hours = dateObject.getHours()
    const minutes = dateObject.getMinutes()

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`

    return formattedDate
  }

  console.log(dataDetailHD)
  return (
    <Document>
      <Page>
        <Text style={styles.title}>
          Shop F5<sup>&reg;</sup>
        </Text>
        <Text style={styles.text}>SDT: 0365278368</Text>
        <Text style={styles.text}>Email: shopf5@gmail.com</Text>
        <Text style={styles.text}>Địa chỉ: Hồi Ninh - Kim Sơn - Ninh Bình</Text>
        <Text style={styles.text}>Ngân hàng: MBBANK - STK: 9999999999999</Text>
        <Text style={styles.text}>Chủ tải khoản: Nguyễn Vũ Minh Hiếu</Text>
        <Text style={styles.titleHD}>HOÁ ĐƠN CHI TIẾT</Text>
        <Text style={styles.textMaHD}>{dataDetailHD.ma}</Text>

        <div style={styles.container}>
          <Text style={styles.textThuocTinh}>
            Ngày mua: {formatDate(dataDetailHD.ngayThanhToan)}
          </Text>
          <Text style={styles.textThuocTinh}>Khách hàng: {dataDetailHD.tenNguoiNhan}</Text>
          {/* {dataDetailHD.diaChi !== '' &&(
          <Text style={styles.textThuocTinh}>Địa chỉ: {dataDetailHD.diaChi}</Text>
          )} */}
          {dataDetailHD.soDienThoai !== '' && (
            <Text style={styles.textThuocTinh}>Số điện thoại: {dataDetailHD.soDienThoai}</Text>
          )}
        </div>
        <Text style={styles.titleTB}>DANH SÁCH SẢN PHẨM KHÁCH HÀNG MUA</Text>
        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
            <Text style={styles.row1}>STT</Text>
            <Text style={styles.row2}>Sản phẩm</Text>
            <Text style={styles.row3}>Số lượng</Text>
            <Text style={styles.row4}>Đơn giá</Text>
            <Text style={styles.row5}>Thành tiền</Text>
          </View>
          {valuesSanPham.map((d, i) => (
            <View key={i} style={[styles.row, styles.header]}>
              <Text style={styles.row1}>{i + 1}</Text>
              <Text style={styles.row2}>
                {d.chiTietSanPham.sanPham.ten} [{d.chiTietSanPham.kichCo.ten} -{' '}
                {d.chiTietSanPham.mauSac.ma}]
              </Text>
              <Text style={styles.row3}>{d.soLuong}</Text>
              <Text style={styles.row4}>{convertToCurrency(d.donGia)}</Text>
              <Text style={styles.row5}>{convertToCurrency(d.soLuong * d.donGia)}</Text>
            </View>
          ))}
        </View>
        <View>
          <View style={[styles.flexContainer, { paddingTop: '10px' }]}>
            <Text style={styles.textLeft}>Tổng tiền</Text>
            <Text style={styles.textRight}>{convertToCurrency(totalAmount)}</Text>
          </View>
          {dataHDKM.map((d) => (
            <View key={d.id} style={[styles.flexContainer, { color: 'red' }]}>
              <Text style={styles.textLeft}>Tiền giảm</Text>
              <Text style={styles.textRight}>-{convertToCurrency(d.tienGiam)}</Text>
            </View>
          ))}
          <View style={styles.flexContainer}>
            <Text style={styles.textLeft}>Tiền cần thanh toán</Text>
            <Text style={styles.textRight}>{convertToCurrency(dataDetailHD.tongTienKhiGiam)}</Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.textLeft}>Tiền thừa</Text>
            <Text style={styles.textRight}>{convertToCurrency(tienThua)}</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.text, { paddingTop: '50px' }]}>
            -------------Cảm ơn quý khách!-------------
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default InvoiceDocument
