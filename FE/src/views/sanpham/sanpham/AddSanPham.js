/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
// import { Card } from '@mui/material';
// project imports
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { useState } from 'react'
import {
  getAllListCL,
  getAllListKC,
  getAllListLSP,
  getAllListMS,
  getAllListNSX,
  postCTSP,
} from '../../../service/SanPhamService'
import { useEffect } from 'react'
import '../../../scss/SanPham.scss'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { postCreate } from '../../../service/ServiceChatLieu'
import { add } from '../../../service/LoaiSanPhamService'
import { postNSX } from '../../../service/NhaSanXuatService'
import { postMS } from '../../../service/ServiceMauSac'
import { postCreate as postKC } from '../../../service/KichCoService'
import MyVerticallyCenteredModal from './AddQuicklyChatLuong'
import AddMauSac from './AddQuicklyMauSac'
function AddSanPham() {
  const [listCL, setListCL] = useState([])
  const [listNSX, setListNSX] = useState([])
  const [listLSP, setListLSP] = useState([])
  const [listMS, setListMS] = useState([])
  const [listKC, setListLC] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [modalShowLSP, setModalShowLSP] = useState(false)
  const [modalShowNSX, setModalShowNSX] = useState(false)
  const [modalShowKC, setModalShowKC] = useState(false)
  const [modalShowMS, setModalShowMS] = useState(false)

  const navigate = useNavigate()

  const [values, setValues] = useState({
    chatLieu: {
      id: '',
    },
    sanPham: {
      ten: '',
      moTa: '',
    },
    loaiSanPham: {
      id: '',
    },
    nhaSanXuat: {
      id: '',
    },
    kichCo: {
      id: '',
    },
    mauSac: {
      id: '',
    },
    soLuong: '',
    giaBan: '',
    trangThai: 1,
  })

  const [valuesCL, setValuesCL] = useState({
    ten: '',
    trangThai: 0,
  })

  const [valuesMS, setValuesMS] = useState({
    ten: '#ffffffff',
    ma: '',
    trangThai: 0,
  })

  const closeModal = () => {
    setModalShow(false)
    setModalShowNSX(false)
    setModalShowLSP(false)
    setModalShowKC(false)
    setModalShowMS(false)
    getAllList()
    setValuesCL({
      ten: '',
      trangThai: 0,
    })
  }

  const handleAddNSX = (event) => {
    event.preventDefault()
    addNSX(valuesCL)
  }

  const addNSX = (value) => {
    const res = postNSX(value)
    if (res) {
      toast.success('Thêm thành công')
      closeModal()
    }
  }

  const handleAddLSP = (event) => {
    event.preventDefault()
    addLSP(valuesCL)
  }

  const addLSP = (value) => {
    const res = add(value)
    if (res) {
      toast.success('Thêm thành công')
      closeModal()
    }
  }

  const handleAddMS = (event) => {
    event.preventDefault()
    addMS(valuesMS)
  }

  const addMS = async (value) => {
    const res = await postMS(value)
    if (res) {
      toast.success('Thêm thành công')
      closeModal()
      setValuesMS({
        ten: '#ffffffff',
        ma: '',
        trangThai: 0,
      })
    }
  }

  const handleSubmitCL = (event) => {
    event.preventDefault()
    post(valuesCL)
  }

  const post = async (value) => {
    const res = await postCreate(value)
    if (res) {
      toast.success('Thêm thành công')
      closeModal()
    }
  }

  const postKichCo = async (value) => {
    const res = await postKC(value)
    if (res) {
      toast.success('Thêm thành công')
      closeModal()
    }
  }

  const handleSubmitKC = (event) => {
    event.preventDefault()
    postKichCo(valuesCL)
  }

  useEffect(() => {
    getAllList()
  }, [])

  const postctsp = async (value) => {
    const res = await postCTSP(value)
    if (res) {
      toast.success('Thêm thành công')
      navigate(`/quan-ly-san-pham/san-pham/detail/${res.data.id}/${res.data.sanPham.id}`)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!values.mauSac.id || !values.kichCo.id || !values.soLuong) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }
    await postctsp(values)
  }

  const handleConfirmClick = () => {
    // Perform validation
    if (
      values.sanPham.ten.trim() === '' ||
      values.giaBan.trim() === '' ||
      values.sanPham.moTa.trim() === '' ||
      values.soLuong.trim() === ''
    ) {
      // Display an error message or prevent confirmation
      toast.error('Không được để trống !')
    } else {
      // Validation passed, update the states
      toast.success('Cập nhật thành công')
      setIsHidden(false)
      setConfirmClicked(true)
    }
  }

  const getAllList = async () => {
    const resCL = await getAllListCL()
    const resLSP = await getAllListLSP()
    const resNSX = await getAllListNSX()
    const resMS = await getAllListMS()
    const resKC = await getAllListKC()
    if (resCL || resLSP || resNSX || resMS || resKC) {
      setListCL(resCL.data)
      setListLSP(resLSP.data)
      setListNSX(resNSX.data)
      setListMS(resMS.data)
      setListLC(resKC.data)
      if (
        resCL.data.length > 0 ||
        resLSP.data.length > 0 ||
        resNSX.data.length > 0 ||
        resMS.data.length > 0 ||
        resKC.data.length > 0
      ) {
        setValues({
          ...values,
          chatLieu: {
            id: resCL.data[0].id,
          },
          loaiSanPham: {
            id: resLSP.data[0].id,
          },
          mauSac: {
            id: resMS.data[0].id,
          },
          kichCo: {
            id: resKC.data[0].id,
          },
          nhaSanXuat: {
            id: resNSX.data[0].id,
          },
        })
      }
    }
  }

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Thêm sản phẩm</strong>
        </CCardHeader>
        <CCardBody>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="trang-thai">
                Tên
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên sản phẩm..."
                value={values.sanPham.ten}
                onChange={(e) =>
                  setValues({
                    ...values,
                    sanPham: { ...values.sanPham, ten: e.target.value },
                  })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="trang-thai1">
                Giá bán
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập giá sản phẩm..."
                value={values.giaBan}
                onChange={(e) => setValues({ ...values, giaBan: e.target.value })}
              />
            </div>

            <div className="col-6">
              <label className="form-label me-3" htmlFor="trang-thai2">
                Trạng thái:{' '}
              </label>{' '}
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setValues({ ...values, trangThai: e.target.value })}
              >
                <option value="1">Đang bán</option>
                <option value="0">Ngừng bán</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label me-3" htmlFor="trang-thai3">
                Chất liệu{' '}
                <span
                  role="button"
                  tabIndex={0}
                  className="fa-solid"
                  onClick={() => setModalShow(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setModalShow(true)
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fa-solid fa-plus"></i>
                </span>
              </label>{' '}
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setValues({
                    ...values,
                    chatLieu: {
                      id: e.target.value,
                    },
                  })
                }}
              >
                {listCL.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.ten}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label me-3" htmlFor="trang-thai5">
                Loại sản phẩm:{' '}
                <span
                  role="button"
                  tabIndex={0}
                  className="fa-solid"
                  onClick={() => setModalShowLSP(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setModalShowLSP(true)
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fa-solid fa-plus"></i>
                </span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setValues({
                    ...values,
                    loaiSanPham: {
                      id: e.target.value,
                    },
                  })
                }}
              >
                {listLSP.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.ten}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label me-3" htmlFor="trang-thai6">
                Nhà sản xuất:{' '}
                <span
                  role="button"
                  tabIndex={0}
                  className="fa-solid"
                  onClick={() => setModalShowNSX(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setModalShowNSX(true)
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fa-solid fa-plus"></i>
                </span>
              </label>{' '}
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setValues({
                    ...values,
                    nhaSanXuat: {
                      id: e.target.value,
                    },
                  })
                }}
              >
                {listNSX.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.ten}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label me-3" htmlFor="trang-thai6">
                Màu sắc:{' '}
                <span
                  role="button"
                  tabIndex={0}
                  className="fa-solid"
                  onClick={() => setModalShowMS(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setModalShowMS(true)
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fa-solid fa-plus"></i>
                </span>
              </label>{' '}
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setValues({
                    ...values,
                    mauSac: {
                      id: e.target.value,
                    },
                  })
                }}
              >
                {listMS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.ma}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label me-3" htmlFor="trang-thai6">
                Kích cỡ:{' '}
                <span
                  role="button"
                  tabIndex={0}
                  className="fa-solid"
                  onClick={() => setModalShowKC(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setModalShowKC(true)
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fa-solid fa-plus"></i>
                </span>
              </label>{' '}
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setValues({
                    ...values,
                    kichCo: {
                      id: e.target.value,
                    },
                  })
                }}
              >
                {listKC.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.ten}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="trang-thai1">
                Mô tả
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Nhập mô tả sản phẩm..."
                rows={3}
                value={values.sanPham.moTa}
                onChange={(e) =>
                  setValues({
                    ...values,
                    sanPham: { ...values.sanPham, moTa: e.target.value },
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="trang-thai1">
                Số lượng:{' '}
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Nhập số lượng"
                onChange={(e) =>
                  setValues({
                    ...values,
                    soLuong: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-12 d-flex justify-content-start">
              <div className="hidden-element">
                <button onClick={handleSubmit} type="submit" className="btn btn-info">
                Thêm sản phẩm <i className="fa-solid fa-square-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleSubmit={handleSubmitCL}
            values={valuesCL}
            setValues={setValuesCL}
          />
          <MyVerticallyCenteredModal
            show={modalShowLSP}
            onHide={() => setModalShowLSP(false)}
            handleSubmit={handleAddLSP}
            values={valuesCL}
            setValues={setValuesCL}
          />
          <MyVerticallyCenteredModal
            show={modalShowNSX}
            onHide={() => setModalShowNSX(false)}
            handleSubmit={handleAddNSX}
            values={valuesCL}
            setValues={setValuesCL}
          />
          <MyVerticallyCenteredModal
            show={modalShowKC}
            onHide={() => setModalShowKC(false)}
            handleSubmit={handleSubmitKC}
            values={valuesCL}
            setValues={setValuesCL}
          />
          <AddMauSac
            show={modalShowMS}
            onHide={() => setModalShowMS(false)}
            handleSubmit={handleAddMS}
            values={valuesMS}
            setValues={setValuesMS}
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default AddSanPham
