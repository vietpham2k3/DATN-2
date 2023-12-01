import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
//  React examples
import { Button } from 'react-bootstrap'
import { postKM } from 'service/ServiceKhuyenMai'
const AddKM = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    // ma: '',
    ten: '',
    mucGiam: '',
    tien: '',
    thoiGianBatDau: '',
    thoiGianKetThuc: '',
    moTa: '',
    trangThai: 0,
    loaiGiam: '',
  })

  // const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (values.loaiGiam === '') {
      toast.error('Vui lòng chọn loại giảm')
      return
    }

    if (
      values.ten === '' ||
      values.thoiGianBatDau === '' ||
      values.thoiGianKetThuc === '' ||
      values.mucGiam === '' ||
      values.tien === ''
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin! ')
      return
    }

    if (values.loaiGiam === false && (values.mucGiam < 0 || values.mucGiam > 100)) {
      toast.error('Nhập số % giảm sai, vui lòng nhập lại')
      return
    }
    await post(values) // Gọi hàm post nếu dữ liệu hợp lệ
  }

  const handleMucGiamChange = (event) => {
    const mucGiam = event.target.value
    setValues({ ...values, mucGiam })
    // setError(false); // Reset lỗi khi giá trị thay đổi
  }

  const post = async (value) => {
    const res = await postKM(value)
    if (res) {
      toast.success('Thêm thành công !')
      navigate('/khuyen-mai/hien-thi')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm Khuyến Mãi</strong>
          </CCardHeader>
          <CCardBody>
            <div>
              <div className="col-md-12">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-4">
                      <label htmlFor="a" className="form-label">
                        Tên:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={values.ten}
                        onChange={(event) => setValues({ ...values, ten: event.target.value })}
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="a" className="form-label" style={{ display: 'flex' }}>
                        Mức giảm:
                        <div className="form-check" style={{ marginLeft: 15, marginRight: 15 }}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={true}
                            checked={values.loaiGiam === true}
                            onChange={() => setValues({ ...values, loaiGiam: true })}
                          />
                          <label htmlFor="a" className="form-check-label">
                            Tiền giảm
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={false}
                            checked={values.loaiGiam === false}
                            onChange={() => setValues({ ...values, loaiGiam: false })}
                          />
                          <label htmlFor="a" className="form-check-label">
                            % giảm
                          </label>
                        </div>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={values.mucGiam}
                        onChange={handleMucGiamChange}
                        disabled={values.loaiGiam === ''}
                        min={0}
                      />
                    </div>

                    <div className="col-md-4" style={{ paddingTop: 10 }}>
                      <label htmlFor="a" className="form-label">
                        Tối thiểu:
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={values.tien}
                        min={0}
                        onChange={(event) => setValues({ ...values, tien: event.target.value })}
                      />
                    </div>

                    <div className="col-md-4" style={{ paddingTop: 10 }}>
                      <label htmlFor="a" className="form-label">
                        Thời gian bắt đầu:
                      </label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        value={values.thoiGianBatDau}
                        onChange={(event) =>
                          setValues({ ...values, thoiGianBatDau: event.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-4" style={{ paddingTop: 10 }}>
                      <label htmlFor="a" className="form-label">
                        Thời gian kết thúc:
                      </label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        value={values.thoiGianKetThuc}
                        onChange={(event) =>
                          setValues({ ...values, thoiGianKetThuc: event.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-4" style={{ paddingTop: 10 }}>
                      <label htmlFor="a" className="form-label">
                        Mô tả:
                      </label>
                      <textarea
                        className="form-control"
                        value={values.moTa}
                        onChange={(event) => setValues({ ...values, moTa: event.target.value })}
                      />
                    </div>
                  </div>
                  <br></br>
                  <div className="col-12">
                    <Button type="submit" variant="primary">
                      Thêm khuyến mãi
                    </Button>{' '}
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

export default AddKM
