/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table'
import '../../../scss/SanPham.scss'
import '../../../scss/pageable.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllCTSP, deleteCTSP, searchCTSP } from '../../../service/SanPhamService'
import { toast } from 'react-toastify'
import _ from 'lodash'
import Slider from 'react-slider'
import { Form, Row, Col } from 'react-bootstrap'
import {
  getAllListCL,
  getAllListLSP,
  getAllListMS,
  getAllListNSX,
} from '../../../service/SanPhamService'

const MIN = 0
const MAX = 1000000000

const SanPham = () => {
  const [values, setValues] = useState([MIN, 0])

  const [maxPrice, setMaxPrice] = useState(MAX)
  const [data, setData] = useState([])
  // const [imageErrors, setImageErrors] = useState([]);
  const [totalPages, setTotalPages] = useState()
  const [term, setTerm] = useState('')
  const [status, setStatus] = useState('')
  const [radio, setRadio] = useState('')
  // const [isLoading, setIsLoading] = useState(true);
  const [mauSac, setMauSac] = useState('')
  const [chatLieu, setChatLieu] = useState('')
  const [loaiSanPham, setLoaiSanPham] = useState('')
  const [nhaSanXuat, setNhaSanXuat] = useState('')
  const [listCL, setListCL] = useState([])
  const [listNSX, setListNSX] = useState([])
  const [listLSP, setListLSP] = useState([])
  const [listMS, setListMS] = useState([])

  const [chatLieuDefaultSelected, setChatLieuDefaultSelected] = useState(false) // Biến để theo dõi giá trị mặc định chất liệu
  const [loaiSanPhamDefaultSelected, setLoaiSanPhamDefaultSelected] = useState(false)
  const [nhaSanXuatDefaultSelected, setNhaSanXuatDefaultSelected] = useState(false)
  const [mauSacDefaultSelected, setMauSacDefaultSelected] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getAll(0)
    getListLSP()
    getListMS()
    getListNSX()
    getListCL()
  }, [])

  useEffect(() => {
    if (maxPrice === MAX && data.length > 0) {
      const max = findMaxPrice(data)
      setMaxPrice(max)
      setValues([MIN, max])
    }
  }, [data, maxPrice])

  const findMaxPrice = (products) => {
    let maxPrice = 0
    products.forEach((product) => {
      if (product.giaBan > maxPrice) {
        maxPrice = product.giaBan
      }
    })
    return maxPrice
  }

  const getListCL = async () => {
    try {
      const response = await getAllListCL()
      if (response && response.data) {
        setListCL(response.data)
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }

  const getListLSP = async () => {
    try {
      const response = await getAllListLSP()
      if (response && response.data) {
        setListLSP(response.data)
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }

  const getListMS = async () => {
    try {
      const response = await getAllListMS() // Gọi API hoặc thực hiện tác vụ lấy danh sách màu sắc
      if (response && response.data) {
        setListMS(response.data)
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }
  const getListNSX = async () => {
    try {
      const response = await getAllListNSX() // Gọi API hoặc thực hiện tác vụ lấy danh sách NSX
      if (response && response.data) {
        setListNSX(response.data)
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }
  const getAll = async (page) => {
    try {
      const res = await getAllCTSP(
        term,
        status,
        values,
        mauSac,
        chatLieu,
        loaiSanPham,
        nhaSanXuat,
        page,
      )
      if (res) {
        setData(res.data.content)
      }
    } catch (error) {
      // Xử lý lỗi nếu có
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

  const deletesp = async (idSP) => {
    const res = await deleteCTSP(idSP)
    if (res) {
      toast.success('Xoá thành công')
    }
  }

  const handleDelete = async (id) => {
    await deletesp(id)
    getAll(0)
  }

  const handleSearchUsers = _.debounce(async (page) => {
    try {
      const res = await searchCTSP(
        term,
        status,
        values[0],
        values[1],
        mauSac,
        chatLieu,
        loaiSanPham,
        nhaSanXuat,
        page,
      )
      if (res && res.data) {
        setData(res.data.content)
        setTotalPages(res.data.totalPages)
      } else {
        getAll(0)
      }
    } catch (error) {
      // Xử lý lỗi nếu có
    }
  }, 100)

  useEffect(() => {
    handleSearchUsers(0)
  }, [term, status, values, mauSac, chatLieu, loaiSanPham, nhaSanXuat])

  const handlePageClick = (event) => {
    getAll(event.selected)
    handleSearchUsers(event.selected)
  }

  const handleInputChange = (e) => {
    setTerm(e.target.value)
  }

  const handleRadioChange = (e) => {
    setStatus(e.target.value)
    setRadio(e.target.value)
  }

  const handleAllClick = () => {
    setStatus('')
    setRadio('')
  }

  const handleUpdate = (idSp, id) => {
    navigate(`/quan-ly-san-pham/san-pham/detail/${id}/${idSp}`)
    localStorage.setItem('idSP', idSp)
  }
  const uniqueColors = listMS.filter(
    (color, index, self) => index === self.findIndex((c) => c.ten === color.ten),
  )

  const handleSubstring = (selectedValue) => {
    return selectedValue.replace('#', '')
  }

  const handleMauSacChange = (e) => {
    const selectedValue = e.target.value

    const mauSacWithoutHash = handleSubstring(selectedValue)
    setMauSac(mauSacWithoutHash)

    if (selectedValue === '' || selectedValue === 'default') {
      setMauSacDefaultSelected(true)
      getAll(0)
    } else {
      setMauSacDefaultSelected(false)
    }
  }

  const handleChatLieuChange = (e) => {
    const selectedValue = e.target.value
    setChatLieu(selectedValue)
    if (selectedValue === '') {
      getAll(0)
      setChatLieuDefaultSelected(true)
    } else {
      setChatLieuDefaultSelected(false)
    }
  }
  const handleLoaiSanPhamChange = (e) => {
    const selectedValue = e.target.value
    setLoaiSanPham(selectedValue)
    if (selectedValue === '') {
      getAll(0)
      setLoaiSanPhamDefaultSelected(true)
    } else {
      setLoaiSanPhamDefaultSelected(false)
    }
  }

  const handleNhaSanXuatChange = (e) => {
    const selectedValue = e.target.value
    setNhaSanXuat(selectedValue)
    if (selectedValue === '') {
      getAll(0)
      setNhaSanXuatDefaultSelected(true)
    } else {
      setNhaSanXuatDefaultSelected(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Link className="btn btn-primary" to={'/quan-ly-san-pham/san-pham/add'}>
              Thêm sản phẩm <i className="fa-solid fa-square-plus"></i>
              </Link>
            </div>
          </CCardHeader>
          <CCardBody>
            <div className="row">
              <div className="col-12 search d-flex align-items-center row">
                <input
                  type="text"
                  className="input-search-sp box col-auto"
                  placeholder="Search..."
                  value={term}
                  onChange={handleInputChange}
                  style={{ width: '300px', height: '35px', marginLeft: 10 }}
                />
                <div style={{ marginRight: 80 }} className="box d-flex flex-row col-auto">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={radio === ''}
                      value=""
                      onClick={handleAllClick}
                      onChange={handleRadioChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                      style={{ width: '60px' }}
                    >
                      Tất cả
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={radio === '0'}
                      value="0"
                      onChange={handleRadioChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                      style={{ width: '100px' }}
                    >
                      Ngừng bán
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      checked={radio === '1'}
                      value="1"
                      onChange={handleRadioChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios3"
                      style={{ width: '80px' }}
                    >
                      Đang bán
                    </label>
                  </div>
                </div>
                <div className="box col-auto" style={{ marginLeft: '50px', width: '330px' }}>
                  <div className="values">
                    <strong>Khoảng giá:</strong>{' '}
                  </div>
                  <Slider
                    className="slider"
                    value={values}
                    min={MIN}
                    max={maxPrice}
                    onChange={(newValues) => {
                      setValues(newValues)
                    }}
                  ></Slider>
                  <div className="values">
                    <br></br>
                    {convertToCurrency(values[0]) + ' - ' + convertToCurrency(values[1])}
                  </div>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
          <Form>
              <Row>
                <Col>
                  <Form.Group controlId="mauSacSelect">
                    <Form.Label style={{ fontWeight: 'bold' }}>Màu Sắc: </Form.Label>
                    <Form.Select
                      className="custom-select"
                      onChange={handleMauSacChange}
                      value={mauSac}
                    >
                      <option value="" disabled={mauSacDefaultSelected}>
                        Tất cả màu sắc
                      </option>
                      {uniqueColors.map((c) => (
                        <option key={c.ma} value={c.ma}>
                          &nbsp;{c.ma}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="chatLieuSelect">
                    <Form.Label style={{ fontWeight: 'bold' }}>Chất Liệu: </Form.Label>
                    <Form.Select
                      className="custom-select"
                      onChange={handleChatLieuChange}
                      value={chatLieu}
                    >
                      <option value="" disabled={chatLieuDefaultSelected}>
                        Tất cả chất liệu
                      </option>
                      {listCL.map((c) => (
                        <option key={c.ten} value={c.ten}>
                          {c.ten}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="loaiSanPhamSelect">
                    <Form.Label style={{ fontWeight: 'bold' }}>Loại Sản Phẩm: </Form.Label>
                    <Form.Select
                      className="custom-select"
                      onChange={handleLoaiSanPhamChange}
                      value={loaiSanPham}
                    >
                      <option value="" disabled={loaiSanPhamDefaultSelected}>
                        Tất cả loại
                      </option>
                      {listLSP.map((c) => (
                        <option key={c.ten} value={c.ten}>
                          {c.ten}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="nhaSanXuatSelect">
                    <Form.Label style={{ fontWeight: 'bold' }}>Nhà Sản Xuất: </Form.Label>
                    <Form.Select
                      className="custom-select"
                      onChange={handleNhaSanXuatChange}
                      value={nhaSanXuat}
                    >
                      <option value="" disabled={nhaSanXuatDefaultSelected}>
                        Tất cả nhà sản xuất
                      </option>
                      {listNSX.map((c) => (
                        <option key={c.ten} value={c.ten}>
                          {c.ten}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </CCardHeader>
          <CCardBody>
            <div className="row">
              <div className="col-12">
                <Table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>#</th>
                      <th>Mã</th>
                      <th>Ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá bán</th>
                      <th>Trạng thái</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {data.map((d, i) => (
                      <tr key={i} className="text-center">
                        <td>{i + 1}</td> 
                        <td>{d.sanPham.ma}</td>
                        <td>
                          <img
                            src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
                            className="product-image"
                            style={{ width: '70px', height: '100px' }}
                          />
                        </td>
                        <td>{d.sanPham.ten}</td>
                        <td>{d.soLuong || 0}</td>
                        <td>{convertToCurrency(d.giaBan)}</td>
                        <td>{d.sanPham.trangThai === 1 ? 'Đang bán' : 'Ngừng bán'}</td>
                        <td>
                          <button
                            onClick={() => handleUpdate(d.sanPham.id, d.id)}
                            style={{ color: 'green' }}
                            className="fa-solid fa-pen-nib"
                          ></button>
                          <button
                            onClick={() => handleDelete(d.sanPham.id)}
                            style={{ color: 'orange' }}
                            className="fa-solid fa-trash-can mx-3"
                          ></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">>>"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={totalPages}
                  previousLabel="<<<"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination justify-content-center custom-pagination"
                  activeClassName="active"
                />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SanPham
