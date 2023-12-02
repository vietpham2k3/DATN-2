/* eslint-disable react/prop-types */
import { TextField } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
function ModalUpdate(props) {
  const {
    isShow,
    setIsShow,
    setValues,
    values,
    thanhPho,
    phuong,
    quan,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
    formatDate,
    handleSubmit,
    detailKH22,
    id,
  } = props
  return (
    <Modal
      size="lg"
      show={isShow}
      onHide={() => {
        setIsShow(false)
        detailKH22(id)
      }}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Cập nhật thông tin tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-6">
            <TextField
              id="outlined-basic"
              label="Họ tên"
              variant="standard"
              style={{ width: '100%' }}
              value={values.tenKhachHang}
              onChange={(e) => setValues({ ...values, tenKhachHang: e.target.value })}
            />
          </div>
          <div className="col-6">
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              variant="standard"
              style={{ width: '100%' }}
              value={values.sdt}
              onChange={(e) => setValues({ ...values, sdt: e.target.value })}
            />
          </div>
          <div className="col-6 mt-3">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="standard"
              style={{ width: '100%' }}
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="col-6">
            <input
              id="ngaySinh"
              type="date"
              className="form-control mt-4"
              value={formatDate(values.ngaySinh)}
              onChange={(e) => setValues({ ...values, ngaySinh: e.target.value })}
            />
          </div>
          <div className="col-6 mt-4">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setValues({ ...values, gioiTinh: e.target.value })}
            >
              <option value={false} selected={values.gioiTinh === false}>
                Nữ
              </option>
              <option value={true} selected={values.gioiTinh}>
                Nam
              </option>
            </select>
          </div>
          <div className="col-6 mt-3">
            <TextField
              id="outlined-basic"
              label="Địa chỉ"
              variant="standard"
              style={{ width: '100%' }}
              value={values.diaChi}
              onChange={(e) => setValues({ ...values, diaChi: e.target.value })}
            />
          </div>
          <div className="col-md-4 mt-3">
            <select id="province" className="form-select fsl" onChange={handleProvinceChange}>
              <option value="">Chọn tỉnh thành</option>
              {thanhPho.map((province) => (
                <option
                  key={province.ProvinceID}
                  selected={province.NameExtension[1] === values.tinh}
                  value={province.ProvinceID}
                >
                  {province.NameExtension[1]}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mt-3">
            <select
              id="district"
              className="form-select fsl"
              onChange={(e) => handleDistrictChange(e)}
            >
              <option value="">Chọn quận huyện</option>
              {quan.map((district) => (
                <option
                  key={district.DistrictID}
                  selected={district.DistrictName === values.huyen}
                  value={district.DistrictID}
                >
                  {district.DistrictName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mt-3">
            <select id="ward" className="form-select fsl" onChange={handleWardChange}>
              <option value="">Chọn phường xã</option>
              {phuong.map((ward) => (
                <option
                  key={ward.WardCode}
                  selected={ward.WardName === values.xa}
                  value={ward.WardCode}
                >
                  {ward.WardName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <Button variant="primary" onClick={handleSubmit}>
              Cập nhật
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalUpdate
