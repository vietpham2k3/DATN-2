/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../scss/DonHang.scss'
import { getAllPageDH, findVIP } from 'service/ServiceDonHang'
import { FormCheck, FormGroup } from 'react-bootstrap'
import { format } from 'date-fns'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import makeAnimated from 'react-select/animated'
import { addMonths, subMonths, isWithinInterval } from 'date-fns'
import _ from 'lodash'
import Form from 'react-bootstrap/Form'

const HoaDon = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'))

  const tenNV = {
    nhanVien: { ten: dataLogin && dataLogin.ten },
  }
  const [totalPages, setTotalPages] = useState(0)
  const [tuNgay, setTuNgay] = useState(null)
  const [denNgay, setDenNgay] = useState(null)
  const navigate = useNavigate()
  const [term, setTerm] = useState('')
  const [loaiDon, setLoaiDon] = useState('')
  const [radioLoai, setRadioLoai] = useState('')
  //select trangThai
  const [selectedOptions, setSelectedOptions] = useState([])
  //hien thi
  const [data, setData] = useState([])

  const animatedComponents = makeAnimated()

  const optionList = [
    { value: '0', label: 'Đang chờ xác nhận' },
    { value: '1', label: 'Chờ giao hàng' },
    { value: '2', label: 'Đã hủy đơn' },
    { value: '3,8,9,10', label: 'Đang giao hàng' },
    { value: '4', label: 'Giao hàng thành công' },
    { value: '5,11,12,13', label: 'Giao hàng thất bại' },
    { value: '6', label: 'Thanh toán thành công' },
    // { value: '7', label: 'Đã nhận hàng' },
    { value: '14', label: 'Yêu cầu hủy đơn' },
    { value: '15', label: 'Yêu cầu đổi hàng' },
    { value: '16', label: 'Đổi hàng thành công' },
    { value: '17', label: 'Đổi hàng thất bại' },
  ]

  function handleSelect(selectedOptions) {
    setSelectedOptions(selectedOptions)
  }

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

  //fillter DH
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
    const selectedValues = selectedOptions.map((option) => option.value)
    if (term || selectedValues !== 0) {
      const values =
        selectedValues.length > 0
          ? selectedValues
          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
      search(term, tuNgay, denNgay, values, loaiDon, page)
    } else {
      const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
      search('', null, null, values, '', page)
    }
    if (data.length === 0) {
      setCurrentPage(0)
    }
  }, [])

  useEffect(() => {
    handleSearchDH(currentPage)
  }, [term, tuNgay, denNgay, selectedOptions, loaiDon, currentPage])

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

  //ngayTao
  const currentDate = new Date()
  const threeMonthsAgo = subMonths(currentDate, 3)
  const threeMonthsLater = addMonths(currentDate, 0)

  const defaultCalendarValue = [threeMonthsAgo, threeMonthsLater]

  const handleDateChange = (selectedRange) => {
    if (selectedRange && selectedRange[0] && selectedRange[1]) {
      const startDate = selectedRange[0]
      const endDate = selectedRange[1]

      const formattedStartDate = format(startDate, 'dd/MM/yyyy HH:mm aa')
      const formattedEndDate = format(endDate, 'dd/MM/yyyy HH:mm aa')

      setTuNgay(formattedStartDate)
      setDenNgay(formattedEndDate)
    }
  }

  const disabledDate = (date) => {
    return !isWithinInterval(date, { start: threeMonthsAgo, end: threeMonthsLater })
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tìm kiếm: </strong>
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div className="box col-auto col-4">
                <div style={{ textAlign: 'start' }} className="field">
                  <strong>Tìm kiếm hóa đơn: </strong>
                </div>
                <input
                  style={{
                    width: '362px',
                    height: '30px',
                    borderRadius: '0',
                    border: '1px solid gray',
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Nhập để tìm hóa đơn..."
                  value={term}
                  onChange={handleInputChange}
                />
              </div>

              <div className="box col-auto col-4">
                <div style={{ textAlign: 'start' }} className="field">
                  <strong>Từ Ngày : </strong>
                </div>
                <input
                  style={{
                    width: '362px',
                    height: '30px',
                    borderRadius: '0',
                    border: '1px solid black',
                  }}
                  type="datetime-local"
                  className="input-search"
                  value={term}
                  onChange={handleInputChange}
                />
              </div>

              <div className="box col-auto col-4">
                <div style={{ textAlign: 'start' }} className="field">
                  <strong>Đến Ngày : </strong>
                </div>
                <input
                  style={{
                    width: '362px',
                    height: '30px',
                    borderRadius: '0',
                    border: '1px solid black',
                  }}
                  type="datetime-local"
                  className="input-search"
                  value={term}
                  onChange={handleInputChange}
                />
              </div>

              {/* <div className="box col-auto col-6">
                <div className="values">
                  <strong></strong>
                </div>
                <div className="dropdown-container">
                  <Select
                    options={optionList}
                    components={animatedComponents}
                    placeholder="Chọn trạng thái đơn cần tìm ...."
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div> */}
            </div>
            <br></br>

            <div style={{ marginTop: 10, marginLeft: 80 }} className="row">
              <div className="box col-auto col-6">
                <label
                  htmlFor="colorSearch"
                  style={{ marginRight: '10px', fontWeight: 'bold', paddingTop: 5 }}
                >
                  <strong>Trạng thái:</strong>
                </label>
                <Form.Select aria-label="Default select example">
                  <option>Chọn trạng thái cần tìm: </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>

              <div className="search col-6">
                <label htmlFor="colorSearch" style={{ marginRight: '10px', fontWeight: 'bold' }}>
                  {' '}
                  <strong>Loại đơn:</strong>
                </label>
                <FormGroup style={{ paddingLeft: 15 }}>
                  <FormCheck inline>
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
                      checked={radioLoai === '0'}
                      value="0"
                      onChange={handleRadioChange1}
                    />
                    <FormCheck.Label>Bán trực tiếp</FormCheck.Label>
                  </FormCheck>

                  <FormCheck inline style={{ marginLeft: 35 }}>
                    <FormCheck.Input
                      type="radio"
                      name="radioLoai"
                      checked={radioLoai === '1'}
                      value="1"
                      onChange={handleRadioChange1}
                    />
                    <FormCheck.Label>Mua hàng online</FormCheck.Label>
                  </FormCheck>
                </FormGroup>
              </div>
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
                      <td
                        style={{ fontSize: '12px', justifyContent: 'center', display: 'flex' }}
                        className="align-middle"
                      >
                        {d.trang_thai === 0 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Đang chờ xác nhận
                          </span>
                        )}
                        {d.trang_thai === 1 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                            className="btn btn-labeled shadow-button btn btn-secondary status-pending"
                          >
                            Chờ giao hàng
                          </span>
                        )}
                        {d.trang_thai === 2 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#990000',
                              color: 'white',
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Đã hủy đơn
                          </span>
                        )}

                        {d.trang_thai === 3 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Đang giao hàng
                          </span>
                        )}
                        {d.trang_thai === 4 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: 'greenyellow',
                              color: 'black',
                            }}
                            className="btn btn-labeled shadow-button btn status-completed"
                          >
                            Giao hàng thành công
                          </span>
                        )}
                        {d.trang_thai === 5 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: 'red',
                              color: 'white',
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Giao hàng thất bại
                          </span>
                        )}
                        {d.trang_thai === 6 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                            className="btn btn-labeled shadow-button btn btn-info status-completed"
                          >
                            Thanh toán thành công
                          </span>
                        )}
                        {d.trang_thai === 7 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: 'darkblue',
                              color: 'white',
                            }}
                            className="btn btn-labeled shadow-button btn status-completed"
                          >
                            Đã nhận hàng
                          </span>
                        )}
                        {d.trang_thai === 8 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Đang giao hàng
                          </span>
                        )}
                        {d.trang_thai === 9 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Đang giao hàng
                          </span>
                        )}
                        {d.trang_thai === 10 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Đang giao hàng
                          </span>
                        )}
                        {d.trang_thai === 11 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: 'red',
                              color: 'white',
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Giao hàng thất bại
                          </span>
                        )}
                        {d.trang_thai === 12 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: 'red',
                              color: 'white',
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Giao hàng thất bại
                          </span>
                        )}
                        {d.trang_thai === 13 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: 'red',
                              color: 'white',
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Giao hàng thất bại
                          </span>
                        )}
                        {d.trang_thai === 14 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#FFFF00',
                              color: 'black',
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Yêu cầu hủy đơn
                          </span>
                        )}
                        {d.trang_thai === 15 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#FFFF00',
                              color: 'black',
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Yêu cầu đổi hàng
                          </span>
                        )}
                        {d.trang_thai === 16 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#0000FF',
                              color: 'white',
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Đổi hàng thành công
                          </span>
                        )}
                        {d.trang_thai === 17 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#990000',
                              color: 'white',
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Đã hủy đơn
                          </span>
                        )}
                      </td>

                      <td>
                        <button
                          onClick={() => navigate(`/don-hang/chi-tiet/${d.id}`)}
                          className="btn fa-solid fa-circle-info fa-xl fa-shake"
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
