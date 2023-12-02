/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import {
  getAllListCL,
  getAllListLSP,
  getAllListNSX,
  putCTSP,
  detailCTSP,
  listAnh,
  deleteAnh,
  addAnh,
  getAllByIdSP,
  postCTSP,
} from '../../../service/SanPhamService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../scss/SanPham.scss'
import '../../../scss/UpdateSanPham.scss'
import { toast } from 'react-toastify'
import { Modal } from 'react-bootstrap'
import { useParams } from 'react-router'
import { postCreate } from '../../../service/ServiceChatLieu'
import { add } from '../../../service/LoaiSanPhamService'
import { postNSX } from '../../../service/NhaSanXuatService'
import MyVerticallyCenteredModal from './AddQuicklyChatLuong'
import AddMSKCCTSP from './AddMSKCCTSP'
import { useRef } from 'react'
import defaultImage from '../../../../src/assets/images/istockphoto-1396814518-612x612.jpg'
import { Table } from 'react-bootstrap'
import ConfirmDelete from './ConfirmDelete'
import UpdateMSKCCTSP from './UpdateMSKCCTSP'
import AddMauSac from './AddQuicklyMauSac'
import { postMS } from '../../../service/ServiceMauSac'
import { postCreate as postKC } from '../../../service/KichCoService'
import QrCode from 'qrcode'

function UpdateSanPham() {
  const [listCL, setListCL] = useState([])
  const [listNSX, setListNSX] = useState([])
  const [listLSP, setListLSP] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [modalShowLSP, setModalShowLSP] = useState(false)
  const [modalShowNSX, setModalShowNSX] = useState(false)
  const [modalShowKC, setModalShowKC] = useState(false)
  const [modalShowMS, setModalShowMS] = useState(false)
  const [show, setShow] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const { id, idSP } = useParams()
  const [file, setFile] = useState([])
  const [imageList, setImageList] = useState([])
  const [listMSKC, setListMSKC] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const inputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [idCTSP, setIdCTSP] = useState(null)
  const mainCardRef = useRef(null)
  const maxImages = 5
  const [showModal5, setShowModal5] = useState(false)
  const openModal5 = () => {
    setShowModal5(true)
  }
  const closeModal5 = () => {
    setShowModal5(false)
  }
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
    soLuong: '',
    giaBan: '',
    trangThai: 1,
  })

  const [valuesMS, setValuesMS] = useState({
    ten: '#ffffffff',
    ma: '',
    trangThai: 0,
  })

  useEffect(() => {
    getAllMSKC(idSP)
  }, [idSP])

  const getAllMSKC = async (id) => {
    try {
      const res = await getAllByIdSP(id)
      if (res && res.data) {
        setListMSKC(res.data)
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddMS = (event) => {
    event.preventDefault()
    addMS(valuesMS)
  }

  const addMS = async (value) => {
    const res = await postMS(value)
    if (res) {
      closeModal()
      setValuesMS({
        ten: '#ffffffff',
        ma: '',
        trangThai: 0,
      })
      getAllMSKC(idSP)
    }
  }

  const postKichCo = async (value) => {
    const res = await postKC(value)
    if (res) {
      closeModal()
    }
  }

  const handleSubmitKC = (event) => {
    event.preventDefault()
    postKichCo(valuesCL)
  }

  const handleAddNSX = (event) => {
    event.preventDefault()
    addNSX(valuesCL)
  }

  const addNSX = (value) => {
    const res = postNSX(value)
    if (res) {
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
      closeModal()
    }
  }

  const handleDelete = (id) => {
    setIsShow(true)
    setIdCTSP(id)
  }

  const handleClose = () => {
    setIsShow(false)
  }

  const anh = async (value) => {
    const res = await addAnh(value)
    if (res) {
      toast.success('Thêm thành công')
      getAllAnh(idCTSP !== null ? idCTSP : id)
    }
  }

  const handleAddAnh = (event) => {
    event.preventDefault()

    if (file.length === 0) {
      alert('Vui lòng chọn ít nhất một tệp ảnh.')
      return
    }
    if (imageList.length >= maxImages) {
      alert('Bạn chỉ được tải lên tối đa ' + maxImages + ' ảnh.')
      return
    }
    const formData = new FormData()
    file.forEach((file) => {
      formData.append('files', file)
      formData.append('id', idCTSP !== null ? idCTSP : id)
    })

    // Gửi formData đến server để xử lý
    anh(formData)

    setFile([])
    setPreviewImages([])
    inputRef.current.value = null
  }

  const handleDeleteImage = async (idAnh) => {
    const res = await deleteAnh(idAnh)
    if (res) {
      toast.success('Xoá thành công')
      getAllAnh(idCTSP !== null ? idCTSP : id)
    }
  }

  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files)
    setFile((prevFiles) => [...prevFiles, ...newFiles])
    const newPreviewImages = newFiles.map((file) => URL.createObjectURL(file))
    setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...newPreviewImages])
  }

  const getAllAnh = async (id) => {
    const res = await listAnh(id)
    if (res) {
      setImageList(res.data)
    }
  }

  const imagePreviews = previewImages.map((previewImage) => (
    <img
      className="preview-image d-flex justify-content-around"
      src={previewImage}
      alt="Preview"
      key={previewImage}
    />
  ))

  const handleClick = () => {
    inputRef.current.click()
  }

  const [valuesCL, setValuesCL] = useState({
    ten: '',
    trangThai: 0,
  })

  const closeModal = () => {
    toast.success('Thêm thành công')
    setModalShowLSP(false)
    setModalShow(false)
    setModalShowKC(false)
    setModalShowNSX(false)
    setModalShowMS(false)
    getAllList()
    setValuesCL({
      ten: '',
      trangThai: 0,
    })
  }

  useEffect(() => {
    detail(idCTSP !== null ? idCTSP : id)
    getAllAnh(idCTSP !== null ? idCTSP : id)
  }, [idCTSP])

  const detail = async (idCTSP) => {
    const res = await detailCTSP(idCTSP)
    if (res) {
      setValues(res.data)
    }
  }

  const handleSubmitCL = (event) => {
    event.preventDefault()
    post(valuesCL)
  }

  const post = async (value) => {
    const res = await postCreate(value)
    if (res) {
      closeModal()
    }
  }

  useEffect(() => {
    getAllList()
  }, [])

  const putctsp = async (idSP, value) => {
    await putCTSP(idSP, value)
    // if (res) {
    //   navigate('/quan-ly-san-pham/chi-tiet-san-pham')
    // }
  }

  const putctspmodal = async (idCTSP, idSP, value) => {
    const res = await putCTSP(idCTSP, value)
    if (res) {
      toast.success('Thành công')
      getAllMSKC(idSP)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    listMSKC.forEach((d) => {
      // Tạo một bản sao của `values` để cập nhật
      const updatedValues = { ...values }

      // Xoá màu sắc và kích cỡ khỏi danh sách thuộc tính cần cập nhật
      delete updatedValues.mauSac
      delete updatedValues.kichCo

      // Lấy màu sắc và kích cỡ từ sản phẩm hiện tại và thêm vào `updatedValues`
      updatedValues.mauSac = d.mauSac
      updatedValues.kichCo = d.kichCo

      // Gọi hàm `putctsp` với giá trị đã được cập nhật
      putctsp(d.id, updatedValues)
    })
    toast.success('Thành công')
    navigate('/quan-ly-san-pham/san-pham')
  }

  const handleSubmitUpdate = async (event) => {
    try {
      event.preventDefault()
      await putctspmodal(idCTSP, idSP, values)
      const updatedList = await getAllByIdSP(idSP, '')
      if (updatedList && updatedList.data) {
        setListMSKC(updatedList.data)
      }
    } catch (error) {
      toast.error('Lỗi')
    }
  }

  const getAllList = async () => {
    const resCL = await getAllListCL()
    const resLSP = await getAllListLSP()
    const resNSX = await getAllListNSX()
    if (resCL || resLSP || resNSX) {
      setListCL(resCL.data)
      setListLSP(resLSP.data)
      setListNSX(resNSX.data)
    }
  }

  const handleUpdate = (id) => {
    setShowUpdate(true)
    setIdCTSP(id)
  }

  const postctsp = async (id, value) => {
    const res = await postCTSP(value)
    if (res.data === 'da ton tai') {
      toast.success('Thêm số lượng thành công')
      getAllMSKC(id)
    } else {
      toast.success('Thêm thành công')
      getAllMSKC(id)
    }
  }

  const handleSubmitAdd = async (event) => {
    event.preventDefault()
    await postctsp(idSP, values)
  }

  const handleChangeId = (id) => {
    if (idCTSP === id) {
      // toast.warning('Bạn đang xem ảnh của sản phẩm này');
    } else {
      setIdCTSP(id)
    }
  }

  function confirmDeleteImage(imageId) {
    // Sử dụng hộp thoại xác nhận
    const shouldDelete = window.confirm('Bạn có muốn xóa hình ảnh này?')
    if (shouldDelete) {
      // Gọi hàm xóa hình ảnh khi người dùng xác nhận
      handleDeleteImage(imageId)
    }
  }

  function confirmDeleteItem(itemId) {
    handleDelete(itemId)
  }

  const [qrDataURL, setQRDataURL] = useState('')

  useEffect(() => {
    const generateQRDataURL = async () => {
      if (values && values.id) {
        try {
          const dataURL = await QrCode.toDataURL(values.id)
          setQRDataURL(dataURL)
        } catch (error) {
          console.error('Error generating QR code:', error)
        }
      }
    }

    generateQRDataURL()
  }, [values])

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Cập nhật sản phẩm</strong>
        </CCardHeader>
        <CCardBody>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label" htmlFor="trang-thai">
                Tên
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên sản phẩm..."
                value={values.sanPham && values.sanPham.ten ? values.sanPham.ten : ''}
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
                <option value="1" selected={values.sanPham.trangThai === 1}>
                  Đang bán
                </option>
                <option value="0" selected={values.sanPham.trangThai === 0}>
                  Ngừng bán
                </option>
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
                  <option key={c.id} value={c.id} selected={c.id === values.chatLieu.id}>
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
                  <option key={c.id} value={c.id} selected={c.id === values.loaiSanPham.id}>
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
                  <option key={c.id} value={c.id} selected={c.id === values.nhaSanXuat.id}>
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
                value={values.sanPham && values.sanPham.moTa ? values.sanPham.moTa : ''}
                onChange={(e) =>
                  setValues({
                    ...values,
                    sanPham: { ...values.sanPham, moTa: e.target.value },
                  })
                }
              />
            </div>
            <div className="col-12 d-flex justify-content-start">
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </form>
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

      <CCard className="my-3">
        <CCardHeader>
          <strong>Thuộc tính</strong>
        </CCardHeader>
        <CCardBody>
          <div className="row">
            <div className="col-10 d-flex align-items-center justify-content-start">
              {/* <div className="col-md-2" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {qrDataURL && (
                  <img src={qrDataURL} style={{ width: '70px', height: '70px' }} alt="QR Code" />
                )}
              </div> */}
            </div>
            <div className="col-2 d-flex justify-content-end align-items-center">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  setShow(true)
                  setValues({ ...values, id: '' })
                }}
              >
                Thêm thuộc tính
              </button>
            </div>
            <div className="col-12">
              <Table hover className="table">
                <thead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>
                      Màu sắc{' '}
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
                    </th>
                    <th>
                      Kích cỡ{' '}
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
                    </th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {isLoading ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    listMSKC.map((d, i) => (
                      <tr
                        key={d.id}
                        className="text-center"
                        onClick={() => {
                          handleChangeId(d.id)
                          openModal5()
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{i + 1}</td>
                        <td
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {d.mauSac && d.kichCo ? (
                            <div
                              style={{
                                backgroundColor: d.mauSac.ten,
                                width: 50,
                                borderRadius: '10px',
                              }}
                            >
                              &nbsp;
                            </div>
                          ) : (
                            <p>Không có màu sắc nào</p>
                          )}
                        </td>
                        <td>{d.kichCo ? d.kichCo.ten : 'Chưa có kích cỡ nào'}</td>
                        <td>{d.soLuong || 0}</td>
                        <td>{d.trangThai === 1 ? 'Đang bán' : 'Ngừng bán'}</td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleUpdate(d.id)}
                            style={{ color: 'green' }}
                            className="fa-solid fa-pen-nib"
                          ></button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              confirmDeleteItem(d.id)
                            }}
                            style={{ color: 'orange' }}
                            className="fa-solid fa-trash-can mx-3"
                          ></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <Modal show={showModal5} onHide={closeModal5} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Tải Ảnh</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CCard className={`my-3 ${idCTSP !== null ? 'show' : ''}`} ref={mainCardRef}>
                      <CCardBody>
                        <form onSubmit={handleAddAnh}>
                          <div className="justify-content-center">
                            {file.length === 0 ? (
                              <span
                                role="button"
                                tabIndex={0}
                                onClick={handleClick}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleClick()
                                  }
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <img src={defaultImage} alt="" width={300} />
                              </span>
                            ) : (
                              <div>
                                <div className="image-preview-container">{imagePreviews}</div>
                              </div>
                            )}
                            <input
                              type="file"
                              id="fileInput"
                              onChange={handleImageChange}
                              ref={inputRef}
                              multiple
                              style={{ display: 'none' }}
                            />
                          </div>
                          <div className="justify-content-center">
                            {file ? file.name : 'Chọn ảnh'}
                          </div>
                          <div className="justify-content-center">
                            <button type="submit" className="btn btn-primary">
                              Tải ảnh lên
                            </button>
                          </div>
                          <div className="justify-content-center">
                            {imageList.length !== 0 && (
                              <>
                                <br />
                                <ul style={{ listStyle: 'none', padding: 0 }} className="ull">
                                  {imageList.map((image) => (
                                    <li
                                      key={image.id}
                                      style={{
                                        position: 'relative',
                                        marginBottom: '10px',
                                      }}
                                    >
                                      <img
                                        style={{
                                          width: '300px',
                                          height: '450px',
                                        }}
                                        src={`data:image/jpeg;base64,${image.tenBase64}`}
                                        alt={image.ma}
                                      />
                                      <i
                                        style={{
                                          position: 'absolute',
                                          top: '10px',
                                          right: '10px',
                                          color: 'orange',
                                          border: 'none',
                                          padding: '5px 10px',
                                          cursor: 'pointer',
                                        }}
                                        className="fa-regular fa-trash-can"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => confirmDeleteImage(image.id)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            confirmDeleteImage(image.id)
                                          }
                                        }}
                                      ></i>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </form>
                      </CCardBody>
                    </CCard>
                  </Modal.Body>
                </Modal>
              </Table>
            </div>
          </div>
        </CCardBody>
      </CCard>

      <AddMSKCCTSP
        show={show}
        onHide={() => setShow(false)}
        values={values}
        setValues={setValues}
        handleSubmit={handleSubmitAdd}
      />
      <UpdateMSKCCTSP
        show={showUpdate}
        onHide={() => setShowUpdate(false)}
        values={values}
        setValues={setValues}
        handleSubmit={handleSubmitUpdate}
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
      <ConfirmDelete
        show={isShow}
        handleClose={handleClose}
        dataDelete={idCTSP}
        getAll={getAllMSKC}
        id={idSP}
      />
    </div>
  )
}

export default UpdateSanPham
