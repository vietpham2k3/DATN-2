/* eslint-disable use-isnan */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import DonHang from 'views/ban-hang-tai-quay/DonHang'
import { useState } from 'react'
import {
  getAllHD,
  addHD,
  detailHD,
  getById,
  getKmById,
  thanhToan,
  updateHD,
} from '../../service/ServiceDonHang'
import { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { addKhuyenMai, deleteByIdHD } from '../../service/GioHangService'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { pay } from 'service/PayService'
import { PDFDownloadLink, Text } from '@react-pdf/renderer'
import { styles } from './Style'
import InvoiceDocument from './InvoiceDocument'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

export default function BanHangTaiQuay() {
  const dataLoginNV = JSON.parse(localStorage.getItem('dataLoginNV'))
  const dataLoginAD = JSON.parse(localStorage.getItem('dataLoginAD'))
  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'))

  const [tienThua, setTienThua] = useState(0)
  const [urlPay, setUrlPay] = useState('')
  const [tienKhachDua, setTienKhachDua] = useState(0)
  const [value, setValue] = useState(0)
  const [show1, setShow1] = useState(false)
  const [id, setId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [values, setValues] = useState([])
  const [valuesSanPham, setValuesSanPham] = useState([])
  const [show4, setShow4] = useState(false)
  const [show3, setShow3] = useState(false)
  const [dataHDKM, setDataHDKM] = useState([])
  const [tongSoLuong, setTongSoLuong] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [check, setCheck] = useState(true)
  const [httt, setHttt] = useState('Tiền mặt')
  const [dataDetailHD, setDataDetailHD] = useState({})
  const [valuesUpdateHD, setValuesUpdateHD] = useState({
    tenNguoiNhan: 'Khách lẻ',
    soDienThoai: '',
    tongTien: 0,
    tongTienKhiGiam: 0.0,
    hinhThucThanhToan: {
      id: dataDetailHD.hinhThucThanhToan && dataDetailHD.hinhThucThanhToan.id,
      trangThai: 1,
      tien: 0,
      ten: 'Tiền mặt',
    },
    trangThai: 0,
  })
  const [valuesKhuyenMai, setValuesKhuyenMai] = useState({
    khuyenMai: {
      ma: '',
      tien: 0,
    },
    hoaDon: {
      id: id,
    },
    tienGiam: 0,
  })
  const nvID = {
    nhanVien: { id: (dataLoginNV && dataLoginNV.id) ||  (dataLoginAD && dataLoginAD.id) },
  }

  useEffect(() => {
    getAll()
  }, [])

  useEffect(() => {
    if (id) {
      detailHDById(id)
      getAllById(id)
      findAllKM(id)
      if (dataDetailHD.tongTienKhiGiam || id) {
        VNP(id)
      }
      setValuesKhuyenMai({ ...valuesKhuyenMai, hoaDon: { id: id } })
    }
  }, [id])

  useEffect(() => {
    if (values.length > 0) {
      setId(values[0].id) // Đặt id bằng ID của phần tử đầu tiên trong mảng
    }
  }, [values])

  useEffect(() => {
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0
    let count = 0
    valuesSanPham.forEach((d) => {
      sum += d.soLuong * d.donGia
      count += d.soLuong
    })
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum)
    setTongSoLuong(count)
  }, [valuesSanPham])

  useEffect(() => {
    if (dataHDKM.length > 0) {
      const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0)
      updateTTHD(id, { ...valuesUpdateHD, tongTienKhiGiam: totalAmount - totalGiam })
    }
  }, [dataHDKM])

  const add = async () => {
    try {
      const res = await addHD(
        nvID,
        (dataLoginNV && dataLoginNV.ten) || (dataLoginAD && dataLoginAD.ten),
      ) // Sử dụng await để chờ kết quả trả về
      if (res) {
        toast.success('Thêm đơn thành công')
        getAll()
      }
    } catch (error) {
      toast.error('Vui lòng đăng nhập để sử dụng chức năng này')
    }
  }

  const handleAdd = (event) => {
    event.preventDefault()
    if (values.length >= 8) {
      // Đã đạt đến giới hạn 8 hoá đơn, không cho phép thêm
      toast.error('Không thể tạo quá 8 đơn')
      return
    }
    add()
  }

  const getAll = async () => {
    const res = await getAllHD() // Sử dụng await để chờ kết quả trả về
    if (res) {
      setValues(res.data)
    }
  }

  const handleChangeValueTien = (e) => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0)
    VNP(id)
    setTienKhachDua(Number(e))
    setValuesUpdateHD({
      ...valuesUpdateHD,
      tongTienKhiGiam: totalAmount - totalGiam,
      hinhThucThanhToan: {
        ...valuesUpdateHD.hinhThucThanhToan,
        tien: e,
        ten: dataDetailHD.hinhThucThanhToan.ten,
        trangThai: 0,
      },
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleBackToCart = (id) => {
    if (values.length <= 1) {
      toast.warning('Bạn không thể xoá hết đơn')
      return
    }
    backToCart(id)
  }

  const backToCart = async (idHD) => {
    try {
      const res = await deleteByIdHD(idHD)
      if (res) {
        getAll()
        toast.success('Xoá thành công')
      }
    } catch (error) {
      toast.success('Lỗi')
    }
  }

  const handleShow1 = () => {
    // setIsCase1(true);
    setShow1(true)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const detailHDById = async (id) => {
    const res = await detailHD(id)
    if (res) {
      setDataDetailHD(res.data)
    }
  }

  const getAllById = async (idHD) => {
    const res = await getById(idHD)
    if (res) {
      setValuesSanPham(res.data)
    }
  }

  const convertToCurrency = (value) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    return formatter.format(value)
  }

  const findAllKM = async (id) => {
    const res = await getKmById(id)
    if (res) {
      setDataHDKM(res.data)
    }
  }

  const VNP = async (id) => {
    try {
      const res = await pay(id)
      if (res) {
        setUrlPay(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ThanhToanHD = async (idHD, nguoiTao) => {
    const res = await thanhToan(idHD, nguoiTao)
    if (res) {
      toast.success('Thanh toán thành công')
      getAll()
    }
  }

  const handleThanhToan = () => {
    ThanhToanHD(id, dataLogin && dataLogin.ten)
    setValuesUpdateHD({
      ...valuesUpdateHD,
      ...valuesUpdateHD.hinhThucThanhToan,
      trangThai: 4,
      hinhThucThanhToan: {
        ten: dataDetailHD.hinhThucThanhToan.ten,
        tien: tienKhachDua,
        trangThai: 1,
      },
    })
  }

  const handleThanhToanWithVNP = () => {
    window.location.href = urlPay
    ThanhToanHD(id, dataLogin && dataLogin.ten)
    setValuesUpdateHD({
      ...valuesUpdateHD,
      ...valuesUpdateHD.hinhThucThanhToan,
      trangThai: 4,
      hinhThucThanhToan: {
        ten: dataDetailHD.hinhThucThanhToan.ten,
        tien: tienKhachDua,
        trangThai: 1,
      },
    })
  }

  const handleShow4 = () => setShow4(true)
  const handleShow3 = () => setShow3(true)

  const handleChangeKM = (value) => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0)
    setValuesKhuyenMai({
      ...valuesKhuyenMai,
      khuyenMai: {
        ma: value,
        tien: totalAmount,
      },
    })
  }

  const handleChangeValuesKM = (e) => {
    if (e.key === 'Enter') {
      addVToHD(valuesKhuyenMai)
    }
  }

  const addVToHD = async (value) => {
    try {
      const res = await addKhuyenMai(value)
      if (res.data === 'error') {
        toast.error('Mã khuyễn mãi không hợp lệ')
      } else if (res.data === 'ff') {
        toast.error('Bạn đang sử dụng mã này')
      } else {
        findAllKM(id)
        const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0)
        toast.success('Thêm mã thành công')
        updateTTHD(id, { ...valuesUpdateHD, tongTienKhiGiam: totalAmount - totalGiam })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateTTHD = async (idHD, value) => {
    try {
      const res = await updateHD(idHD, value)
      if (res && id) {
        detailHDById(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <Button variant="primary" onClick={handleShow4}>
              Chọn khách hàng
            </Button>
            &nbsp;
            {/* <Button variant="primary" onClick={handleShow3}>
              +
            </Button> */}
          </CCardHeader>
          <CCardBody>
            {' '}
            <div className="ma-giam-gia">
              <div>
                <h6>Tên khách hàng</h6>
              </div>
              <div>
                <p>
                  <input
                    value={dataDetailHD.tenNguoiNhan}
                    type="text"
                    style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }}
                    readOnly
                  />{' '}
                </p>
              </div>
            </div>
            <div className="ma-giam-gia">
              <div>
                <h6>Số điện thoại</h6>
              </div>
              <div>
                <p>
                  <input
                    value={dataDetailHD.soDienThoai}
                    type="text"
                    style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }}
                    readOnly
                  />{' '}
                </p>
              </div>
            </div>
            <div className="ma-giam-gia">
              <div>
                <h6>Mã giảm giá</h6>
              </div>
              <div>
                <p>
                  <input
                    type="text"
                    style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }}
                    value={valuesKhuyenMai.khuyenMai.ma}
                    onChange={(e) => handleChangeKM(e.target.value)}
                    onKeyDown={handleChangeValuesKM}
                  />{' '}
                </p>
              </div>
            </div>{' '}
            <div className="ma-giam-gia">
              <div>
                <h6>Số lượng sản phẩm</h6>
              </div>
              <div>
                <p>{tongSoLuong}</p>
              </div>
            </div>
            <div className="ma-giam-gia">
              <div>
                <h6>Tổng tiền</h6>
              </div>
              <div>
                <p>{convertToCurrency(totalAmount)}</p>
              </div>
            </div>
            {dataHDKM.map((d) => (
              <div key={d.id} className="ma-giam-gia" style={{ color: 'red' }}>
                <div>
                  <h6>Tiền giảm</h6>
                </div>
                <div>
                  <p>-{convertToCurrency(d.tienGiam)}</p>
                </div>
              </div>
            ))}
            <div className="ma-giam-gia">
              <div>
                <h5>Khách phải trả</h5>
              </div>
              <div>
                <p style={{ fontSize: 'large', fontWeight: 'bold' }}>
                  {convertToCurrency(dataDetailHD.tongTienKhiGiam)}
                </p>
              </div>
            </div>
            <div className="ma-giam-gia">
              <div>
                <h6>Tiền khách đưa</h6>
              </div>
              <div>
                <input
                  type="number"
                  style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }}
                  onChange={(e) => handleChangeValueTien(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Form.Check
                inline
                checked={valuesUpdateHD.hinhThucThanhToan.ten === 'Tiền mặt'}
                label="Tiền mặt"
                onClick={() => {
                  setTienThua(
                    dataDetailHD.hinhThucThanhToan.tien -
                      dataDetailHD.tongTienKhiGiam +
                      tienKhachDua,
                  )
                  setHttt('Tiền mặt')
                  setValuesUpdateHD({
                    ...valuesUpdateHD,
                    ...valuesUpdateHD.hinhThucThanhToan,
                    hinhThucThanhToan: {
                      ten: 'Tiền mặt',
                    },
                  })
                  VNP(id)
                }}
                name="group1"
                type={'radio'}
              />
              <Form.Check
                inline
                label="Chuyển khoản"
                checked={valuesUpdateHD.hinhThucThanhToan.ten === 'VNPAY'}
                name="group1"
                type={'radio'}
                onClick={() => {
                  setTienThua(
                    dataDetailHD.hinhThucThanhToan.tien -
                      dataDetailHD.tongTienKhiGiam +
                      tienKhachDua,
                  )
                  setHttt('VNPAY')
                  setValuesUpdateHD({
                    ...valuesUpdateHD,
                    ...valuesUpdateHD.hinhThucThanhToan,
                    hinhThucThanhToan: {
                      ten: 'VNPAY',
                    },
                  })
                  VNP(id)
                }}
              />
            </div>
            <div className="ma-giam-gia">
              <div>
                <h6>Tiền thừa</h6>
              </div>
              <div>
                <p>{isNaN(tienThua) ? 0 : convertToCurrency(tienThua)}</p>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <input
                type="checkbox"
                checked={check === true}
                onChange={() => setCheck(!check)}
                className="me-2"
              />
              In hoá đơn
            </div>
            <div className="button-thanh-toan">
              {check && httt === 'VNPAY' && (
                <button
                  type="button"
                  className="btn btn-dark"
                  disabled={tienThua < 0 || tienKhachDua === 0}
                  onClick={() => handleThanhToanWithVNP()}
                >
                  <PDFDownloadLink
                    document={
                      <InvoiceDocument
                        dataDetailHD={dataDetailHD}
                        valuesSanPham={valuesSanPham}
                        dataHDKM={dataHDKM}
                        convertToCurrency={convertToCurrency}
                        totalAmount={totalAmount}
                        tienThua={tienThua}
                      />
                    }
                    fileName="hoa_don.pdf"
                  >
                    <Text style={styles.button}>
                      <i className="fa-solid fa-cart-shopping"></i> Thanh toán
                    </Text>
                  </PDFDownloadLink>
                </button>
              )}
              {check && httt === 'Tiền mặt' && (
                <button
                  type="button"
                  className="btn btn-dark"
                  disabled={tienThua < 0 || tienKhachDua === 0}
                  onClick={() => handleThanhToan()}
                >
                  <PDFDownloadLink
                    document={
                      <InvoiceDocument
                        dataDetailHD={dataDetailHD}
                        valuesSanPham={valuesSanPham}
                        dataHDKM={dataHDKM}
                        convertToCurrency={convertToCurrency}
                        totalAmount={totalAmount}
                        tienThua={tienThua}
                      />
                    }
                    fileName="hoa_don.pdf"
                  >
                    <Text style={styles.button}>
                      <i className="fa-solid fa-cart-shopping"></i> Thanh toán
                    </Text>
                  </PDFDownloadLink>
                </button>
              )}
              {!check && httt === 'Tiền mặt' && (
                <button
                  type="button"
                  className="btn btn-dark"
                  disabled={tienThua < 0 || tienKhachDua === 0}
                  onClick={() => handleThanhToan()}
                >
                  <i className="fa-solid fa-cart-shopping"></i> Thanh toán
                </button>
              )}
              {!check && httt === 'VNPAY' && (
                <button
                  type="button"
                  className="btn btn-dark"
                  disabled={tienThua < 0 || tienKhachDua === 0}
                  onClick={() => handleThanhToanWithVNP()}
                >
                  <i className="fa-solid fa-cart-shopping"></i> Thanh toán
                </button>
              )}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <Button variant="primary" onClick={handleShow1}>
              Thêm sản phẩm
            </Button>
            &nbsp; &nbsp;
          </CCardHeader>
          <CCardBody>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {values.map((d, i) => (
                    <Tab
                      key={i}
                      onClick={() => setId(d.id)}
                      label={
                        <span>
                          <span>{d.ma} &nbsp;&nbsp; </span>
                          <i
                            onClick={() => handleBackToCart(d.id)}
                            className="fa-solid fa-xmark"
                          ></i>
                        </span>
                      }
                    />
                  ))}
                </Tabs>

                <Button variant="outline-primary" style={{ border: 'none' }} onClick={handleAdd}>
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </Box>
              {values ? (
                values.map((d, i) => (
                  <CustomTabPanel key={i} value={value} index={i}>
                    <DonHang
                      id={d.id}
                      getAllHD={getAll}
                      setShow1={setShow1}
                      show1={show1}
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      setShow4={setShow4}
                      show4={show4}
                      setShow3={setShow3}
                      show3={show3}
                      setDataDetailHD={setDataDetailHD}
                      dataDetailHD={dataDetailHD}
                      detailHDById={detailHDById}
                      valuesSanPham={valuesSanPham}
                      totalAmount={totalAmount}
                      tongSoLuong={tongSoLuong}
                      getAllById={getAllById}
                      convertToCurrency={convertToCurrency}
                      findAllKM={findAllKM}
                      dataHDKM={dataHDKM}
                      urlPay={urlPay}
                      tienKhachDua={tienKhachDua}
                      valuesUpdateHD={valuesUpdateHD}
                      setValuesUpdateHD={setValuesUpdateHD}
                      VNP={VNP}
                      setTienThua={setTienThua}
                      tienThua={tienThua}
                      check={check}
                      updateTTHD={updateTTHD}
                    ></DonHang>
                  </CustomTabPanel>
                ))
              ) : (
                <CustomTabPanel>
                  <h1>Không có đơn nào</h1>
                </CustomTabPanel>
              )}
            </Box>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
