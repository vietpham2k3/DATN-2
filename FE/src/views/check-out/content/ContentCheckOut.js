/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getP, getQH, getTP } from 'service/ApiGHNService'
import { addKhuyenMai, clearGH, thanhToan } from 'service/GioHangService'
import { detailKH } from 'service/KhachHangService'
import { payOnline } from 'service/PayService'
import { getById, getKmById } from 'service/ServiceDonHang'

function ContentCheckOut({ dataLogin, idGH }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [thanhPho, setThanhPho] = useState([])
  const [quan, setQuan] = useState([])
  const [phuong, setPhuong] = useState([])
  const [dataKH, setDataKH] = useState([])
  const [active, setActive] = useState('')
  const [urlPay, setUrlPay] = useState('')
  // const [isThanhToan, setIsThanhToan] = useState(false)
  const [dataHDCT, setDataHDCT] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [tongTienSauKhiGiam, setTongTienSauKhiGiam] = useState(0)
  const [dataHDKM, setDataHDKM] = useState([])
  const [valuesUpdateHD, setValuesUpdateHD] = useState({
    tenNguoiNhan: '',
    soDienThoai: '',
    diaChi: '',
    tinh: '',
    huyen: '',
    xa: '',
    tongTien: 0,
    tongTienKhiGiam: 0,
    trangThai: 0,
    ngayDuKienNhan: 0,
    ghiChu: '',
    tienShip: 0,
    nguoiTao: '',
    hinhThucThanhToan: {
      tien: 0,
      ten: '',
      trangThai: 1,
    },
  })
  const [valuesId, setValuesId] = useState({
    province_id: '',
  })
  const [valuesIdWard, setValuesIdWard] = useState({
    district_id: '',
  })
  const [valuesKhuyenMai, setValuesKhuyenMai] = useState({
    khuyenMai: {
      ma: '',
      tien: 0,
    },
    hoaDon: {
      id: id,
    },
    tienGiam: 0,
  })

  useEffect(() => {
    getThanhPho()
  }, [])

  useEffect(() => {
    getAllHDById(id)
    findAllKM(id)
  }, [id])

  useEffect(() => {
    let sum = 0
    dataHDCT.forEach((d) => {
      sum += d.soLuong * d.donGia
    })
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum)
  }, [dataHDCT])

  useEffect(() => {
    if (dataLogin && dataLogin.role === 'KH') {
      // eslint-disable-next-line react/prop-types
      getKH(dataLogin.id)
    }
  }, [dataLogin])

  console.log(active);

  useEffect(() => {
    if (dataLogin && dataLogin.role === 'KH') {
      setValuesUpdateHD({
        ...valuesUpdateHD,
        trangThai: active === true ? 0 : 1,
        khachHang: {
          id: dataLogin.id
        },
        tenNguoiNhan: dataKH.tenKhachHang,
        nguoiTao: dataKH.tenKhachHang,
        soDienThoai: dataKH.sdt,
        diaChi: dataKH.diaChi,
        xa: dataKH.xa,
        huyen: dataKH.huyen,
        tinh: dataKH.tinh,
      })
      return
    }
  }, [dataKH])

  useEffect(() => {
    thanhPho.forEach((province) => {
      if (province.NameExtension[1] === dataKH.tinh) {
        setValuesId({
          province_id: province.ProvinceID,
        })
      }
      // setSelectedProvince(province.ProvinceID)
    })
  }, [thanhPho, dataKH])

  useEffect(() => {
    if (valuesId.province_id) {
      getQuanHuyen(valuesId)
    }
    // setSelectedDistrict(valuesId)
  }, [valuesId.province_id])

  useEffect(() => {
    quan.forEach((district) => {
      if (district.DistrictName === dataKH.huyen) {
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

  useEffect(() => {
    if (dataHDKM.length > 0 || totalAmount > 0) {
      const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0)
      setTongTienSauKhiGiam(totalAmount - totalGiam)
      VNP(totalAmount - totalGiam)
    }
  }, [dataHDKM, totalAmount])

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
      setValuesUpdateHD({
        ...valuesUpdateHD,
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
      setValuesUpdateHD({
        ...valuesUpdateHD,
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
      setValuesUpdateHD({
        ...valuesUpdateHD,
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

  const getKH = async (id) => {
    try {
      const res = await detailKH(id)
      if (res) {
        setDataKH(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllHDById = async (idHD) => {
    try {
      const res = await getById(idHD)
      if (res) {
        setDataHDCT(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    return formatter.format(number)
  }

  const handleAddVoucher = () => {
    addVToHD(valuesKhuyenMai)
  }

  const findAllKM = async (id) => {
    const res = await getKmById(id)
    if (res) {
      setDataHDKM(res.data)
    }
  }

  const handleChangeKM = (value) => {
    setValuesKhuyenMai({
      ...valuesKhuyenMai,
      khuyenMai: {
        ma: value,
        tien: totalAmount,
      },
    })
  }

  const addVToHD = async (value) => {
    try {
      const res = await addKhuyenMai(value)
      if (res.data === 'error') {
        toast.error('Mã khuyễn mãi không hợp lệ')
      } else if (res.data === 'ff') {
        toast.error('Bạn đang sử dụng mã này')
      } else {
        toast.success('Thêm mã thành công')
        findAllKM(id)
        setTongTienSauKhiGiam()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const thanhToanHD = async (id, value, nguoiTao) => {
    try {
      const res = await thanhToan(id, value, nguoiTao)
      if (res) {
        toast.success('Thanh toán thành công')
        localStorage.setItem('res', JSON.stringify(res.data.hinhThucThanhToan.id))
        clear(idGH, id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleThanhToan = () => {
    if (active) {
      thanhToanHD(id, valuesUpdateHD, '')
      navigate('/trang-chu')
    }
    if (active === false) {
      window.location.href = urlPay
      thanhToanHD(id, valuesUpdateHD, '')
    }
  }

  const clear = async (id, idHD) => {
    try {
      await clearGH(id, idHD)
    } catch (error) {
      console.log(error)
    }
  }

  const VNP = async (tien) => {
    try {
      const res = await payOnline(tien)
      if (res) {
        setUrlPay(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(urlPay)

  return (
    <div className="row" style={{ height: 1000 }}>
      <div className="col-7">
        <div className="mt-5 me-5" style={{ marginLeft: 400 }}>
          <h1>Shop F5</h1>
          <strong>Thông tin giao hàng</strong>
          <div className="row">
            <div className="col-12 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Họ tên"
                aria-label="First name"
                value={valuesUpdateHD.tenNguoiNhan}
                onChange={(e) => {
                  setValuesUpdateHD({
                    ...valuesUpdateHD,
                    tenNguoiNhan: e.target.value,
                    nguoiTao: e.target.value,
                  })
                }}
              />
            </div>
            <div className="col-6 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Số điện thoại"
                aria-label="Last name"
                value={valuesUpdateHD.soDienThoai}
                onChange={(e) => {
                  setValuesUpdateHD({
                    ...valuesUpdateHD,
                    soDienThoai: e.target.value,
                  })
                }}
              />
            </div>
            <div className="col-6 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Địa chỉ"
                aria-label="Last name"
                value={valuesUpdateHD.diaChi}
                onChange={(e) => {
                  setValuesUpdateHD({
                    ...valuesUpdateHD,
                    diaChi: e.target.value,
                  })
                }}
              />
            </div>
            <div className="col-md-4 mt-3">
              <select id="province" className="form-select fsl" onChange={handleProvinceChange}>
                <option value="">Chọn tỉnh thành</option>
                {thanhPho.map((province) => (
                  <option
                    key={province.ProvinceID}
                    selected={province.NameExtension[1] === dataKH.tinh}
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
                    selected={district.DistrictName === dataKH.huyen}
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
                    selected={ward.WardName === dataKH.xa}
                    value={ward.WardCode}
                  >
                    {ward.WardName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 mt-3 ms-2 me-2 d-flex justify-content-between align-items-center">
              <p style={{ cursor: 'pointer' }}>Giỏ hàng</p>
              <button type="button" className="btn btn-success" onClick={handleThanhToan}>
                Thanh toán
              </button>
            </div>
            <div
              className="col-12 mt-5 ms-3 d-flex align-items-center"
              style={{
                border: active ? '2px solid blue' : '1px solid gray',
                width: '95%',
                height: '90px',
                borderRadius: 10,
                cursor: 'pointer',
              }}
              onClick={() => {
                setActive(true)
                setValuesUpdateHD({
                  ...valuesUpdateHD,
                  tongTien: totalAmount,
                  tongTienKhiGiam: tongTienSauKhiGiam,
                  hinhThucThanhToan: {
                    ...valuesUpdateHD.hinhThucThanhToan,
                    ten: 'Tiền mặt',
                    tien: tongTienSauKhiGiam,
                  },
                })
              }}
            >
              <img
                width={'36px'}
                height={'36px'}
                src="https://symbols.vn/wp-content/uploads/2021/11/Bieu-tuong-tien-mat-doc-dao.png"
                alt="COD Logo"
                className="payment-logo ms-3"
              />
              <h3 className="ps-3">Thanh toán bằng Tiền mặt</h3>
            </div>
            <div
              className="col-12 mt-2 ms-3 d-flex align-items-center"
              style={{
                border: active === false ? '2px solid blue' : '1px solid gray',
                width: '95%',
                height: '90px',
                borderRadius: 10,
                cursor: 'pointer',
              }}
              onClick={() => {
                setActive(false)
                setValuesUpdateHD({
                  ...valuesUpdateHD,
                  tongTien: totalAmount,
                  tongTienKhiGiam: tongTienSauKhiGiam,
                  hinhThucThanhToan: {
                    ...valuesUpdateHD.hinhThucThanhToan,
                    ten: 'VNPay',
                    tien: tongTienSauKhiGiam,
                  },
                })
              }}
            >
              <img
                width={'50px'}
                height={'50px'}
                src="https://on.net.vn/web/image/3876184-2b57e083/202166185_2021396718013233_8499389898242103910_n.png"
                alt="VNPay Logo"
                className="payment-logo ms-2"
              />
              <h3 className="ps-3">Thanh toán bằng VNPay</h3>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-5"
        style={{ backgroundColor: 'rgb(250,250,250)', borderLeft: '1px solid rgb(225,225,225)' }}
      >
        <div className="mt-5 ms-5" style={{ marginRight: 200 }}>
          <div className="row">
            <div className="col-12">
              <table className="my-2 table">
                {dataHDCT.map((product, index) => (
                  <tr key={index}>
                    <td className="pt-3">
                      <img
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${product.chiTietSanPham.id}`}
                        className="img-cart"
                        style={{ width: '70px', height: '100px', borderRadius: '15px' }}
                      />
                    </td>
                    <td className="pt-3">
                      {product.chiTietSanPham.sanPham.ten} <br />
                      {product.chiTietSanPham.kichCo.ten} - {product.chiTietSanPham.mauSac.ma}
                    </td>
                    <td className="pt-3">x{product.soLuong}</td>
                    <td className="pt-3">{convertToCurrency(product.donGia * product.soLuong)}</td>
                  </tr>
                ))}
              </table>
              <hr />
            </div>
            <div className="col-12 row ms-1">
              <div className="col-9">
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Nhập mã giảm giá"
                  aria-label="First name"
                  onChange={(e) => handleChangeKM(e.target.value)}
                />
              </div>
              <div className="col-3 mb-4">
                <button type="button" className="btn btn-success mt-3" onClick={handleAddVoucher}>
                  Áp dụng
                </button>
              </div>
              <hr />
            </div>
            <div className="col-12 ms-1">
              <div className="d-flex justify-content-between">
                <p>Tạm tính:</p>
                <p>{convertToCurrency(totalAmount)}</p>
              </div>
              {dataHDKM.map((d, i) => (
                <div key={i} className="d-flex justify-content-between" style={{ color: 'red' }}>
                  <p>Giảm giá:</p>
                  <p>-{convertToCurrency(d.tienGiam)}</p>
                </div>
              ))}
              <hr />
            </div>
            <div className="col-12 ms-1">
              <div
                className="d-flex justify-content-between"
                style={{ fontSize: 20, fontWeight: 'bold' }}
              >
                <p>Tổng cộng:</p>
                <p>{convertToCurrency(tongTienSauKhiGiam)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentCheckOut
