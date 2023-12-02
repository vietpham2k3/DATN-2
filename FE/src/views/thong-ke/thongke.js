/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import {
  doanhThuTQTheoNgay,
  doanhThuOnlineTheoNgay,
  soDonChoXacNhanThang,
  soDonThanhCongThang,
  soDonHuyThang,
  soDonTraThang,
  doanhThuTongTheoNam,
  doanhThuAllThang,
} from 'service/ServiceThongKe'

const ThongKe = () => {
  const [ngayTaiQuay, setNgayTaiQuay] = useState(0)
  const [ngayOnline, setNgayOnline] = useState(0)
  const [ngayChoXacNhan, setNgayChoXacNhan] = useState(0)
  const [ngayDaBan, setNgayDaBan] = useState(0)
  const [ngayHuy, setNgayHuy] = useState(0)
  const [thangChoVanChuyen, setThangChoVanChuyen] = useState(0)
  const [tongNam, setTongNam] = useState(0)
  const [thangTongAll, setThangTongAll] = useState([])

  const doanhThuNgayTaiQuay = async () => {
    const res = await doanhThuTQTheoNgay()
    if (res && res.data) {
      setNgayTaiQuay(res.data)
    }
  }

  const handleDoanhThuNgayTaiQuay = () => {
    doanhThuNgayTaiQuay()
  }

  useEffect(() => {
    handleDoanhThuNgayTaiQuay()
    handleDoanhThuNgayOnline()
    handleSLNgayCXN()
    handleSLNgayDB()
    handleSLNgayHuy()
    handleSLThangCVC()
    handleTongNam()
    handleDoanhThuTongAllThang()
  }, [])

  const doanhThuNgayOnline = async () => {
    const res = await doanhThuOnlineTheoNgay()
    if (res && res.data) {
      setNgayOnline(res.data)
    }
  }

  const handleDoanhThuNgayOnline = () => {
    doanhThuNgayOnline()
  }

  const SLNgayCXN = async () => {
    const res = await soDonChoXacNhanThang()
    if (res && res.data) {
      setNgayChoXacNhan(res.data)
    }
  }

  const handleSLNgayCXN = () => {
    SLNgayCXN()
  }

  const SLNgayDB = async () => {
    const res = await soDonThanhCongThang()
    if (res && res.data) {
      setNgayDaBan(res.data)
    }
  }

  const handleSLNgayDB = () => {
    SLNgayDB()
  }

  const SLNgayHuy = async () => {
    const res = await soDonHuyThang()
    if (res && res.data) {
      setNgayHuy(res.data)
    }
  }

  const handleSLNgayHuy = () => {
    SLNgayHuy()
  }

  const SLThangCVC = async () => {
    const res = await soDonTraThang()
    if (res && res.data) {
      setThangChoVanChuyen(res.data)
    }
  }

  const handleSLThangCVC = () => {
    SLThangCVC()
  }

  const TongNam = async () => {
    const res = await doanhThuTongTheoNam()
    if (res && res.data) {
      setTongNam(res.data)
    }
  }

  const handleTongNam = () => {
    TongNam()
  }

  const doanhThuTongThangAll = async () => {
    const res = await doanhThuAllThang()
    if (res && res.data) {
      setThangTongAll(res.data)
    }
  }

  const handleDoanhThuTongAllThang = () => {
    doanhThuTongThangAll()
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })

    return formatter.format(number)
  }
  return (
    <>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <span style={{ fontWeight: 'bold', fontSize: 20, color: '#0066FF' }}>
                Doanh thu bán hàng trực tiếp hôm nay
              </span>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol style={{ fontSize: 35, fontWeight: 'bold' }} xs={6}>
                  {convertToCurrency(ngayTaiQuay)}
                </CCol>
                <CCol style={{ paddingTop: 30 }} xs={6} className="flex justify-content-end">
                  <i className="fa-solid fa-calendar-days fa-xl"></i>{' '}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <span style={{ fontWeight: 'bold', fontSize: 20, color: '#0066FF' }}>
                Doanh thu bán hàng online hôm nay
              </span>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol style={{ fontSize: 35, fontWeight: 'bold' }} xs={6}>
                  {convertToCurrency(ngayOnline)}
                </CCol>
                <CCol style={{ paddingTop: 30 }} xs={6} className="flex justify-content-end">
                  <i className="fa-solid fa-hand-holding-dollar fa-xl"></i>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={3}>
          <CCard className="mb-4">
            <CCardHeader>
              <span style={{ fontWeight: 'bold', fontSize: 20, color: '#0000FF' }}>
                Đơn chờ xác nhận trong tháng
              </span>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={6}>
                  <span style={{ fontSize: 25, fontWeight: 'bold', fontStyle: 'italic' }}>
                    {ngayChoXacNhan}
                  </span>
                </CCol>
                <CCol style={{ paddingTop: 15 }} xs={6} className="flex justify-content-end">
                  <i className="fa-solid fa-clipboard fa-xl"></i>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={3}>
          <CCard className="mb-4">
            <CCardHeader>
              <span style={{ fontWeight: 'bold', fontSize: 20, color: '#00CC00' }}>
                Đơn đã hoàn thành trong tháng
              </span>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol style={{ fontSize: 25, fontWeight: 'bold', fontStyle: 'italic' }} xs={6}>
                  <span>{ngayDaBan}</span>{' '}
                </CCol>
                <CCol style={{ paddingTop: 15 }} xs={6} className="flex justify-content-end">
                  <i className="fa-solid fa-clipboard fa-xl"></i>{' '}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={3}>
          <CCard className="mb-4">
            <CCardHeader>
              <span style={{ fontWeight: 'bold', fontSize: 20, color: '#FF0000' }}>
                Đơn đã được hủy trong tháng
              </span>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol style={{ fontSize: 25, fontWeight: 'bold', fontStyle: 'italic' }} xs={6}>
                  <span>{ngayHuy}</span>
                </CCol>
                <CCol style={{ paddingTop: 15 }} xs={6} className="flex justify-content-end">
                  <i className="fa-solid fa-clipboard fa-xl"></i>{' '}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={3}>
          <CCard className="mb-4">
            <CCardHeader>
              <span style={{ fontWeight: 'bold', fontSize: 20, color: '#0099FF' }}>
                Đơn chờ vận chuyển trong tháng
              </span>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol style={{ fontSize: 25, fontWeight: 'bold', fontStyle: 'italic' }} xs={6}>
                  <span>{thangChoVanChuyen}</span>{' '}
                </CCol>
                <CCol style={{ paddingTop: 15 }} xs={6} className="flex justify-content-end">
                  <i className="fa-solid fa-clipboard fa-xl"></i>{' '}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={6}>
          <CCard style={{ height: 200 }} className="mb-4">
            <CCardHeader>
              <span style={{ fontWeight: 'bold', fontSize: 30 }}>
                Doanh thu tổng trong năm {currentYear}
              </span>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol
                  style={{ fontSize: 40, fontWeight: 'bold', color: 'red', paddingTop: 25 }}
                  xs={6}
                >
                  {convertToCurrency(tongNam)}
                </CCol>
                <CCol
                  style={{ paddingTop: 57, fontSize: 35, paddingRight: 50 }}
                  xs={6}
                  className="flex justify-content-end"
                >
                  <i className="fa-solid fa-dollar-sign fa-xl"></i>{' '}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={6}>
          <CCard style={{ height: 200 }} className="mb-4">
            <CCardHeader>
              <span style={{ fontWeight: 'bold', fontSize: 28, color: '#CC0066' }}>
                Doanh thu trong tháng {currentMonth}
              </span>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 20,paddingTop: 20}} xs={9}>
                  <table>
                    <tr style={{ fontSize: 14,width: 180}}>
                      <th >Đơn hàng trực tiếp: </th>
                      <th style={{ paddingLeft:30 }}> Đơn hàng online: </th>
                      <th style={{ paddingLeft: 30 }}> Tổng doanh thu: </th>
                    </tr>
                    <tbody style={{color: 'gray'}} className="table-group-divider">
                       {thangTongAll.map((n, index) => {
                      const sizeData = n.split(',')
                      const taiQuay = sizeData[0]
                      const online = sizeData[1]
                      const tong = sizeData[2]

                      return (
                        <tr key={index}>
                          <td style={{ color: 'red' }}>{convertToCurrency(taiQuay)}</td>
                          <td style={{ paddingLeft: 30, color: 'red' }}>
                            {convertToCurrency(online)}
                          </td>
                          <td style={{ paddingLeft: 30, color: 'red' }}>
                            {convertToCurrency(tong)}
                          </td>
                        </tr>
                      )
                    })}
                    </tbody>
                   
                  </table>
                </CCol>
                <CCol
                  style={{ paddingTop: 55, fontSize: 35 }}
                  xs={3}
                  className="flex justify-content-end"
                >
                  <i className="fa-solid fa-dollar-sign fa-xl"></i>{' '}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ThongKe
