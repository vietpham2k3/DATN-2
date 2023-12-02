/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import '../../scss/DonHang.scss'
import { Button, Table } from 'react-bootstrap'
import { useState } from 'react'
import _ from 'lodash'
import { useEffect } from 'react'
import { searchCTSP, getAllByIdSPTT, detailCTSP } from '../../service/SanPhamService'
import SearchResult from './SearchResultList'
import {
  getById,
  updateSL,
  deleteHDCT,
  updateHD,
  addKM,
  getKmById,
  detailHD,
  thanhToan,
  searchCTSPofDH,
  addSP,
  getAllKH,
  getAllSP,
  searchKHofDH,
  addKH2,
} from '../../service/ServiceDonHang'
import InputSpinner from 'react-bootstrap-input-spinner'
import TableKM from './TableKM'
import { detailKM, getAllKM } from '../../service/ServiceKhuyenMai'
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal'
import { pay } from '../../service/PayService'
function DonHang(props) {
  // eslint-disable-next-line react/prop-types
  const {
    id,
    getAllHD,
    show1,
    setShow1,
    setIsModalOpen,
    isModalOpen,
    show4,
    setShow4,
    show3,
    setShow3,
    detailHDById,
    dataDetailHD,
    getAllById,
    tongSoLuong,
    totalAmount,
    valuesSanPham,
    convertToCurrency,
    dataHDKM,
    findAllKM,
    setValuesUpdateHD,
    valuesUpdateHD,
    urlPay,
    tienKhachDua,
    VNP,
    setTienThua,
    tienThua,
    check,
    updateTTHD,
  } = props
  const [inputValue, setInputValue] = useState('')
  const [show, setShow] = useState(false)
  const [idHDCT, setIdHDCT] = useState('')
  const [idKM, setIdKM] = useState('')
  const [httt, setHttt] = useState('Tiền mặt')
  const [values, setValues] = useState([])
  const [dataKM, setDataKM] = useState([])
  const [tienGiam, setTienGiam] = useState(0)

  const [activeIndex, setActiveIndex] = useState(null)
  const [dataDetailKM, setDataDetailKM] = useState({})
  const [valuesAddKM, setValuesAddKM] = useState({
    khuyenMai: {
      id: '',
    },
    hoaDon: {
      id: id,
    },
    tienGiam: 0,
  })

  const [valuesUpdate, setValuesUpdate] = useState({
    chiTietSanPham: {
      id: '',
    },
    hoaDon: {
      id: id,
    },
    soLuong: '',
  })

  useEffect(() => {
    setValuesUpdateHD((prevValuesUpdateHD) => ({
      ...prevValuesUpdateHD,
      tenNguoiNhan: valuesKH.tenKhachHang,
      soDienThoai: valuesKH.sdt,
      tongTien: totalAmount,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount])

  useEffect(() => {
    setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam)
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0)
    setValuesUpdateHD((prevValuesUpdateHD) => ({
      ...prevValuesUpdateHD,
      ...prevValuesUpdateHD.hinhThucThanhToan,
      tenNguoiNhan: valuesKH.tenKhachHang,
      soDienThoai: valuesKH.sdt,
      tongTienKhiGiam: totalAmount - totalGiam,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount, dataKM])

  useEffect(() => {
    handleSearchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  useEffect(() => {
    findAllKM(id)
    getAllById(id)
    if (dataDetailHD.tongTienKhiGiam || id) {
      VNP(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (idHDCT) {
      update(idHDCT, valuesUpdate)
    }
  }, [valuesUpdate])

  useEffect(() => {
    handleUpdateHD()
  }, [valuesUpdateHD])

  useEffect(() => {
    getKM(totalAmount)
  }, [totalAmount])

  useEffect(() => {
    if (idKM) {
      detailMaKM(idKM)
    }
  }, [idKM])

  useEffect(() => {
    setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam)
  }, [valuesUpdateHD.hinhThucThanhToan.tien])

  useEffect(() => {
    if (dataDetailHD.tongTienKhiGiam === 0) {
      // toast.error('Lỗi tiền khi giảm!')
    } else if (valuesAddKM.khuyenMai.id) {
      postKM(valuesAddKM)
    }
  }, [valuesAddKM])

  const detailMaKM = async (id) => {
    const res = await detailKM(id)
    if (res) {
      setDataDetailKM(res.data)
    }
  }

  const handleAddValueKm = (idKM, tienGiam, loaiGiam) => {
    // const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setIdKM(idKM)
    VNP(id)
    if (loaiGiam) {
      setValuesAddKM({
        ...valuesAddKM,
        khuyenMai: {
          id: idKM,
        },
        tienGiam: tienGiam,
      })
      setTienThua(valuesUpdateHD.hinhThucThanhToan.tien)
      setTienGiam(tienGiam)
    } else {
      setValuesAddKM({
        ...valuesAddKM,
        khuyenMai: {
          id: idKM,
        },
        tienGiam: (tienGiam * totalAmount) / 100,
      })
      setTienThua(valuesUpdateHD.hinhThucThanhToan.tien)
      setTienGiam((tienGiam * totalAmount) / 100)
    }
  }

  const postKM = async (value) => {
    const res = await addKM(value)
    if (res.data === 'Mày thích spam không ?') {
      toast.warning('Bạn đang sử dụng mã giảm giá này')
      return
    } else {
      detailHDById(id)
      findAllKM(id)
      setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam)
      const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0)
      setValuesUpdateHD((prevValuesUpdateHD) => ({
        ...prevValuesUpdateHD,
        ...prevValuesUpdateHD.hinhThucThanhToan,
        tenNguoiNhan: valuesKH.tenKhachHang,
        soDienThoai: valuesKH.sdt,
        tongTienKhiGiam: totalAmount - totalGiam,
      }))
      setValuesUpdateHD((prevValuesUpdateHD) => ({
        ...prevValuesUpdateHD,
        tenNguoiNhan: valuesKH.tenKhachHang,
        soDienThoai: valuesKH.sdt,
        tongTienKhiGiam:
          prevValuesUpdateHD.tongTienKhiGiam - tienGiam >= 0
            ? prevValuesUpdateHD.tongTienKhiGiam - tienGiam
            : 0,
      }))
      toast.success('Thêm mã giảm giá thành công')
    }
  }

  const handleUpdateHD = () => {
    updateTTHD(id, valuesUpdateHD)
  }

  const getKM = async (tien) => {
    const res = await getAllKM(tien)
    if (res) {
      setDataKM(res.data)
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
  }

  const update = async (idHDCT, values) => {
    const res = await updateSL(idHDCT, values)
    if (res) {
      getAllById(id)
      handleCloseSPofDH()
      getAll()
    }
  }

  const deleteHD = async (idHDCT) => {
    const res = await deleteHDCT(idHDCT)
    if (res) {
      getAllById(id)
    }
  }

  const handleSearchUsers = _.debounce(async () => {
    if (inputValue !== '') {
      // Kiểm tra nếu inputValue không rỗng
      const res = await searchCTSP(inputValue, '1', '', '', '')
      if (res && res.data) {
        setValues(res.data.content)
      }
    } else {
      setValues([]) // Nếu inputValue rỗng, đặt giá trị values là một mảng rỗng để không hiển thị dữ liệu
    }
  }, 100)

  const handleDelete = (id) => {
    deleteHD(id)
  }

  const handleAddKM = () => {
    setShow(false)
    setActiveIndex(null)
  }

  const handleDivClick = (index) => {
    setActiveIndex(index)
  }

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

  // fix san pham
  const handleClose3 = () => {
    setShow3(false)
  }

  const handleClose4 = () => {
    setShow4(false)
  }

  const handleClose1 = () => {
    setShow1(false)
  }

  // const [isCase1, setIsCase1] = useState(true);

  const [show2, setShow2] = useState(false)
  const handleClose2 = () => {
    setShow2(false)
  }
  //sp
  // const [inputDetail, setInputDetail] = useState(null);
  const [dataSP, setDataSP] = useState([])
  const [mauSacKC, setMauSacKC] = useState([])
  const [dataDetail, setDataDetail] = useState({})
  const [idSP, setidSP] = useState('')
  const [idCTSP, setidCTSP] = useState('')

  // kcms sp
  const handleAddSoLuong = (id, idSP) => {
    setShow2(true)
    setidSP(idSP)
    setidCTSP(id)
    setValuesAdd({ ...valuesAdd, chiTietSanPham: { id: id } })
    if (idCTSP) {
      detail2(idCTSP)
    }
  }

  const handleAdd = () => {
    // getAllById(id);
    if (parseInt(valuesAdd.soLuong) > parseInt(dataDetail.soLuong)) {
      toast.error('Đã vượt quá số lượng hiện có !')
      return
    }
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
    setShow1(false)
    // chuachac dong
    setShow2(false)
    //
    // setInputDetail(null);
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

  // searchSPinDH;
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

  // khach hang
  const [kh, setKH] = useState([])

  useEffect(() => {
    hienThiKH()
  }, [])

  const hienThiKH = async () => {
    const res = await getAllKH()
    if (res && res.data) {
      setKH(res.data)
    }
  }

  // searchKHofDH;
  const [termKH, setTermKH] = useState('')

  const searchKH = async (termKH) => {
    const res = await searchKHofDH(termKH)
    if (res) {
      setKH(res.data)
    }
  }

  const handleSearchKHofDH = _.debounce(async () => {
    if (termKH) {
      searchKH(termKH)
    } else {
      searchKH('')
    }
  }, [])

  useEffect(() => {
    handleSearchKHofDH()
  }, [termKH])

  const handleInputChangeKH = (e) => {
    setTermKH(e.target.value)
  }

  const [valuesKH, setValuesKH] = useState({
    tenKhachHang: '',
    sdt: '',
    email: '',
    ngaySinh: '',
    gioiTinh: '',
  })

  const handleAddKH = (event) => {
    event.preventDefault()
    postKH(id, valuesKH)
  }

  const postKH = async (id, value) => {
    const res = await addKH2(id, value)
    if (res) {
      toast.success('Thêm thành công !')
      setShow3(false)
      hienThiKH()
      detailHDById(id)
    }
  }

  const handleChooseKH = (idKH, tenKhachHang, soDienThoai) => {
    setValuesKH({
      ...valuesKH,
      tenKhachHang: tenKhachHang,
      sdt: soDienThoai,
    })
    setValuesUpdateHD({
      ...valuesUpdateHD,
      khachHang: {
        id: idKH,
      },
      tenNguoiNhan: tenKhachHang,
      soDienThoai: soDienThoai,
    })
    console.log(tenKhachHang, soDienThoai)
    handleUpdateHD()
    toast.success('Chọn thành công !')
    setShow4(false)
  }

  //showScanQR
  const [checkAdd, setCheckAdd] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleScan = (data) => {
    if (data) {
      setCheckAdd(true)
      setValuesAdd({ ...valuesAdd, chiTietSanPham: { id: data }, soLuong: 1 })
    }
  }

  useEffect(() => {
    if (valuesAdd.chiTietSanPham.id && valuesAdd.soLuong && checkAdd) {
      add(valuesAdd)
    }
  }, [valuesAdd])

  const handleError = (error) => {
    if (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="export-form">
            <Modal centered show={isModalOpen} onHide={closeModal}>
              <Modal.Body>
                {/* <QrReader
                  delay={1000}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                /> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              style={{ marginLeft: 150 }}
              show={show1}
              onHide={handleClose1}
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
                      <Table hover>
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
                        show={show2}
                        onHide={handleClose2}
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
          </div>

          {values.length > 0 && (
            <div className="search-result">
              <SearchResult
                result={values}
                id={id}
                getAllById={getAllById}
                handleSearchUsers={handleSearchUsers}
                setInputValue={setInputValue}
                setValuesSearch={setValues}
              />
            </div>
          )}
          <div className="table-container">
            <Table striped hover className="my-4">
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
                      {d.chiTietSanPham.soLuong < 10 ? (
                        <span style={{ color: 'red' }}>
                          Số sản phẩm còn lại: <strong>{d.chiTietSanPham.soLuong}</strong>
                        </span>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{convertToCurrency(d.donGia)}</td>
                    <td>{convertToCurrency(d.soLuong * d.donGia)}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="fa-solid fa-trash mx-3"
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Modal style={{ marginTop: 120, marginLeft: 150 }} show={show4} onHide={handleClose4}>
        <Modal.Header closeButton>
          <Modal.Title>Khách Hàng</Modal.Title>
        </Modal.Header>
        <div style={{ paddingLeft: 25 }} className="search">
          <input
            style={{ borderRadius: 15, width: 438, height: 35 }}
            type="text"
            className="input-search results-list"
            placeholder="Nhập mã, số điện thoại hoặc tên khách hàng cần tìm..."
            value={termKH}
            onChange={handleInputChangeKH}
          />
        </div>
        <Modal.Body style={{ width: 500, maxHeight: 390, overflow: 'auto' }}>
          {kh.map((k, index) => (
            <div
              key={k.id}
              // style={{
              //   border: '2px solid black',
              //   borderRadius: 5,
              //   cursor: 'pointer',
              //   height: 85,
              //   paddingTop: 8,
              //   marginTop: index > 0 ? 20 : 0, // Thêm khoảng cách 20px cho phần tử từ thứ 2 trở đi
              // }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id={k.id}
                  value={k.tenKhachHang}
                  onClick={() => handleChooseKH(k.id, k.tenKhachHang, k.sdt)}
                  checked={k.tenKhachHang === valuesUpdateHD.tenNguoiNhan}
                />
                <label className="form-check-label ms-1" htmlFor={k.id}>
                  {k.tenKhachHang} ({k.sdt})
                </label>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ marginLeft: 150, paddingBottom: 110 }}
        show={show3}
        onHide={handleClose3}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{ marginLeft: 290 }}>
            Thêm mới khách hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="needs-validation" noValidate onSubmit={handleAddKH}>
            <div className="row">
              <div className="col-6">
                <div className="form-group row">
                  <label
                    style={{ fontWeight: 'bold' }}
                    htmlFor="tenNguoiNhan"
                    className="col-sm-3 col-form-label"
                  >
                    Mã KH:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mã mặc định"
                      // value={valuesKH.maKhachHang}
                      onChange={(e) => {
                        setValuesKH({ ...valuesKH, maKhachHang: e.target.value })
                      }}
                    />
                  </div>
                </div>
                <br></br>
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
                      // name="tenKhachHang"
                      placeholder=""
                      // value={valuesKH.tenKhachHang}
                      onChange={(e) => {
                        setValuesKH({ ...valuesKH, tenKhachHang: e.target.value })
                      }}
                    />
                    {/* {!none && <div style={{ color: 'red' }}>Tên người nhận không được để trống !</div>}
                              {!none1 && <div style={{ color: 'red' }}>Tên người nhận không được quá 20 ký tự và phải là chữ !</div>} */}
                  </div>
                </div>
                <br></br>
                <div className="form-group row">
                  <label
                    style={{ fontWeight: 'bold' }}
                    htmlFor="soDienThoai"
                    className="col-sm-3 col-form-label"
                  >
                    Số ĐT:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="tel"
                      className="form-control"
                      // name="soDienThoai"
                      placeholder=""
                      // value={valuesKH.sdt}
                      onChange={(e) => {
                        setValuesKH({ ...valuesKH, sdt: e.target.value })
                      }}
                    />
                    {/* {!none2 && <div style={{ color: 'red' }}>Số điện thoại không được để trống !</div>}
                              {!none3 && (
                                <div style={{ color: 'red' }}>Số điện thoại phải là số, bắt đầu bằng số 0 và phải đúng 10 số !</div>
                              )} */}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group row">
                  <label
                    style={{ fontWeight: 'bold' }}
                    htmlFor="tenNguoiNhan"
                    className="col-sm-3 col-form-label"
                  >
                    Email:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      // name="email"
                      placeholder=""
                      // value={valuesKH.email}
                      onChange={(e) => {
                        setValuesKH({ ...valuesKH, email: e.target.value })
                      }}
                    />
                  </div>
                </div>
                <br></br>
                <div className="form-group row">
                  <label
                    style={{ fontWeight: 'bold' }}
                    htmlFor="tenNguoiNhan"
                    className="col-sm-3 col-form-label"
                  >
                    Giới Tính:
                  </label>
                  <div className="col-sm-9">
                    <div style={{ marginTop: 5 }} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gt"
                        value="true"
                        onChange={(e) => {
                          setValuesKH({ ...valuesKH, gioiTinh: e.target.value })
                        }}
                      />
                      <span style={{ marginLeft: 5 }} className="form-check-label">
                        Nam
                      </span>
                    </div>
                    <div style={{ marginLeft: 15 }} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gt"
                        value="false"
                        onChange={(e) => {
                          setValuesKH({ ...valuesKH, gioiTinh: e.target.value })
                        }}
                      />
                      <span style={{ marginLeft: 5 }} className="form-check-label">
                        Nữ
                      </span>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="form-group row">
                  <label
                    style={{ fontWeight: 'bold' }}
                    htmlFor="soDienThoai"
                    className="col-sm-3 col-form-label"
                  >
                    Ngày sinh:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      // name="ngaySinh"
                      placeholder=""
                      // value={valuesKH.ngaySinh}
                      onChange={(e) => {
                        setValuesKH({ ...valuesKH, ngaySinh: e.target.value })
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <br></br>
            <div className="text-center">
              <button
                // onClick={handleAddKH}
                // type="submit"
                className="btn btn-labeled shadow-button"
                style={{
                  background: 'deepskyblue',
                  borderRadius: '50px',
                  border: '1px solid black',
                  justifyItems: 'center',
                }}
              >
                <span
                  style={{
                    marginBottom: '3px',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: 'bold',
                  }}
                  className="btn-text"
                >
                  Thêm
                </span>
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <TableKM
        show={show}
        handleClose={() => setShow(false)}
        dataKM={dataKM}
        convertToCurrency={convertToCurrency}
        handleDivClick={handleDivClick}
        activeIndex={activeIndex}
        handleAddKM={handleAddKM}
        formatDate={formatDate}
      ></TableKM>
    </div>
  )
}

export default DonHang
