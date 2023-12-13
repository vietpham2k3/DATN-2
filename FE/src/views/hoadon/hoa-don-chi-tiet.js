/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import TextField from '@mui/material/TextField'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import _ from 'lodash'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { detailCTSP, getAllByIdSPTT } from 'service/SanPhamService'
import Modal from 'react-bootstrap/Modal'
import { PDFDownloadLink, Document, Page, Text, StyleSheet, Font, View } from '@react-pdf/renderer'
import myFont from '../../fonts/Roboto Việt Hóa/Roboto-Regular.ttf'
import { getTP, getQH, getP } from 'service/ApiGHNService'
import {
  detailHD,
  detailLSHD,
  xacNhanDH,
  huyDonHang,
  xacNhanGiao,
  getById,
  deleteHDCT,
  updateSL,
  getAllSP,
  searchCTSPofDH,
  addSP,
  getKmById,
  giaoHangThanhCong,
  giaoHangThatBai,
  updateHoaDon,
} from 'service/ServiceDonHang'
import { Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import InputSpinner from 'react-bootstrap-input-spinner'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { Link, useParams } from 'react-router-dom'

function HDCT() {
  const { id } = useParams()
  const dataLogin = JSON.parse(
    localStorage.getItem('dataLoginAD') || localStorage.getItem('dataLoginNV'),
  )
  const [lichSuHoaDon, setLichSuHoaDon] = useState([])
  const [thanhPho, setThanhPho] = useState([])
  const [quan, setQuan] = useState([])
  const [phuong, setPhuong] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  //sp
  const [valuesSanPham, setValuesSanPham] = useState([])
  // const [inputDetail, setInputDetail] = useState(null);
  const [dataSP, setDataSP] = useState([])
  const [mauSacKC, setMauSacKC] = useState([])
  const [dataDetail, setDataDetail] = useState({})
  const [idHDCT, setIdHDCT] = useState('')
  const [idSP, setidSP] = useState('')
  const [idCTSP, setidCTSP] = useState('')
  // detailHD
  const [hoaDon, setHoaDon] = useState({})
  const [valuesServices, setValuesServices] = useState({
    shop_id: 4625720,
    from_district: 1710,
    to_district: 0,
  })
  const [valuesFee, setValuesFee] = useState({
    service_id: 0,
    insurance_value: 0,
    coupon: null,
    from_district_id: 1710,
    to_district_id: 0,
    to_ward_code: '',
    height: 15,
    length: 15,
    weight: 5000,
    width: 15,
  })
  // cap nhat hoa don
  Font.register({ family: 'Roboto', src: myFont })

  const [totalAmount, setTotalAmount] = useState(0)
  const [tongTienKhiGiam, setTongTienKhiGiam] = useState(0)

  const [valuesUpdate, setValuesUpdate] = useState({
    chiTietSanPham: {
      id: '',
    },
    hoaDon: {
      id: id,
    },
    soLuong: '',
  })

  const [valuesAdd, setValuesAdd] = useState({
    chiTietSanPham: {
      id: '',
    },
    hoaDon: {
      id: id,
    },
    soLuong: '',
  })

  useEffect(() => {
    getAll(0)
  }, [])

  const getAll = async () => {
    const res = await getAllSP()
    if (res && res.data) {
      setDataSP(res.data)
    }
  }

  //searchSPinDH
  const [term, setTerm] = useState('')

  const searchSPofDH = async (term) => {
    const res = await searchCTSPofDH(term)
    if (res) {
      setDataSP(res.data)
    }
  }

  const handleSearchSPofDH = _.debounce(async () => {
    if (term) {
      searchSPofDH(term)
    } else {
      searchSPofDH('')
    }
  }, [])

  useEffect(() => {
    handleSearchSPofDH()
  }, [term])

  const handleInputChange = (e) => {
    setTerm(e.target.value)
  }

  const deleteHD = async (idHDCT) => {
    const res = await deleteHDCT(idHDCT)
    if (res) {
      getAllById(id)
    }
  }

  const handleDelete = (id) => {
    deleteHD(id)
  }

  useEffect(() => {
    if (id !== '') {
      getAllById(id)
    }
  }, [id])

  const getAllById = async (idHD) => {
    const res = await getById(idHD)
    if (res) {
      setValuesSanPham(res.data)
    }
  }

  const updateHD = async (id, value) => {
    const res = await updateHoaDon(id, value)
    if (res) {
      detail(id)
      setShowDC(false)
    }
  }

  const handleUpdateHD = async (event) => {
    event.preventDefault()

    toast.success('Cập nhật thành công !')
    if (id) {
      await updateHD(id, hoaDon)
    }
  }

  const handleUpdateSl = (id, idHD, idCTSP, soLuong) => {
    setIdHDCT(id)

    setValuesUpdate({
      ...valuesUpdate,
      chiTietSanPham: {
        id: idCTSP,
      },
      hoaDon: {
        id: idHD,
      },
      soLuong: soLuong,
    })

    setHoaDon((prevValues) => ({
      ...prevValues,
      tongTien: totalAmount,
      tongTienKhiGiam: tongTienKhiGiam,
    }))
  }

  const update = async (idHDCT, hoaDon) => {
    const res = await updateSL(idHDCT, hoaDon)
    if (res) {
      getAllById(id)
      detail(id)
    }
  }

  useEffect(() => {
    if (totalAmount) {
      updateHD(id, hoaDon)
    }
  }, [hoaDon.tongTien])

  useEffect(() => {
    if (idHDCT) {
      update(idHDCT, valuesUpdate)
    }
  }, [valuesUpdate])

  useEffect(() => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0)
    setTongTienKhiGiam(totalAmount - totalGiam + hoaDon.tienShip)

    setHoaDon({
      ...hoaDon,
      tongTien: totalAmount,
      tongTienKhiGiam: totalAmount - totalGiam + hoaDon.tienShip,
    })
  }, [hoaDon.tienShip, totalAmount])

  // kcms sp
  const handleAddSoLuong = (id, idSP) => {
    setShow7(true)
    setidSP(idSP)
    setidCTSP(id)
    setValuesAdd({ ...valuesAdd, chiTietSanPham: { id: id } })
  }

  const handleAdd = () => {
    // getAllById(id);
    if (valuesAdd.soLuong <= 0 || valuesAdd.soLuong === '') {
      toast.error('Vui lòng nhập số lượng !')
      return
    }
    if (parseInt(valuesAdd.soLuong) > parseInt(dataDetail.soLuong)) {
      toast.error('Đã vượt quá số lượng hiện có !')
      return
    }
    setShow99(false)
    add(valuesAdd)
  }

  const add = async (value) => {
    const res = await addSP(value)
    if (res.data === 'ok') {
      window.location.reload()
      toast.success('Thêm sản phẩm thành công')
    } else if (res) {
      toast.success('Thêm sản phẩm thành công')
      getAllById(id)
      handleCloseSPofDH()
      getAll()
      if (idCTSP) {
        detail2(idCTSP)
      }
    }
  }

  const handleCloseSPofDH = () => {
    setShow7(false)
    // chuachac dong
    setShow6(false)
    //
    // setInputDetail(null);
    // inputDetail(null);
    getAllById(id)
    setValuesAdd({
      chiTietSanPham: {
        id: '',
      },
      hoaDon: {
        id: id,
      },
      soLuong: '',
    })
  }

  const handleDetail = (id) => {
    // setInputDetail(id);
    setidCTSP(id)
    setValuesAdd({ ...valuesAdd, chiTietSanPham: { id: id } })
  }

  useEffect(() => {
    if (idSP) {
      getAllMSKC(idSP)
    }
  }, [idSP])

  useEffect(() => {
    if (idCTSP) {
      detail2(idCTSP)
    }
  }, [idCTSP])

  const detail2 = async (idCTSP) => {
    const res = await detailCTSP(idCTSP)
    if (res) {
      setDataDetail(res.data)
    }
  }

  const getAllMSKC = async (id) => {
    let res = await getAllByIdSPTT(id)
    if (res) {
      setMauSacKC(res.data)
    }
  }

  useEffect(() => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0)
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0
    valuesSanPham.forEach((d) => {
      sum += d.soLuong * d.donGia
    })
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum)
    setTongTienKhiGiam(sum - totalGiam + hoaDon.tienShip)
  }, [valuesSanPham, hoaDon.tienShip])

  // modal
  const [showDC, setShowDC] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [show4, setShow4] = useState(false)
  const [show6, setShow6] = useState(false)
  const [show7, setShow7] = useState(false)
  const [show8, setShow8] = useState(false)
  const [show9, setShow9] = useState(false)
  const [show99, setShow99] = useState(false)

  const handleClose = () => {
    setShowDC(false)
  }

  const [valuesId, setValuesId] = useState({
    province_id: '',
  })
  const [valuesIdWard, setValuesIdWard] = useState({
    district_id: '',
  })

  const handleShow = () => {
    thanhPho.forEach((province) => {
      if (province.NameExtension[1] === hoaDon.tinh) {
        setValuesId({
          province_id: province.ProvinceID,
        })
        // console.log(province.ProvinceID);
      }
      setSelectedProvince(province.ProvinceID)
    })

    setShowDC(true)
  }

  useEffect(() => {
    if (valuesId.province_id) {
      getQuanHuyen(valuesId)
    }
    setSelectedDistrict(valuesId)
  }, [valuesId.province_id])

  useEffect(() => {
    quan.forEach((district) => {
      if (district.DistrictName === hoaDon.huyen) {
        setValuesIdWard({
          district_id: district.DistrictID,
        })
        setValuesServices({
          ...valuesServices,
          to_district: district.DistrictID,
        })
        setValuesFee({
          ...valuesFee,
          to_district_id: district.DistrictID,
        })
      }
    })
  }, [quan, hoaDon, valuesId])

  useEffect(() => {
    if (valuesIdWard.district_id) {
      getPhuong(valuesIdWard)
    }
    setSelectedWard(valuesIdWard)
  }, [valuesIdWard.district_id])

  const handleClose1 = () => setShow1(false)
  const handleShow1 = () => setShow1(true)

  const handleClose99 = () => setShow99(false)
  const handleShow99 = () => setShow99(true)

  const tenNV = {
    nhanVien: { ten: dataLogin && dataLogin.ten },
  }

  const [lshd, setLshd] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten,
  })

  const [lshd1, setLshd1] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten,
  })

  const [lshd2, setLshd2] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten,
  })

  const [lshd4, setLshd4] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten,
  })

  const [lshd5, setLshd5] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten,
  })

  const [none, setNone] = useState(true)
  const [none1, setNone1] = useState(true)
  const [none2, setNone2] = useState(true)
  const [none3, setNone3] = useState(true)
  const [none4, setNone4] = useState(true)
  const [none5, setNone5] = useState(true)

  useEffect(() => {
    if (id) {
      detail(id)
      detailListLSHD(id)
      getKMByIdHD(id)
    }
  }, [id])

  const detail = async (id) => {
    const res = await detailHD(id)
    if (res && res.data) {
      setHoaDon(res.data)
    }
  }

  const [dataHDKM, setDataHDKM] = useState([])

  const getKMByIdHD = async (id) => {
    try {
      const res = await getKmById(id)
      if (res) {
        setDataHDKM(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // getListLSHDbyIDHD
  const detailListLSHD = async (id) => {
    const res = await detailLSHD(id)
    if (res && res.data) {
      setLichSuHoaDon(res.data)
    }
  }

  //Ghi chu and more haha
  //xac nhan don
  const xacNhan = async (id, value) => {
    const res = await xacNhanDH(id, value, tenNV.nhanVien.ten)
    if (res) {
      toast.success('Cập nhật thành công !')
      setShow2(false)
      detail(id)
      detailListLSHD(id)
    }
  }

  const handleXacNhanDH = async (event) => {
    event.preventDefault()
    await xacNhan(id, lshd, tenNV.nhanVien.ten)
  }

  // huy don
  const huyDon = async (id, value) => {
    const res = await huyDonHang(id, value, tenNV.nhanVien.ten)
    if (res) {
      toast.success('Cập nhật thành công !')
      setShow3(false)
      detail(id)
      detailListLSHD(id)
    }
  }

  const handleHuyDon = async (event) => {
    event.preventDefault()
    await huyDon(id, lshd1, tenNV.nhanVien.ten)
  }

  // xac nhan giao hang
  const giaoHang = async (id, value) => {
    const res = await xacNhanGiao(id, value)
    if (res) {
      toast.success('Cập nhật thành công !')
      setShow4(false)
      detail(id)
      detailListLSHD(id)
    }
  }

  const handleXacNhanGiaoHang = async (event) => {
    event.preventDefault()
    if (hoaDon.tienShip === 0 || hoaDon.tienShip === '' || hoaDon.tienShip === null) {
      toast.error('Vui lòng điền phí vận chuyển !')
      return;
    }
    await giaoHang(id, lshd2)
  }

  // xac nhan giao hang thanh cong

  const giaoHangTC = async (id, value) => {
    const res = await giaoHangThanhCong(id, value)
    if (res) {
      toast.success('Cập nhật thành công !')
      setShow8(false)
      detail(id)
      detailListLSHD(id)
    }
  }

  const handleXacNhanGiaoHangThanhCong = async (event) => {
    event.preventDefault()
    await giaoHangTC(id, lshd4)
  }

  // apiGHN

  const getThanhPho = async () => {
    try {
      const res = await getTP()
      if (res) {
        setThanhPho(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getQuanHuyen = async (value) => {
    try {
      const res = await getQH(value)
      if (res) {
        setQuan(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getPhuong = async (value) => {
    const res = await getP(value)
    if (res) {
      setPhuong(res.data.data)
    }
  }

  useEffect(() => {
    getThanhPho()
  }, [])

  const handleProvinceChange = (event) => {
    const provinceId = {
      province_id: event.target.value,
    }

    setSelectedProvince(event.target.value)
    getQuanHuyen(provinceId)
    const selectedProvinceId = event.target.value
    const selectedProvince = thanhPho.find(
      (province) => province.ProvinceID === parseInt(selectedProvinceId, 10),
    )

    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.NameExtension[1]
      setHoaDon({
        ...hoaDon,
        tinh: selectedProvinceName,
      })
    }
  }

  const handleDistrictChange = (event) => {
    const districtId = {
      district_id: event.target.value,
    }
    setSelectedDistrict(event.target.value)
    setValuesServices({
      ...valuesServices,
      to_district: parseInt(event.target.value, 10),
    })
    // setTgDuKien({
    //   ...tgDuKien,
    //   to_district_id: parseInt(event.target.value, 10)
    // });
    getPhuong(districtId)
    // setValuesFee({
    //   ...valuesFee,
    //   to_district_id: parseInt(event.target.value, 10)
    // });
    const selectedProvinceId = event.target.value
    const selectedProvince = quan.find(
      (province) => province.DistrictID === parseInt(selectedProvinceId, 10),
    )

    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.DistrictName
      setHoaDon({
        ...hoaDon,
        huyen: selectedProvinceName,
      })
    }
  }

  const handleWardChange = (event) => {
    // const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setSelectedWard(event.target.value)
    // setValuesFee({
    //   ...valuesFee,
    //   insurance_value: totalAmount,
    //   to_ward_code: event.target.value
    // });
    // setTgDuKien({
    //   ...tgDuKien,
    //   to_ward_code: event.target.value
    // });
    // setTongTienKhiGiam(totalAmount - totalGiam + hoaDon.tienShip);
    const selectedProvinceId = event.target.value
    const selectedProvince = phuong.find((province) => province.WardCode === selectedProvinceId)

    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.WardName
      setHoaDon({
        ...hoaDon,
        xa: selectedProvinceName,
      })
    }
  }

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })

    return formatter.format(number)
  }

  function formatDate(dateString) {
    if (dateString === null) {
      return ''
    }

    const dateObject = new Date(dateString)

    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()

    let hours = dateObject.getHours()
    const minutes = dateObject.getMinutes()

    // Đảm bảo hiển thị đúng định dạng hh:mm
    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')

    const formattedDate = `${day}/${month}/${year} ${formattedHours}:${formattedMinutes}`

    return formattedDate
  }

  //in hóa đơn

  const styles = StyleSheet.create({
    container: {
      marginLeft: '40px',
    },
    title: {
      paddingTop: '50px',
      paddingBottom: '20px',
      fontSize: '20px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    titleHD: {
      paddingTop: '20px',
      fontSize: '20px',
      fontFamily: 'Roboto',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    titleTB: {
      fontSize: '15px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      paddingBottom: '10px',
    },
    text: {
      fontSize: '13px',
      fontFamily: 'Roboto',
      textAlign: 'center',
    },
    textMaHD: {
      fontSize: '13px',
      fontFamily: 'Roboto',
      textAlign: 'center',
      paddingBottom: '20px',
    },
    textThuocTinh: {
      fontSize: '10px',
      fontFamily: 'Roboto',
      marginBottom: '3px',
      marginTop: '3px',
    },
    table: {
      width: '100%',
      marginLeft: '40px',
      marginRight: '40px',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      borderTop: '1px solid #EEE',
      marginRight: '40px',
    },
    header: {
      borderTop: 'none',
    },
    bold: {
      fontWeight: 'bold',
    },
    // So Declarative and unDRY 👌
    row1: {
      width: '10%',
      paddingTop: '10px',
      paddingBottom: '10px',
      fontSize: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto',
    },
    row2: {
      width: '25%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto',
    },
    row3: {
      width: '20%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto',
    },
    row4: {
      width: '20%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto',
    },
    row5: {
      width: '20%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      border: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto',
    },
    colorBlock: {
      width: 30,
      height: 30,
      borderRadius: 10,
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    textLeft: {
      fontFamily: 'Roboto',
      fontSize: '13px',
      marginLeft: '40px',
    },
    textRight: {
      fontFamily: 'Roboto',
      fontSize: '15px',
      marginRight: '30px',
    },
    button: {
      color: 'white',
      textDecoration: 'none',
    },
  })
  console.log(hoaDon)
  const InvoiceDocument = () => {
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
          <Text style={styles.textMaHD}>{hoaDon.ma}</Text>

          <div style={styles.container}>
            <Text style={styles.textThuocTinh}>Ngày tạo: {formatDate(hoaDon.ngayThanhToan)}</Text>
            <Text style={styles.textThuocTinh}>Khách hàng: {hoaDon.tenNguoiNhan}</Text>
            {hoaDon.loaiDon === 1 && (
              <Text style={styles.textThuocTinh}>
                Địa chỉ:{' '}
                {hoaDon.diaChi + ' , ' + hoaDon.xa + ', ' + hoaDon.huyen + ', ' + hoaDon.tinh}
              </Text>
            )}
            {hoaDon.soDienThoai !== '' && (
              <Text style={styles.textThuocTinh}>Số điện thoại: {hoaDon.soDienThoai}</Text>
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
            {hoaDon.tienShip !== 0 && (
              <View style={styles.flexContainer}>
                <Text style={styles.textLeft}>Tiền ship</Text>
                <Text style={styles.textRight}>{convertToCurrency(hoaDon.tienShip)}</Text>
              </View>
            )}

            <Text style={styles.textLeft}></Text>
            {dataHDKM.map((d) => (
              <View key={d.id} style={[styles.flexContainer, { color: 'red' }]}>
                <Text style={styles.textLeft}>Khuyến mãi</Text>
                <Text style={styles.textRight}>-{convertToCurrency(d.tienGiam)}</Text>
              </View>
            ))}

            <View style={styles.flexContainer}>
              <Text style={styles.textLeft}>Tiền cần thanh toán</Text>
              <Text style={styles.textRight}>{convertToCurrency(hoaDon.tongTienKhiGiam)}</Text>
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

  const handleTienShipChange = async (e) => {
    if (e) {
      const value = parseFloat(e.target.value)
      if (!isNaN(value)) {
        if (value < 0) {
          // Nếu nhỏ hơn 0, đặt giá trị thành 0
          setHoaDon({ ...hoaDon, tienShip: value })
          updateHD(id, { ...hoaDon, tienShip: value })
        } else {
          // Nếu không, cập nhật giá trị trong state
          setHoaDon({ ...hoaDon, tienShip: value })
          updateHD(id, { ...hoaDon, tienShip: value })
        }
      }
    }
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Cập Nhật Thông Tin
    </Tooltip>
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="col-7">
                {/* button */}
                <div className="row">
                  {/* xac nhan don hang */}
                  <div style={{ paddingLeft: 32 }} className="col-auto">
                    {hoaDon.trangThai === 0 && hoaDon.loaiDon === 1 && (
                      <Button onClick={handleXacNhanDH} className="btn btn-primary">
                        Xác nhận
                      </Button>
                    )}

                    {/* //xac nhan giao hang */}
                    {hoaDon.trangThai === 1 && hoaDon.loaiDon === 1 && (
                      <Button onClick={handleXacNhanGiaoHang} className="btn btn-info">
                        Giao hàng
                      </Button>
                    )}

                    {/* //giao hang thanh cong */}
                    {hoaDon.trangThai === 3 && hoaDon.loaiDon === 1 && (
                      <button
                        style={{ width: 200 }}
                        onClick={handleXacNhanGiaoHangThanhCong}
                        className="btn btn-success"
                      >
                        Giao hàng thành công
                      </button>
                    )}
                  </div>

                  {/* //huy don */}
                  <div className="col-auto">
                    {(hoaDon.trangThai === 0 || hoaDon.trangThai === 1) && hoaDon.loaiDon === 1 && (
                      <button onClick={handleHuyDon} className="btn btn-danger">
                        Hủy
                      </button>
                    )}
                     {(hoaDon.trangThai === 3) && hoaDon.loaiDon === 1 && (
                      <button onClick={handleHuyDon} className="btn btn-danger">
                        Giao hàng thất bại
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-5">
                <div
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                  className="justify-content-end"
                >
                  <Button onClick={handleShow1} variant="primary" className="btn btn-dark">
                    <span style={{ fontWeight: 'bold' }}>Lịch sử hóa đơn</span>
                  </Button>
                </div>
              </div>

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ marginLeft: 150, paddingBottom: 300 }}
                show={show1}
                onHide={handleClose1}
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter" style={{ marginLeft: 300 }}>
                    Lịch Sử Hóa Đơn
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <section className="navbar-expand-lg navbar-light bg-light">
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <Table id="myTable" className="table" style={{ textAlign: 'center' }}>
                        <thead>
                          <tr style={{ textAlign: 'center' }}>
                            <th>Trạng Thái</th>
                            <th>Thời gian</th>
                            <th>Người tạo</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {lichSuHoaDon.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item.trangThai === 0 && (
                                  <span
                                    style={{
                                      color: '#FF9900',
                                      fontWeight: 'bold',
                                      fontStyle: 'italic',
                                      fontFamily: 'revert',
                                      fontSize: 18,
                                    }}
                                  >
                                    Chờ xác nhận
                                  </span>
                                )}
                                {item.trangThai === 1 && (
                                  <span
                                    style={{
                                      color: '#666666',
                                      fontWeight: 'bold',
                                      fontStyle: 'italic',
                                      fontFamily: 'revert',
                                      fontSize: 18,
                                    }}
                                  >
                                    Chờ vận chuyển
                                  </span>
                                )}
                                {item.trangThai === 2 && (
                                  <span
                                    style={{
                                      color: 'orange',
                                      fontWeight: 'bold',
                                      fontStyle: 'italic',
                                      fontFamily: 'revert',
                                      fontSize: 18,
                                    }}
                                  >
                                    Đã hủy
                                  </span>
                                )}

                                {item.trangThai === 3 && (
                                  <span
                                    style={{
                                      color: '#FF6633',
                                      fontWeight: 'bold',
                                      fontStyle: 'italic',
                                      fontFamily: 'revert',
                                      fontSize: 18,
                                    }}
                                  >
                                    Đang giao
                                  </span>
                                )}
                                {item.trangThai === 4 && (
                                  <span
                                    style={{
                                      color: '#0066FF',
                                      fontWeight: 'bold',
                                      fontStyle: 'italic',
                                      fontFamily: 'revert',
                                      fontSize: 18,
                                    }}
                                  >
                                    Đã hoàn thành
                                  </span>
                                )}
                              </td>
                              <td>{formatDate(item.ngayTao)}</td>
                              <td>{item.nguoiTao}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </section>
                </Modal.Body>
              </Modal>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="row">
              <div className="col-auto">
                <strong style={{ fontSize: 25 }}>Thông Tin Hóa Đơn</strong>
              </div>
              <div className="col-auto">
                {hoaDon.trangThai === 0 && hoaDon.loaiDon === 1 && (
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 300 }}
                    overlay={renderTooltip}
                  >
                    <Link
                      onClick={handleShow}
                      className="fa-solid fa-file-pen fa-xl fa-khenh"
                      style={{ paddingTop: 15, color: 'blueviolet' }}
                    ></Link>
                  </OverlayTrigger>
                )}

                {hoaDon.trangThai === 4 && (
                  <button className="btn btn-info" data-bs-placement="right">
                    <PDFDownloadLink document={<InvoiceDocument />} fileName="hoa_don.pdf">
                      <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>In Hóa Đơn</span>
                    </PDFDownloadLink>
                  </button>
                )}
              </div>
            </div>
            <Modal style={{ marginLeft: 150, paddingTop: 50 }} show={showDC} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{ marginLeft: 50 }}>Cập Nhật Thông Tin Khách Hàng</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className="needs-validation" noValidate onSubmit={handleUpdateHD}>
                  <div className="col-auto">
                    <div className="form-group row">
                      <label
                        style={{ fontWeight: 'bold' }}
                        htmlFor="tenNguoiNhan"
                        className="col-sm-3 col-form-label"
                      >
                        Họ Và Tên:
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="tenNguoiNhan"
                          placeholder="Họ Và Tên"
                          value={hoaDon.tenNguoiNhan}
                          onChange={(e) => {
                            setHoaDon({ ...hoaDon, tenNguoiNhan: e.target.value })
                            setNone(true)
                            setNone1(true)
                          }}
                        />
                        {!none && (
                          <div style={{ color: 'red' }}>Tên người nhận không được để trống !</div>
                        )}
                        {!none1 && (
                          <div style={{ color: 'red' }}>
                            Tên người nhận không được quá 30 ký tự và phải là chữ !
                          </div>
                        )}
                      </div>
                    </div>
                    <br></br>
                    <div className="form-group row">
                      <label
                        style={{ fontWeight: 'bold' }}
                        htmlFor="soDienThoai"
                        className="col-sm-3 col-form-label"
                      >
                        SĐT:
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="tel"
                          className="form-control"
                          name="soDienThoai"
                          placeholder="Số Điện Thoại"
                          value={hoaDon.soDienThoai}
                          onChange={(e) => {
                            setHoaDon({ ...hoaDon, soDienThoai: e.target.value })
                            setNone2(true)
                            setNone3(true)
                          }}
                        />
                        {!none2 && (
                          <div style={{ color: 'red' }}>Số điện thoại không được để trống !</div>
                        )}
                        {!none3 && (
                          <div style={{ color: 'red' }}>
                            Số điện thoại phải là số, bắt đầu bằng số 0 và phải đúng 10 số !
                          </div>
                        )}
                      </div>
                    </div>
                    <br></br>
                    <div className="form-group row">
                      <label
                        style={{ fontWeight: 'bold' }}
                        htmlFor="diaChi"
                        className="col-sm-3 col-form-label"
                      >
                        Địa Chỉ:
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          className="form-control"
                          rows="3"
                          name="diaChi"
                          placeholder="Địa Chỉ"
                          value={hoaDon.diaChi}
                          onChange={(e) => {
                            setHoaDon({ ...hoaDon, diaChi: e.target.value })
                            setNone4(true)
                            setNone5(true)
                          }}
                        ></textarea>
                        {!none4 && (
                          <div style={{ color: 'red' }}>Địa chỉ không được để trống !</div>
                        )}
                        {!none5 && (
                          <div style={{ color: 'red' }}>
                            Địa chỉ không được vượt quá 250 ký tự !
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <div className="form-group">
                    <div className="col-auto">
                      <select
                        id="province"
                        className="form-select fsl"
                        onChange={handleProvinceChange}
                      >
                        <option value="">-----Chọn tỉnh thành-----</option>
                        {thanhPho.map((province) => (
                          <option
                            key={province.ProvinceID}
                            selected={province.NameExtension[1] === hoaDon.tinh}
                            value={province.ProvinceID}
                          >
                            {province.NameExtension[1]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br></br>
                  <div className="form-group">
                    <div className="col-auto">
                      <select
                        id="district"
                        className="form-select fsl"
                        disabled={!selectedProvince}
                        onChange={(e) => handleDistrictChange(e)}
                      >
                        <option value="">----Chọn quận huyện-----</option>
                        {quan.map((district) => (
                          <option
                            key={district.DistrictID}
                            selected={district.DistrictName === hoaDon.huyen}
                            value={district.DistrictID}
                          >
                            {district.DistrictName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br></br>
                  <div className="form-group">
                    <div className="col-auto">
                      <select
                        id="ward"
                        className="form-select fsl"
                        disabled={!selectedProvince || !selectedDistrict}
                        onChange={handleWardChange}
                      >
                        <option value="">-----Chọn phường xã-----</option>
                        {phuong.map((ward) => (
                          <option
                            key={ward.WardCode}
                            selected={ward.WardName === hoaDon.xa}
                            value={ward.WardCode}
                          >
                            {ward.WardName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Cập Nhật
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </CCardHeader>
          <CCardBody>
            <div>
              <Row>
                <Col sm={6} className="row">
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '100px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        paddingTop: 3,
                      }}
                    >
                      Trạng Thái:
                    </span>
                  </Col>
                  <Col sm={3}>
                    <div style={{ display: 'inline-block', width: '300px' }}>
                      {hoaDon.trangThai === 0 && (
                        <span
                          style={{
                            color: '#FF9900',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            fontFamily: 'revert',
                            fontSize: 18,
                          }}
                        >
                          Chờ xác nhận
                        </span>
                      )}
                      {hoaDon.trangThai === 1 && (
                        <span
                          style={{
                            color: '#666666',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            fontFamily: 'revert',
                            fontSize: 18,
                          }}
                        >
                          Chờ vận chuyển
                        </span>
                      )}
                      {hoaDon.trangThai === 2 && (
                        <span
                          style={{
                            color: '#EE0000',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            fontFamily: 'revert',
                            fontSize: 18,
                          }}
                        >
                          Đã hủy
                        </span>
                      )}

                      {hoaDon.trangThai === 3 && (
                        <span
                          style={{
                            color: '#FF6633',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            fontFamily: 'revert',
                            fontSize: 18,
                          }}
                        >
                          Đang giao
                        </span>
                      )}
                      {hoaDon.trangThai === 4 && (
                        <span
                          style={{
                            color: '#0066FF',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            fontFamily: 'revert',
                            fontSize: 18,
                          }}
                        >
                          Đã hoàn thành
                        </span>
                      )}
                    </div>
                  </Col>
                </Col>

                <Col sm={6} className="row">
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '100px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                    >
                      Mã Hóa Đơn:
                    </span>
                  </Col>
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        fontSize: '15px',
                      }}
                    >
                      {hoaDon.ma}
                    </span>
                  </Col>
                </Col>
              </Row>

              <br />

              <Row>
                <Col sm={6} className="row">
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '200px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                    >
                      Họ và tên:
                    </span>
                  </Col>
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        fontSize: '15px',
                      }}
                    >
                      {hoaDon.tenNguoiNhan}
                    </span>
                  </Col>
                </Col>
                <Col sm={6} className="row">
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '100px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                    >
                      Loại Hóa Đơn:
                    </span>
                  </Col>
                  <Col sm={3}>
                    <div style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>
                      {hoaDon.loaiDon === 0 && (
                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Bán trực tiếp</span>
                      )}
                      {hoaDon.loaiDon === 1 && (
                        <span style={{ color: 'green', fontWeight: 'bold' }}>Mua Hàng Online</span>
                      )}
                    </div>
                  </Col>
                </Col>
              </Row>

              <br />

              <Row>
                <Col sm={6} className="row">
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '120px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                    >
                      Số Điện Thoại:
                    </span>
                  </Col>
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        fontSize: '15px',
                      }}
                    >
                      {hoaDon.soDienThoai === '' && (
                        <>Không có số điện thoại !</>
                      )}
                      {hoaDon.soDienThoai !== '' && (
                        hoaDon.soDienThoai && hoaDon.soDienThoai
                      )}
                    </span>
                  </Col>
                </Col>
                <Col sm={6} className="row">
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '200px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                    >
                      Hình Thức:
                    </span>
                  </Col>
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        fontSize: '15px',
                      }}
                    >
                      {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.ten}
                    </span>
                  </Col>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6} className="row">
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '200px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                    >
                      Địa Chỉ:
                    </span>
                  </Col>
                  <Col sm={3}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '300px',
                        fontSize: '15px',
                      }}
                    >
                      {hoaDon.diaChi !== null && (
                        <p>
                          {hoaDon.diaChi}, {hoaDon.xa}, {hoaDon.huyen}, {hoaDon.tinh}
                        </p>
                      )}
                      {hoaDon.diaChi === null && (
                        <>
                          Không có địa chỉ !
                        </>
                      )}
                    </span>
                  </Col>
                </Col>
              </Row>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          {hoaDon.loaiDon === 1 && (hoaDon.trangThai === 0 || hoaDon.trangThai === 1) && (
            <CCardHeader>
              <Button variant="primary" onClick={handleShow99}>
                Thêm sản phẩm
              </Button>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ marginLeft: 150 }}
                show={show99}
                onHide={handleClose99}
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">Thêm Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="box col-auto col-6">
                    <div className="search">
                      <input
                        style={{ borderRadius: 15, height: 35 }}
                        type="text"
                        className="input-search results-list"
                        placeholder="Nhập mã hoặc tên sản phẩm cần tìm..."
                        value={term}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <section className="navbar-expand-lg navbar-light bg-light">
                    <div>
                      <div className="results-list">
                        <Table>
                          <tbody>
                            {dataSP.length > 0 ? (
                              dataSP.map((d, i) => (
                                <tr
                                  key={i}
                                  onClick={() => handleAddSoLuong(d.id, d.sanPham.id)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <td>
                                    <img
                                      src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
                                      className="product-image"
                                      style={{ width: '70px', height: '100px' }}
                                      alt='"none"'
                                    />
                                  </td>
                                  <td>{d.sanPham.ma}</td>
                                  <td>{d.sanPham.ten}</td>
                                  <td>{d.soLuong || 0}</td>
                                  <td>{convertToCurrency(d.giaBan)}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={5}>Không có dữ liệu</td>
                              </tr>
                            )}
                          </tbody>
                        </Table>

                        <Modal
                          show={show7}
                          onHide={() => setShow7(false)}
                          style={{ marginLeft: 150 }}
                          backdrop="static"
                          keyboard={false}
                          size="md"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Chọn loại của sản phẩm</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="body-add-new">
                              <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                  Thuộc tính
                                </label>

                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={(e) => handleDetail(e.target.value)}
                                >
                                  {mauSacKC.map((d, i) => (
                                    <option key={i} value={d.id}>
                                      {d.mauSac.ma} - {d.kichCo.ten} - {d.chatLieu.ten} -{' '}
                                      {d.loaiSanPham.ten} - {d.nhaSanXuat.ten}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                  Số lượng:{' '}
                                  <small>
                                    Còn lại <strong>{dataDetail.soLuong}</strong>
                                  </small>
                                </label>
                                <input
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  type="number"
                                  onChange={(e) =>
                                    setValuesAdd({ ...valuesAdd, soLuong: e.target.value })
                                  }
                                ></input>
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="primary" onClick={() => handleAdd()}>
                              Thêm
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </section>
                </Modal.Body>
              </Modal>
            </CCardHeader>
          )}
          <CCardBody>
            <div className="table-container">
              <Table striped className="my-4">
                <tr className="ps-5">
                  <th>#</th>
                  <th>Mã</th>
                  <th>Ảnh</th>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng tiền</th>
                </tr>
                <tbody className="table-group-divider">
                  {valuesSanPham.map((d, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{d.chiTietSanPham.sanPham.ma}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                          className="product-image"
                          style={{ width: '70px', height: '100px' }}
                        />
                      </td>
                      <td>
                        {d.chiTietSanPham.sanPham.ten} <br />
                        {d.chiTietSanPham.kichCo.ten} -{' '}
                        <span
                          className="color-circle"
                          style={{
                            backgroundColor: d.chiTietSanPham.mauSac.ten,
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            height: '15px',
                            width: '15px',
                          }}
                        ></span>
                      </td>
                      <td>
                        {hoaDon.loaiDon === 1 &&
                          (hoaDon.trangThai === 0 || hoaDon.trangThai === 1) ? (
                          <div
                            className="input-spinner"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              width: 120,
                              justifyContent: 'center',
                            }}
                          >
                            <InputSpinner
                              key={d.id} // Đặt key duy nhất cho mỗi InputSpinner
                              max={d.chiTietSanPham.soLuong + d.soLuong}
                              min={1}
                              step={1}
                              value={d.soLuong}
                              onChange={(e) =>
                                handleUpdateSl(d.id, d.hoaDon.id, d.chiTietSanPham.id, e)
                              }
                              type={'real'}
                              variant={'primary'}
                              size="sm"
                              arrows
                            />
                          </div>

                        ) : (
                          <span style={{ fontWeight: 'bold' }}>{d.soLuong}</span>
                        )}
                        
                      </td>
                      <td>{convertToCurrency(d.donGia)}</td>
                      <td>{convertToCurrency(d.soLuong * d.donGia)}</td>
                      {hoaDon.loaiDon === 1 &&
                        (hoaDon.trangThai === 0 || hoaDon.trangThai === 1) && (
                          <td>
                            <button
                              onClick={() => handleDelete(d.id)}
                              style={{ color: 'orange' }}
                              className="fa-solid fa-trash-can fa-khenh"
                            ></button>
                          </td>
                        )}
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Container style={{ display: 'flex', justifyContent: 'end' }}>
                <Row style={{ marginBottom: 10 }}>
                  <Col sm={12} className="row">
                    <Col sm={6}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '120px',
                          fontSize: '15px',
                          fontWeight: 'bold',
                        }}
                      >
                        Tiền sản phẩm:
                      </span>
                    </Col>
                    <Col sm={6}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '120px',
                          fontSize: '15px',
                        }}
                      >
                        {convertToCurrency(totalAmount)}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>

              <br></br>

              {hoaDon && hoaDon.loaiDon === 1 && (
                <Container style={{ display: 'flex', justifyContent: 'end' }}>
                  <Row style={{ marginBottom: 10 }}>
                    <Col sm={12} className="row">
                      <Col sm={6}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '120px',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            paddingTop: 6,
                          }}
                        >
                          Phí ship:
                        </span>
                      </Col>
                      <Col sm={6}>
                        {(hoaDon && hoaDon.trangThai === 0) || hoaDon.trangThai === 1 ? (
                          <input
                            style={{
                              display: 'inline-block',
                              width: '120px',
                              fontSize: '15px',
                              height: 35,
                            }}
                            className="form-control"
                            type="number"
                            value={hoaDon.tienShip}
                            onChange={handleTienShipChange}
                          />
                        ) : (
                          <span
                            style={{
                              display: 'inline-block',
                              width: '120px',
                              fontSize: '15px',
                              paddingTop: 6,
                            }}
                          >
                            {convertToCurrency(hoaDon.tienShip)}
                          </span>
                        )}
                      </Col>
                    </Col>
                  </Row>
                </Container>
              )}
              <br></br>

              {dataHDKM && dataHDKM.length > 0 && (
                <Container style={{ display: 'flex', justifyContent: 'end' }}>
                  <Row style={{ marginBottom: 10 }}>
                    <Col sm={12} className="row">
                      <Col sm={6}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '120px',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: 'red',
                            fontStyle: 'italic',
                          }}
                        >
                          Khuyến mãi:
                        </span>
                      </Col>
                      <Col sm={6}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '120px',
                            fontSize: '15px',
                            color: 'red',
                            fontStyle: 'italic',
                          }}
                        >
                          {dataHDKM.map((d, i) => (
                            <tr key={i} style={{ color: 'red' }}>
                              <td>- {convertToCurrency(d.tienGiam)}</td>
                            </tr>
                          ))}
                        </span>
                      </Col>
                    </Col>
                  </Row>
                </Container>
              )}

              <br></br>
              <Container style={{ display: 'flex', justifyContent: 'end' }}>
                <Row style={{ marginBottom: 10 }}>
                  <Col sm={12} className="row">
                    <Col sm={6}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '150px',
                          fontSize: '22px',
                          fontWeight: 'bold',
                        }}
                      >
                        Tổng tiền:
                      </span>
                    </Col>
                    <Col sm={6}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '200px',
                          fontSize: '22px',
                          fontWeight: 'bold',
                        }}
                      >
                        {convertToCurrency(tongTienKhiGiam)}{' '}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      {/*  */}
    </CRow>
  )
}

export default HDCT
