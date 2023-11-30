import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import '../../../src/scss/MauSac.scss'
import { getAllPageKM, searchKM, deleteKM } from 'service/ServiceKhuyenMai';
import '../../../src/scss/pageable.scss'
import _ from 'lodash';

const KhuyenMai = () => {
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [dataDelete] = useState({
      ma: ''
    });
  
    //loc ngay
    const navigate = useNavigate();
  
    useEffect(() => {
      getAll(0);
    }, []);
  
    const getAll = async (page) => {
      setCurrentPage(page);
      const res = await getAllPageKM(page);
      if (res) {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    };
  
    function convertToCurrency(number) {
      // Chuyển đổi số thành định dạng tiền Việt Nam
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
      return formatter.format(number);
    }
    //Xoas
    const del = async (id, values) => {
      const res = await deleteKM(id, values);
      if (res) {
        toast.success('Xóa thành công !');
        getAll(0);
      }
    };
  
    //Search
    const search = async (key, trangThai, page) => {
      setCurrentPage(page);
      const res = await searchKM(key, trangThai, page);
      if (res) {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    };
  
    const handleSearchKM = _.debounce(async (e) => {
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
  
    const handleSubmit = (id) => {
      del(id, dataDelete);
    };
  
    function formatDate(dateString) {
      if (dateString === null) {
        return '';
      }
  
      const dateObject = new Date(dateString);
  
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
  
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
  
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
                  Nhập mã, tên khuyến mãi cần tìm:{' '}
                </label>
                <input
                  id="colorSearch"
                  style={{ borderRadius: 15, width: 300 }}
                  type="text"
                  className="input-search results-list"
                  placeholder="Search..."
                  onChange={handleSearchKM}
                />
              </div>
            <div className="search">
            <label htmlFor="colorSearch" style={{ marginRight: '10px', fontWeight: 'bold' }}>
                  Trạng thái:{' '}
            </label>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  checked={filterStatus === ''}
                  onChange={() => {
                    setFilterStatus('');
                    search('', '', 0);
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
                    setFilterStatus(0);
                    search('', 0, 0);
                  }}
                />
                <span className="form-check-label">Sắp diễn ra</span>
              </div>
              <div style={{ marginLeft: 10 }} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  checked={filterStatus === 1}
                  onChange={() => {
                    setFilterStatus(1);
                    search('', 1, 0);
                  }}
                />
                <span className="form-check-label">Đã kết thúc</span>
              </div>
              <div style={{ marginLeft: 10 }} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  checked={filterStatus === 2}
                  onChange={() => {
                    setFilterStatus(2);
                    search('', 2, 0);
                  }}
                />
                <span className="form-check-label">Đang diễn ra</span>
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
              <button onClick={() => navigate('/khuyen-mai/add')} className="btn btn-primary ">
                Thêm
              </button>
            </div>
          </CCardHeader>
          <CCardBody>
            <div>
            <table className="table" style={{textAlign: 'center'}}>
            <tr>
              <th>#</th>
              <th>Mã</th>
              <th>Tên</th>
              <th>Mức giảm</th>
              <th>Tối thiểu</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Mô tả</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
            <tbody className="table-group-divider">
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    {' '}
                    <span>{d.ma}</span>
                  </td>
                  <td>{d.ten}</td>
                  <td>{!d.loaiGiam ? `${d.mucGiam}%` : convertToCurrency(d.mucGiam)}</td>
                  <td>{convertToCurrency(d.tien)}</td>
                  <td>{formatDate(d.thoiGianBatDau)}</td>
                  <td>{formatDate(d.thoiGianKetThuc)}</td>
                  <td>{d.moTa}</td>
                  <td>
                    {d.trangThai === 0 && <span>Sắp diễn ra</span>}
                    {d.trangThai === 1 && <span>Đã kết thúc</span>}
                    {d.trangThai !== 0 && d.trangThai !== 1 && <span>Đang diễn ra</span>}
                  </td>
                  <td>
                    <button className="fa-khenh" onClick={() => navigate(`/khuyen-mai/detail/${d.id}`)}>
                      <i style={{ color: 'green' }}
                            className="fa-solid fa-pen-nib"></i>
                    </button>
                    <button className="fa-khenh" onClick={() => handleSubmit(d.id, { ma: d.ma })}>
                      <i style={{ color: 'orange' }}
                            className="fa-solid fa-trash-can mx-3"></i>
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

export default KhuyenMai
