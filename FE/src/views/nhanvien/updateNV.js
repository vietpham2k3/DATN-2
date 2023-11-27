import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { detailNV, updateNV } from 'service/NhanVienService'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateNV = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState({})

  const { id } = useParams()

  useEffect(() => {
    detail(id)
  }, [id])

  const detail = async (id) => {
    const res = await detailNV(id)
    if (res) {
      setValues(res.data)
    }
  }

  const put = async (id, value) => {
    const res = await updateNV(id, value)
    if (res) {
      toast.success('Cập nhật thành công !')
      navigate('/nhan-vien/hien-thi')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    put(id, values)
  }

  function formatDate(dateString) {
    const dateObject = new Date(dateString)
    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1 // Tháng bắt đầu từ 0, cần cộng thêm 1
    const year = dateObject.getFullYear()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`
    return formattedDate
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cập Nhật Nhân Viên</strong>
          </CCardHeader>
          <CCardBody>
            <div>
              <div className="col-md-12">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-4">
                    <label htmlFor="tenNhanVien" className="form-label">
                      Tên Nhân Viên
                    </label>
                    <input
                      id="tenNhanVien"
                      type="text"
                      className="form-control"
                      value={values.ten}
                      onChange={(e) => setValues({ ...values, ten: e.target.value })}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="sdt" className="form-label">
                      Số Điện Thoại
                    </label>
                    <input
                      id="sdt"
                      type="text"
                      className="form-control"
                      value={values.sdt}
                      onChange={(e) => setValues({ ...values, sdt: e.target.value })}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      value={values.email}
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="diaChi" className="form-label">
                      Địa Chỉ
                    </label>
                    <input
                      id="diaChi"
                      type="text"
                      className="form-control"
                      value={values.diaChi}
                      onChange={(e) => setValues({ ...values, diaChi: e.target.value })}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="diaChi" className="form-label">
                      Mật khẩu
                    </label>
                    <input
                      id="diaChi"
                      type="text"
                      className="form-control"
                      value={values.matKhau}
                      onChange={(e) => setValues({ ...values, matKhau: e.target.value })}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="ngaySinh" className="form-label">
                      Ngày Sinh
                    </label>
                    <input
                      id="ngaySinh"
                      type="date"
                      className="form-control"
                      value={formatDate(values.ngaySinh)}
                      onChange={(e) => setValues({ ...values, ngaySinh: e.target.value })}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="vaiTro" className="form-label me-3">
                      Vai trò:{' '}
                    </label>
                    <select
                      id="vaiTro"
                      className="form-select"
                      value={values.vaiTro}
                      onChange={(e) => setValues({ ...values, vaiTro: parseInt(e.target.value) })}
                    >
                      <option value={0}>Admin</option>
                      <option value={1}>Nhân viên</option>
                    </select>
                  </div>
                  <div className="col-4" style={{ paddingTop: 15 }}>
                    <label htmlFor="a" className="form-label me-3">
                      Trạng thái:{' '}
                    </label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value={values.trangThai}
                        checked={values.trangThai === 0}
                        onChange={() => setValues({ ...values, trangThai: 0 })}
                      />
                      <label htmlFor="a" className="form-check-label">
                        Hoạt động
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value={values.trangThai}
                        checked={values.trangThai === 1}
                        onChange={() => setValues({ ...values, trangThai: 1 })}
                      />
                      <label htmlFor="a" className="form-check-label">
                        Không hoạt động
                      </label>
                    </div>
                  </div>
                  <div style={{ paddingTop: 15 }} className="col-4">
                    <label htmlFor="a" className="form-label me-3" style={{ paddingRight: 5 }}>
                      Giới tính:{' '}
                    </label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions1"
                        id="inlineRadio3"
                        value={true}
                        checked={values.gioiTinh === true}
                        onChange={() => setValues({ ...values, gioiTinh: true })}
                      />
                      <label htmlFor="a" className="form-check-label">
                        Nam
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions1"
                        id="inlineRadio4"
                        value={false}
                        checked={values.gioiTinh === false}
                        onChange={() => setValues({ ...values, gioiTinh: false })}
                      />
                      <label htmlFor="a" className="form-check-label">
                        Nữ
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-4"
                    style={{ paddingTop: 20, display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <button type="submit" className="btn btn-primary">
                      Cập Nhật{' '}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UpdateNV
