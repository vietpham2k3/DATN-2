import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//  React examples
import { Button } from 'react-bootstrap'
import { putKM } from 'service/ServiceKhuyenMai'
import { detailKM } from 'service/ServiceKhuyenMai'
const UpdateKM = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    ma: '',
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

  const { id } = useParams()

  useEffect(() => {
    detail(id)
  }, [id])

  const detail = async (id) => {
    const res = await detailKM(id)
    if (res) {
      const { thoiGianBatDau, thoiGianKetThuc } = res.data

      // Chuyển đổi ngày tháng thành chuỗi ngày tháng hợp lệ
      const ngayBatDau = new Date(thoiGianBatDau).toISOString().split('T')[0]
      const gioBatDau = new Date(thoiGianBatDau).toISOString().split('T')[1].substring(0, 5)
      const ngayKetThuc = new Date(thoiGianKetThuc).toISOString().split('T')[0]
      const gioKetThuc = new Date(thoiGianKetThuc).toISOString().split('T')[1].substring(0, 5)

      setValues({
        ...res.data,
        thoiGianBatDau: ngayBatDau + 'T' + gioBatDau,
        thoiGianKetThuc: ngayKetThuc + 'T' + gioKetThuc,
      })
    }
  }

  // const handleLoaiGiamChange = (event) => {
  //   const loaiGiam = event.target.value;
  //   setValues({ ...values, loaiGiam: loaiGiam });
  //   setError(false); // Reset lỗi khi loại giảm được chọn
  // };

  const put = async (id, value) => {
    const res = await putKM(id, value)
    if (res) {
      toast.success('Update thành công !')
      navigate('/khuyen-mai/hien-thi')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
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
    if (!values.loaiGiam && (values.mucGiam < 0 || values.mucGiam > 100)) {
      toast.error('Nhập số % giảm sai, vui lòng nhập lại')
      return
    }
    put(id, values) // Gọi hàm post nếu dữ liệu hợp lệ
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cập Nhật Khuyến Mãi</strong>
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
                            onChange={() => {
                              setValues({ ...values, loaiGiam: true })
                            }}
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
                            onChange={() => {
                              setValues({ ...values, loaiGiam: false })
                            }}
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
                        min={0}
                        onChange={(event) => setValues({ ...values, mucGiam: event.target.value })}
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
                      Cập nhật khuyến mãi
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

export default UpdateKM
