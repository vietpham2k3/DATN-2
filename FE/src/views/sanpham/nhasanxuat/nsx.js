import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import '../../../scss/MauSac.scss'
import { getAllPageNSX, searchNSX, deleteNSX } from 'service/NhaSanXuatService';

import _ from 'lodash'
import '../../../scss/pageable.scss'
const NSX = () => {
    const [filterStatus, setFilterStatus] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
  
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [dataDelete, setDataDelete] = useState({
      ma: ''
    });
  
    useEffect(() => {
      getAll(0);
      setDataDelete();
    }, []);
  
    const navigate = useNavigate();
  
    const getAll = async (page) => {
      setCurrentPage(page);
      const res = await getAllPageNSX(page);
      if (res && res.data) {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    };
  
    const search = async (key, trangThai, page) => {
      setCurrentPage(page);
      const res = await searchNSX(key, trangThai, page);
      if (res) {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    };
  
    const handleSearchNSX = _.debounce(async (e) => {
      let term = e.target.value;
      if (term || filterStatus !== 0) {
        search(term, filterStatus, currentPage);
      } else {
        search('', 0, currentPage);
      }
    }, 100);
  
    const handlePageClick = (event) => {
      const selectedPage = event.selected;
      if (filterStatus === '') {
        getAll(selectedPage);
      } else {
        search('', filterStatus, selectedPage);
      }
    };
  
    const del = async (id, values) => {
      const res = await deleteNSX(id, values);
      if (res) {
        toast.success('Xóa thành công !');
        getAll(0);
      }
    };
  
    const handleSubmit = (id) => {
      del(id, dataDelete);
    };
  
    function formatDate(dateString) {
      if (dateString === null) {
        return ''; // Trả về chuỗi rỗng nếu giá trị là null
      }
  
      const dateObject = new Date(dateString);
  
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
  
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      // const seconds = dateObject.getSeconds();
  
      const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  
      return formattedDate;
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
                  Nhập mã, tên nsx cần tìm:{' '}
                </label>
                <input
                  id="colorSearch"
                  style={{ borderRadius: 15, width: 300 }}
                  type="text"
                  className="input-search results-list"
                  placeholder="Search..."
                  onChange={handleSearchNSX}
                />
              </div>

              <div style={{ marginRight: 50 }}>
                <span style={{ fontWeight: 'bold', marginRight: 25 }} className="form-check-label">
                  Trạng Thái:
                </span>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    checked={filterStatus === ''}
                    onChange={() => {
                      setFilterStatus('')
                      search('', '', 0)
                    }}
                  />
                  <span style={{ marginLeft: 10 }} className="form-check-label">
                    Tất Cả
                  </span>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    checked={filterStatus === 0}
                    onChange={() => {
                      setFilterStatus(0)
                      search('', 0, 0)
                    }}
                  />
                  <span className="form-check-label">Đang kích hoạt</span>
                </div>
                <div style={{ marginLeft: 10 }} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    checked={filterStatus === 1}
                    onChange={() => {
                      setFilterStatus(1)
                      search('', 1, 0)
                    }}
                  />
                  <span className="form-check-label">Ngừng kích hoạt</span>
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
              <button
                onClick={() => navigate('/quan-ly-san-pham/nsx/add')}
                className="btn btn-primary "
              >
                Thêm
              </button>
            </div>
          </CCardHeader>
          <CCardBody>
            <div>
            <table style={{ textAlign: 'center'}} className="table">
              <tr>
                <th>#</th>
                <th>Mã</th>
                <th>Tên</th>
                <th>Ngày Tạo</th>
                <th>Trạng Thái</th>
                <th>Action</th>
              </tr>
              <tbody className="table-group-divider">
                {data.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.ma}</td>
                    <td>{d.ten}</td>
                    <td>{formatDate(d.ngayTao)}</td>
                    <td>{d.trangThai === 0 ? 'Đang kích hoạt' : 'Ngừng kích hoạt'}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/quan-ly-san-pham/nsx/detail/${d.id}`)}
                        style={{ color: 'green' }}
                          className="fa-solid fa-pen-nib fa-khenh"
                      ></button>

                      <button
                        onClick={() => handleSubmit(d.id, { ma: d.ma })}
                        style={{ color: 'orange' }}
                          className="fa-solid fa-trash-can mx-3 fa-khenh"
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

export default NSX
