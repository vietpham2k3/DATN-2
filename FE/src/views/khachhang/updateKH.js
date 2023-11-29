/* eslint-disable react-hooks/exhaustive-deps */
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { detailKH, updateKH } from 'service/KhachHangService'
import { useNavigate, useParams } from 'react-router-dom'
import { getP, getQH, getTP } from 'service/ApiGHNService'

const UpdateKH = () => {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [values, setValues] = useState({})

  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)

  console.log(selectedDistrict)
  console.log(selectedWard)
  console.log(selectedProvince)

  //Lấy tên
  const [selectedProvinceName, setSelectedProvinceName] = useState('')
  const [selectedDistrictName, setSelectedDistrictName] = useState('')
  const [selectedWardName, setSelectedWardName] = useState('')

  console.log(selectedProvinceName)
  console.log(selectedDistrictName)
  console.log(selectedWardName)

  const [valuesId, setValuesId] = useState({
    province_id: '',
  })
  const [valuesIdWard, setValuesIdWard] = useState({
    district_id: '',
  })

  const getThanhPho = async () => {
    try {
      const res = await getTP()
      if (res) {
        setProvinces(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getQuanHuyen = async (value) => {
    try {
      const res = await getQH(value)
      if (res) {
        setDistricts(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getPhuong = async (value) => {
    try {
      const res = await getP(value)
      if (res) {
        setWards(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getThanhPho()
  }, [])

  const handleProvinceChange = async (event) => {
    const provinceId = {
      province_id: event.target.value,
    }
    setSelectedProvince(event.target.value)
    setSelectedProvinceName(event.target.options[event.target.selectedIndex].text)
    setSelectedDistrict(null)
    setSelectedWard(null)
    setSelectedDistrictName('')
    setSelectedWardName('')
    setValues({
      ...values,
      tinh: event.target.options[event.target.selectedIndex].text,
    })
    getQuanHuyen(provinceId)
  }

  const handleDistrictChange = async (event) => {
    const districtId = {
      district_id: event.target.value,
    }
    setSelectedDistrict(event.target.value)
    setSelectedDistrictName(event.target.options[event.target.selectedIndex].text)
    setSelectedWard(null)
    setSelectedWardName('')
    setValues({
      ...values,
      huyen: event.target.options[event.target.selectedIndex].text,
    })
    getPhuong(districtId)
  }

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value)
    setSelectedWardName(event.target.options[event.target.selectedIndex].text)
    setValues({
      ...values,
      xa: event.target.options[event.target.selectedIndex].text,
    })
  }

  useEffect(() => {
    provinces.forEach((province) => {
      if (province.NameExtension[1] === values.tinh) {
        setValuesId({
          province_id: province.ProvinceID,
        })
        // console.log(province.ProvinceID);
      }
      setSelectedProvince(province.ProvinceID)
    })
  }, [provinces, values])

  // console.log(valuesId.province_id);

  useEffect(() => {
    if (valuesId.province_id) {
      getQuanHuyen(valuesId)
    }
    setSelectedDistrict(valuesId)
  }, [valuesId.province_id])

  useEffect(() => {
    districts.forEach((district) => {
      if (district.DistrictName === values.huyen) {
        setValuesIdWard({
          district_id: district.DistrictID,
        })
      }
    })
  }, [districts, valuesId])

  useEffect(() => {
    if (valuesIdWard.district_id) {
      getPhuong(valuesIdWard)
    }
    setSelectedWard(valuesIdWard)
  }, [valuesIdWard.district_id])

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    detailKH22(id)
  }, [id])

  const detailKH22 = async (id) => {
    const res = await detailKH(id)
    if (res) {
      setValues(res.data)
    }
  }

  const put = async (id, value) => {
    const res = await updateKH(id, value)
    if (res) {
      toast.success('Cập nhật thành công !')
      navigate('/khach-hang/hien-thi')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    put(id, values)
  }

  console.log(values)

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
            <strong>Cập Nhật Khách Hàng</strong>
          </CCardHeader>
          <CCardBody>
            <div>
              <div className="col-md-12">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-4">
                    <label htmlFor="tenNhanVien" className="form-label">
                      Tên Khách Hàng
                    </label>
                    <input
                      id="tenNhanVien"
                      type="text"
                      className="form-control"
                      value={values.tenKhachHang}
                      onChange={(e) => setValues({ ...values, tenKhachHang: e.target.value })}
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
                  <div className="col-md-12">
                    <label htmlFor="ward" className="form-label">
                      Tỉnh/Thành Phố
                    </label>
                    <select
                      id="province"
                      className="form-select fsl"
                      onChange={handleProvinceChange}
                    >
                      <option value="">Chọn tỉnh thành</option>
                      {provinces.map((province) => (
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

                  <div className="col-md-12">
                    <label htmlFor="ward" className="form-label">
                      Quận Huyện
                    </label>
                    <select
                      id="district"
                      className="form-select fsl"
                      onChange={(e) => handleDistrictChange(e)}
                    >
                      <option value="">Chọn quận huyện</option>
                      {districts.map((district) => (
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

                  <div className="col-md-12">
                    <label htmlFor="ward" className="form-label">
                      Phường xã
                    </label>
                    <select id="ward" className="form-select fsl" onChange={handleWardChange}>
                      <option value="">Chọn phường xã</option>
                      {wards.map((ward) => (
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

                  <div className="col-4" style={{ paddingTop: 35 }}>
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
                        checked={values.trangThai === 1}
                        onChange={() => setValues({ ...values, trangThai: 1 })}
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
                        checked={values.trangThai === 0}
                        onChange={() => setValues({ ...values, trangThai: 0 })}
                      />
                      <label htmlFor="a" className="form-check-label">
                        Không hoạt động
                      </label>
                    </div>
                  </div>
                  <div style={{ paddingTop: 35 }} className="col-4">
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
                    className="col-12"
                    style={{ paddingTop: 20, display: 'flex', justifyContent: 'flex-start' }}
                  >
                    <button type="submit" className="btn btn-primary">
                      Cập nhật khách hàng
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

export default UpdateKH
