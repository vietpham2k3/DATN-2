/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Slidebar from '../layout/Slidebar'
import { detailKH, updateKH } from 'service/KhachHangService'
import { Button } from 'react-bootstrap'
import ModalUpdate from '../modal/ModalUpdate'
import { getP, getQH, getTP } from 'service/ApiGHNService'
import { toast } from 'react-toastify'

function ContentThongTinKhachHang({ dataLogin }) {
  const [values, setValues] = useState({})
  const [isShow, setIsShow] = useState(false)
  const [thanhPho, setThanhPho] = useState([])
  const [quan, setQuan] = useState([])
  const [phuong, setPhuong] = useState([])
  const [valuesId, setValuesId] = useState({
    province_id: '',
  })
  const [valuesIdWard, setValuesIdWard] = useState({
    district_id: '',
  })

  useEffect(() => {
    getThanhPho()
  }, [])

  useEffect(() => {
    detailKH22(dataLogin.id)
  }, [dataLogin.id])

  useEffect(() => {
    thanhPho.forEach((province) => {
      if (province.NameExtension[1] === values.tinh) {
        setValuesId({
          province_id: province.ProvinceID,
        })
      }
      // setSelectedProvince(province.ProvinceID)
    })
  }, [thanhPho, values])

  useEffect(() => {
    if (valuesId.province_id) {
      getQuanHuyen(valuesId)
    }
    // setSelectedDistrict(valuesId)
  }, [valuesId.province_id])

  useEffect(() => {
    quan.forEach((district) => {
      if (district.DistrictName === values.huyen) {
        setValuesIdWard({
          district_id: district.DistrictID,
        })
      }
    })
  }, [quan, valuesId])

  useEffect(() => {
    if (valuesIdWard.district_id) {
      getPhuong(valuesIdWard)
    }
    // setSelectedWard(valuesIdWard)
  }, [valuesIdWard.district_id])

  const detailKH22 = async (id) => {
    const res = await detailKH(id)
    if (res) {
      setValues(res.data)
    }
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

  const handleProvinceChange = (event) => {
    const provinceId = {
      province_id: event.target.value,
    }
    getQuanHuyen(provinceId)
    const selectedProvinceId = event.target.value
    const selectedProvince = thanhPho.find(
      (province) => province.ProvinceID === parseInt(selectedProvinceId, 10),
    )

    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.NameExtension[1]
      setValues({
        ...values,
        tinh: selectedProvinceName,
      })
    }
  }

  const handleDistrictChange = (event) => {
    const districtId = {
      district_id: event.target.value,
    }
    getPhuong(districtId)
    // setSelectedDistrict(event.target.value);
    const selectedProvinceId = event.target.value
    const selectedProvince = quan.find(
      (province) => province.DistrictID === parseInt(selectedProvinceId, 10),
    )

    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.DistrictName
      setValues({
        ...values,
        huyen: selectedProvinceName,
      })
    }
  }

  const handleWardChange = (event) => {
    const selectedProvinceId = event.target.value
    const selectedProvince = phuong.find((province) => province.WardCode === selectedProvinceId)
    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.WardName
      setValues({
        ...values,
        xa: selectedProvinceName,
      })
    }
  }

  const getThanhPho = async () => {
    try {
      const res = await getTP()
      if (res) {
        setThanhPho(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getQuanHuyen = async (value) => {
    try {
      const res = await getQH(value)
      if (res) {
        setQuan(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getPhuong = async (value) => {
    try {
      const res = await getP(value)
      if (res) {
        setPhuong(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const put = async (id, value) => {
    const res = await updateKH(id, value)
    if (res) {
      detailKH22(dataLogin.id)
      toast.success('Cập nhật thành công !')
      setIsShow(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    put(dataLogin.id, values)
  }

  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="col-3">
          <Slidebar></Slidebar>
        </div>
        <div className="col-9">
          <h1>Thông tin tài khoản</h1>
          <div className="row mt-4">
            <div className="col-2">
              <p style={{ color: 'rgb(128,128,128)' }}>Họ tên</p>
            </div>
            <div className="col-10">
              <p>{values.tenKhachHang}</p>
            </div>
            <div className="col-2">
              <p style={{ color: 'rgb(128,128,128)' }}>Email</p>
            </div>
            <div className="col-10">
              <p>{values.email}</p>
            </div>
            <div className="col-2">
              <p style={{ color: 'rgb(128,128,128)' }}>Địa chỉ</p>
            </div>
            <div className="col-10">
              <p>
                {values.diaChi}, {values.xa}, {values.huyen}, {values.tinh}
              </p>
            </div>
            <div className="col-2">
              <p style={{ color: 'rgb(128,128,128)' }}>Ngày sinh</p>
            </div>
            <div className="col-10">
              <p>{formatDate(values.ngaySinh)}</p>
            </div>
            <div className="col-2">
              <p style={{ color: 'rgb(128,128,128)' }}>Điện thoại</p>
            </div>
            <div className="col-10">
              <p>{values.sdt}</p>
            </div>
            <div className="col-2">
              <p style={{ color: 'rgb(128,128,128)' }}>Giới tính</p>
            </div>
            <div className="col-10">
              <p>{values.gioiTinh ? 'Nam' : 'Nữ'}</p>
            </div>
            <div className="col-12">
              <Button variant="primary" onClick={() => setIsShow(true)}>
                Cập nhật thông tin
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ModalUpdate
        setIsShow={setIsShow}
        isShow={isShow}
        values={values}
        setValues={setValues}
        handleProvinceChange={handleProvinceChange}
        handleDistrictChange={handleDistrictChange}
        handleWardChange={handleWardChange}
        thanhPho={thanhPho}
        quan={quan}
        phuong={phuong}
        formatDate={formatDate}
        handleSubmit={handleSubmit}
        detailKH22={detailKH22}
        id={dataLogin.id}
      ></ModalUpdate>
    </div>
  )
}

export default ContentThongTinKhachHang
