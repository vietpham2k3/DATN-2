import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addKH } from 'service/KhachHangService'
import { getP, getQH, getTP } from 'service/ApiGHNService'

const AddKH = () => {
  const navigate = useNavigate()

  // Lấy danh sách tỉnh thành từ API
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)

  //Lấy tên
  const [selectedProvinceName, setSelectedProvinceName] = useState('')
  const [selectedDistrictName, setSelectedDistrictName] = useState('')
  const [selectedWardName, setSelectedWardName] = useState('')

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
    getPhuong(districtId)
  }

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value)
    setSelectedWardName(event.target.options[event.target.selectedIndex].text)
  }

  const [values, setValues] = useState({
    maKhachHang: '',
    tenKhachHang: '',
    sdt: '',
    email: '',
    ngaySinh: '',
    gioiTinh: true,
    trangThai: 1,
    tinhThanh: '',
    quanHuyen: '',
    phuongXa: '',
    diaChi: '',
    matKhau: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setValues((prevValues) => ({
      ...prevValues,
      tinhThanh: selectedProvinceName,
      quanHuyen: selectedDistrictName,
      phuongXa: selectedWardName,
    }))
    const formData = new FormData()
    formData.append('tenKhachHang', values.tenKhachHang)
    formData.append('sdt', values.sdt)
    formData.append('email', values.email)
    formData.append('ngaySinh', values.ngaySinh)
    formData.append('gioiTinh', values.gioiTinh)
    formData.append('trangThai', values.trangThai)
    formData.append('diaChi', values.diaChi)
    formData.append('tinhThanh', selectedProvinceName)
    formData.append('quanHuyen', selectedDistrictName)
    formData.append('phuongXa', selectedWardName)
    formData.append('matKhau', values.matKhau)

    try {
      const res = await addKH(formData)
      if (res) {
        toast.success('Thêm thành công')
        navigate('/khach-hang/hien-thi')
      }
    } catch (error) {
      console.error(error)
      toast.error('Đã xảy ra lỗi khi thêm khách hàng')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm Khách Hàng</strong>
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
                      value={values.ngaySinh}
                      onChange={(e) => setValues({ ...values, ngaySinh: e.target.value })}
                    />
                  </div>

                  <div className="col-md-12" style={{ paddingBottom: 10 }}>
                    <label htmlFor="ward" className="form-label">
                      Tỉnh/Thành Phố
                    </label>
                    <select
                      id="province"
                      className="form-select fsl"
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                    >
                      <option value="">Chọn tỉnh thành</option>
                      {provinces.map((province) => (
                        <option key={province.ProvinceID} value={province.ProvinceID}>
                          {province.NameExtension[1]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-12" style={{ paddingBottom: 10 }}>
                    <label htmlFor="ward" className="form-label">
                      Quận Huyện
                    </label>
                    <select
                      id="district"
                      className="form-select fsl"
                      value={selectedDistrict || ''}
                      onChange={(e) => handleDistrictChange(e)}
                      disabled={!selectedProvince}
                    >
                      <option value="">Chọn quận huyện</option>
                      {districts.map((district) => (
                        <option key={district.DistrictID} value={district.DistrictID}>
                          {district.DistrictName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-12" style={{ paddingBottom: 10 }}>
                    <label htmlFor="ward" className="form-label">
                      Phường xã
                    </label>
                    <select
                      id="ward"
                      className="form-select fsl"
                      value={selectedWard || ''}
                      onChange={handleWardChange}
                      disabled={!selectedDistrict || !selectedProvince}
                    >
                      <option value="">Chọn phường xã</option>
                      {wards.map((ward) => (
                        <option key={ward.WardCode} value={ward.WardCode}>
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
                        value={1}
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
                        value={0}
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
                      Thêm khách hàng
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

export default AddKH
