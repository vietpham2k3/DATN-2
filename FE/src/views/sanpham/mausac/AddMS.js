import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import InputColor from 'react-input-color'

import { postMS } from 'service/ServiceMauSac'

import { useNavigate } from 'react-router-dom'
//  React examples
import { Button } from 'react-bootstrap'

const AddMauSac = () => {
  const [color, setColor] = useState({ r: 94, g: 114, b: 228, a: 1 }) // Giá trị màu mặc định

  const handleColorChange = (newColor) => {
    setColor(newColor) // Cập nhật giá trị màu từ bảng màu
    // setMa(newColor.hex); // Cập nhật giá trị 'ma' từ bảng màu
    setValues({ ...values, ten: newColor.hex })
  }

  const navigate = useNavigate()
  const [values, setValues] = useState({
    ten: '#ffffffff',
    ma: '',
    trangThai: 0,
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    post(values)
  }

  const post = async (value) => {
    const res = await postMS(value)
    if (res) {
      toast.success('Thêm thành công !')
      navigate('/quan-ly-san-pham/mau-sac')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm màu sắc</strong>
          </CCardHeader>
          <CCardBody>
            <div>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <span className="form-label" style={{ fontWeight: 'bold' }}>Tên màu</span>
                  <input
                    type="text"
                    className="form-control"
                    value={values.ma}
                    onChange={(e) => setValues({ ...values, ma: e.target.value })}
                  />
                </div>
                <div className="col-6" style={{paddingLeft: 50}}>
                  <span style={{ fontWeight: 'bold' }} className="form-label me-3">
                    Trạng thái:{' '}
                  </span>
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="0"
                      checked={true}
                      onChange={() => setValues({ ...values, trangThai: 0 })}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Kích hoạt
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="1"
                      onChange={() => setValues({ ...values, trangThai: 1 })}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Ngừng kích hoạt
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <span style={{ fontWeight: 'bold' }} className="form-label">
                    Mã Màu:{' '}
                  </span>
                  <br></br>
                  <InputColor
                    initialValue={values.ten}
                    onChange={handleColorChange}
                    placement="right"
                  />
                  <div
                    style={{
                      width: 300,
                      height: 300,
                      marginTop: 20,
                      backgroundColor: color.rgba,
                    }}
                  />
                </div>
                <div className="col-12">
                  <Button type="submit" className="btn btn-bg-info">
                    Thêm màu sắc
                  </Button>
                </div>
              </form>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddMauSac
