/* eslint-disable no-unused-vars */
import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import '../../../src/scss/MauSac.scss'
import { getAllPageKH, deleteKH, searchKh } from 'service/KhachHangService'
import '../../../src/scss/pageable.scss'
const KhachHang = () => {
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState(' ')
  const [filterGender, setFilterGender] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    getAll(0)
  }, [])

  const getAll = async (page) => {
    const res = await getAllPageKH(page)
    if (res && res.data) {
      setData(res.data.content)
      setTotalPages(res.data.totalPages)
    }
  }

  const del = async (id) => {
    const res = await deleteKH(id)
    if (res) {
      toast.success('Xóa thành công!')
      getAll(0)
    }
  }

  const handleFilterGenderChange = (selectedGender) => {
    setFilterGender(selectedGender)
    search(searchTerm, filterStatus, selectedGender, 0)
  }

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status)
    search(searchTerm, status, filterGender, 0)
  }

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    search(term, filterStatus, filterGender, 0)
  }

  const search = async (term, trangThai, gioiTinh, page) => {
    const res = await searchKh(term, trangThai, gioiTinh, page)
    if (res && res.data) {
      setData(res.data.content)
      setTotalPages(res.data.totalPages)
    }
  }

  const handleDeleteKH = (id) => {
    del(id)
  }

  const handlePageClick = (event) => {
    getAll(event.selected)
  }

  function formatDate(dateString) {
    const dateObject = new Date(dateString)

    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1 // Tháng bắt đầu từ 0, cần cộng thêm 1
    const year = dateObject.getFullYear()

    const formattedDate = `${day}/${month}/${year}`

    return formattedDate
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tìm kiếm</strong>
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div className="search">
                  <label htmlFor="colorSearch" style={{ marginRight: '10px', fontWeight: 'bold' }}>
                    Nhập khách hàng cần tìm:
                  </label> 
                  <input
                    id="colorSearch"
                    style={{ borderRadius: 15, width: 380 }}
                    type="text"
                    className="input-search results-list"
                    placeholder="Search..."
                    onChange={handleSearch}
                  />
                </div>

              <div style={{ marginRight: 20 }}>
              <span style={{ fontWeight: 'bold', marginRight: 25 }} className="form-check-label">
                  Trạng Thái:
                </span>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="all"
                    checked={filterStatus === ''}
                    onChange={() => handleFilterStatusChange('')}
                  />
                  <label htmlFor="all" style={{ marginLeft: 10 }} className="form-check-label">
                    Tất Cả
                  </label>
                </div>
                <div style={{ marginLeft: 10 }} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="active"
                    checked={filterStatus === 1}
                    onChange={() => handleFilterStatusChange(1)}
                  />
                  <label htmlFor="active" className="form-check-label">
                    Hoạt động
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inactive"
                    checked={filterStatus === 0}
                    onChange={() => handleFilterStatusChange(0)}
                  />
                  <label htmlFor="inactive" className="form-check-label">
                    Không hoạt động
                  </label>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-end">
              <button onClick={() => navigate('/khach-hang/add')} className="btn btn-primary ">
                Thêm
              </button>
            </div>
          </CCardHeader>
          <CCardBody>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>SĐT</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Trạng thái</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {data.map((d, i) => (
                    <tr key={d.id}>
                      <td>{i + 1}</td>
                      <td>{d.maKhachHang}</td>
                      <td>{d.tenKhachHang}</td>
                      <td>{d.email}</td>
                      <td>{d.sdt}</td>
                      <td>{formatDate(d.ngaySinh)}</td>
                      <td>{d.gioiTinh === true ? 'Nam' : 'Nữ'}</td>
                      <td>{d.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động'}</td>
                      <td>
                        <button
                          className="fa-khenh"
                          onClick={() => navigate(`/khach-hang/detail/${d.id}`)}
                        >
                          <i
                            style={{ color: 'green' }}
                            className="fa-solid fa-pen-nib fa-khenh"
                          ></i>{' '}
                        </button>
                        <button className="fa-khenh mx-3" onClick={() => handleDeleteKH(d.id)}>
                          <i
                            style={{ color: 'orange' }}
                            className="fa-solid fa-trash-can fa-khenh"
                          ></i>{' '}
                        </button>
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

export default KhachHang
