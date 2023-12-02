/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../scss/DonHang.scss'
import { getAllPageDH, findVIP } from 'service/ServiceDonHang'
import { Col, FormCheck, FormGroup } from 'react-bootstrap'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import _ from 'lodash'
import Form from 'react-bootstrap/Form'
const HoaDon = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [tuNgay, setTuNgay] = useState(null)
  const [denNgay, setDenNgay] = useState(null)
  const navigate = useNavigate()
  const [term, setTerm] = useState('')
  const [loaiDon, setLoaiDon] = useState('')
  const [radioLoai, setRadioLoai] = useState('')
  const [validationError, setValidationError] = useState('')
  const [trangThai, setTrangThai] = useState([])
  //hien thi
  const [data, setData] = useState([])

  const optionList = [
    { value: '0', label: 'Chờ xác nhận' },
    { value: '1', label: 'Chờ vận chuyển' },
    { value: '2', label: 'Đã hủy' },
    { value: '3', label: 'Đang giao' },
    { value: '4', label: 'Đã hoàn thành ' },
  ]

  useEffect(() => {
    getAll(0)
  }, [])

  const getAll = async (page) => {
    setCurrentPage(page)
    const res = await getAllPageDH(page)
    if (res && res.data) {
      setData(res.data.content)
      setTotalPages(res.data.totalPages)
    }
  }

  //fillter
  const search = async (key, tuNgay, denNgay, trangThai, loaiDon, page = 0) => {
    const res = await findVIP(key, tuNgay, denNgay, trangThai, loaiDon, page)
    if (res) {
      setData(res.data.content)
      setTotalPages(res.data.totalPages)

      if (res.data.content.length === 0 && currentPage !== 0) {
        setCurrentPage(0)
      } else {
        setCurrentPage(page)
      }
    }
  }

  const handleSearchDH = _.debounce(async (page = 0) => {
    if (term !== 0) {
      search(term, tuNgay, denNgay, trangThai, loaiDon, page)
    } else {
      search('', null, null, '', '', page)
    }
    if (data.length === 0) {
      setCurrentPage(0)
    }
  }, [])

  useEffect(() => {
    handleSearchDH(currentPage)
  }, [term, tuNgay, denNgay, trangThai, loaiDon, currentPage])

  const handleInputChange = (e) => {
    setTerm(e.target.value)
  }

  const handleRadioChange1 = (e) => {
    setLoaiDon(e.target.value)
    setRadioLoai(e.target.value)
  }

  const handleAllClickLoai = () => {
    setLoaiDon('')
    setRadioLoai('')
  }

  //Phan trang
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage)
  }

  const handlePageClick = (event) => {
    handlePageChange(event.selected)
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

    const formattedDate = `${day}/${month}/${year} ${formattedHours}:${formattedMinutes} `

    return formattedDate
  }

  const formatDate2 = (value) => {
    return value.replace(/T/, ' ').replace(/(\:\d{2})\.\d{3}Z/, '$1')
  }

  const handleChange = (e) => {
    const formattedDate = formatDate2(e.target.value)
    setDenNgay(formattedDate)

    if (formattedDate && tuNgay && new Date(formattedDate) < new Date(tuNgay)) {
      setValidationError('Ngày bắt đầu không được lớn hơn ngày kết thúc')
    } else {
      setValidationError('')
    }
  }

  const handleChange2 = (e) => {
    const formattedDate = formatDate2(e.target.value)
    setTuNgay(formattedDate)

    if (formattedDate && denNgay && new Date(formattedDate) > new Date(denNgay)) {
      setValidationError('Ngày kết thúc không được nhỏ hơn ngày bắt đầu')
    } else {
      setValidationError('')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div className="box col-auto col-3">
                <div style={{ textAlign: 'start' }} className="field">
                  <strong>Tìm kiếm hóa đơn: </strong>
                </div>
                <input
                  style={{
                    height: '30px',
                    borderRadius: 20,
                    border: '1px solid gray',
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Nhập để tìm hóa đơn..."
                  value={term}
                  onChange={handleInputChange}
                />
              </div>

              <div className="box col-auto col-3">
                <div style={{ textAlign: 'start' }} className="field">
                  <strong>Từ Ngày : </strong>
                </div>
                <input
                  style={{
                    height: '30px',
                    borderRadius: 20,
                    border: '1px solid black',
                  }}
                  type="datetime-local"
                  className="input-search"
                  value={tuNgay}
                  onChange={handleChange2}
                />
              </div>

              <div className="box col-auto col-3">
                <div style={{ textAlign: 'start' }} className="field">
                  <strong>Đến Ngày : </strong>
                </div>
                <input
                  style={{
                    height: '30px',
                    borderRadius: 20,
                    border: '1px solid black',
                  }}
                  type="datetime-local"
                  className="input-search"
                  value={denNgay}
                  onChange={handleChange}
                />
                {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
              </div>
            </div>
            <br></br>

            <div
              style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}
              className="row"
            >
              <Col className="col-3">
                <Form.Group controlId="mauSacSelect">
                  <Form.Label style={{ fontWeight: 'bold' }}>Trạng thái: </Form.Label>
                  <Form.Select
                    className="custom-select"
                    onChange={(e) => setTrangThai(e.target.value)}
                    value={trangThai}
                  >
                    <option value="">Tất cả trạng thái</option>
                    {optionList.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col className="col-6">
                <Form.Group controlId="mauSacSelect">
                  <Form.Label style={{ fontWeight: 'bold', marginLeft: 80 }}>Loại đơn: </Form.Label>
                  <FormGroup>
                    <FormCheck style={{ marginTop: 10, marginLeft: 80 }} inline>
                      <FormCheck.Input
                        type="radio"
                        name="radioLoai"
                        checked={radioLoai === ''}
                        value=""
                        onClick={handleAllClickLoai}
                        onChange={handleRadioChange1}
                      />
                      <FormCheck.Label>Tất Cả</FormCheck.Label>
                    </FormCheck>

                    <FormCheck style={{ marginLeft: 35 }} inline>
                      <FormCheck.Input
                        type="radio"
                        name="radioLoai"
                        // checked={radioLoai === '0'}
                        value="0"
                        onChange={handleRadioChange1}
                      />
                      <FormCheck.Label>Bán trực tiếp</FormCheck.Label>
                    </FormCheck>

                    <FormCheck inline style={{ marginLeft: 35 }}>
                      <FormCheck.Input
                        type="radio"
                        name="radioLoai"
                        // checked={radioLoai === '1'}
                        value="1"
                        onChange={handleRadioChange1}
                      />
                      <FormCheck.Label>Mua hàng online</FormCheck.Label>
                    </FormCheck>
                  </FormGroup>
                </Form.Group>
              </Col>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách hóa đơn</strong>
          </CCardHeader>
          <CCardBody>
            <div>
              <table
                id="table-to-xls"
                style={{ textAlign: 'center', alignItems: 'center' }}
                className="table"
              >
                <tr>
                  <th>STT</th>
                  <th>Mã Hóa Đơn</th>
                  <th>Loại Đơn</th>
                  <th>Tên Khách Hàng</th>
                  <th>Ngày Tạo Đơn</th>
                  {/* <th>Số Luợng</th> */}
                  <th>Tổng tiền</th>
                  <th>Tình trạng</th>
                  <th>Action</th>
                </tr>
                <br></br>

                <tbody className="table-group-divider">
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{d.ma}</td>
                      <td>
                        {d.loai_don === 0 && (
                          <span style={{ color: 'darkblue', fontWeight: 'bold' }}>
                            Bán trực tiếp
                          </span>
                        )}
                        {d.loai_don === 1 && (
                          <span style={{ color: 'green', fontWeight: 'bold' }}>
                            Mua Hàng Online
                          </span>
                        )}
                      </td>
                      <td>{d.ten_nguoi_nhan}</td>
                      <td>{formatDate(d.ngay_tao)}</td>
                      {/* <td>{d.tong_so_luong}</td> */}
                      <td style={{ fontWeight: 'bold', color: 'red' }}>
                        {convertToCurrency(d.tong_tien)}
                      </td>
                      <td>
                        {d.trang_thai === 0 && (
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
                        {d.trang_thai === 1 && (
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
                        {d.trang_thai === 2 && (
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

                        {d.trang_thai === 3 && (
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
                        {d.trang_thai === 4 && (
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

                      <td>
                        <button
                          onClick={() => navigate(`/hoa-don/chi-tiet/${d.id}`)}
                          className="fa-solid fa-circle-info fa-xl fa-shake"
                        ></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default HoaDon
