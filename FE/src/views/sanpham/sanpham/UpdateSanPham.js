/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import { Card } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import {
  getAllListCL,
  getAllListCO,
  getAllListLSP,
  getAllListNSX,
  putCTSP,
  detailCTSP,
  listAnh,
  deleteAnh,
  addAnh,
  getAllByIdSP,
  postCTSP
} from 'services/SanPhamService';
import { useEffect } from 'react';
import '../../scss/SanPham.scss';
import '../../scss/UpdateSanPham.scss';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { postCreate } from 'services/ServiceChatLieu';
import { postCreate as postCa } from 'services/ServiceCoAo';
import { add } from 'services/LoaiSanPhamService';
import { postNSX } from 'services/NhaSanXuatService';
import MyVerticallyCenteredModal from './AddQuicklyChatLuong';
import AddMSKCCTSP from './AddMSKCCTSP';
import { useRef } from 'react';
import defaultImage from '../../assets/images/default-placeholder.png';
import { Table } from 'react-bootstrap';
import ConfirmDelete from './ConfirmDelete';
import UpdateMSKCCTSP from './UpdateMSKCCTSP';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import AddMauSac from './AddQuicklyMauSac';
import { postMS } from 'services/ServiceMauSac';
import QrCode from 'qrcode';

function UpdateSanPham() {
  const [listCL, setListCL] = useState([]);
  const [listNSX, setListNSX] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listCA, setListCA] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [modalShowCA, setModalShowCA] = useState(false);
  const [modalShowLSP, setModalShowLSP] = useState(false);
  const [modalShowNSX, setModalShowNSX] = useState(false);
  const [modalShowKC, setModalShowKC] = useState(false);
  const [modalShowMS, setModalShowMS] = useState(false);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const { id, idSP } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [listMSKC, setListMSKC] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [idCTSP, setIdCTSP] = useState(null);
  const mainCardRef = useRef(null);
  const maxImages = 5;

  const [values, setValues] = useState({
    chatLieu: {
      id: ''
    },
    sanPham: {
      ten: '',
      moTa: ''
    },
    loaiSanPham: {
      id: ''
    },
    nhaSanXuat: {
      id: ''
    },
    coAo: {
      id: ''
    },
    soLuong: '',
    giaBan: '',
    trangThai: 1
  });

  useEffect(() => {
    getAllMSKC(idSP);
  }, [idSP]);

  const getAllMSKC = async (id) => {
    try {
      const res = await getAllByIdSP(id);
      if (res && res.data) {
        setListMSKC(res.data);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMS = (event) => {
    event.preventDefault();
    addMS(valuesCL);
  };

  const addMS = (value) => {
    const res = postMS(value);
    if (res) {
      closeModal();
    }
  };

  const handleAddNSX = (event) => {
    event.preventDefault();
    addNSX(valuesCL);
  };

  const addNSX = (value) => {
    const res = postNSX(value);
    if (res) {
      closeModal();
    }
  };

  const handleAddLSP = (event) => {
    event.preventDefault();
    addLSP(valuesCL);
  };

  const addLSP = (value) => {
    const res = add(value);
    if (res) {
      closeModal();
    }
  };

  const handleDelete = (id) => {
    setIsShow(true);
    setIdCTSP(id);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const anh = async (value) => {
    const res = await addAnh(value);
    if (res) {
      toast.success('Thêm thành công');
      getAllAnh(idCTSP !== null ? idCTSP : id);
    }
  };

  const handleAddAnh = (event) => {
    event.preventDefault();

    if (file.length === 0) {
      alert('Vui lòng chọn ít nhất một tệp ảnh.');
      return;
    }
    if (imageList.length >= maxImages) {
      alert('Bạn chỉ được tải lên tối đa ' + maxImages + ' ảnh.');
      return;
    }
    const formData = new FormData();
    file.forEach((file) => {
      formData.append('files', file);
      formData.append('id', idCTSP !== null ? idCTSP : id);
    });

    // Gửi formData đến server để xử lý
    anh(formData);

    setFile([]);
    setPreviewImages([]);
    inputRef.current.value = null;
  };

  const handleDeleteImage = async (idAnh) => {
    const res = await deleteAnh(idAnh);
    if (res) {
      toast.success('Xoá thành công');
      getAllAnh(idCTSP !== null ? idCTSP : id);
    }
  };

  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFile((prevFiles) => [...prevFiles, ...newFiles]);
    const newPreviewImages = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...newPreviewImages]);
  };

  const getAllAnh = async (id) => {
    const res = await listAnh(id);
    if (res) {
      setImageList(res.data);
    }
  };

  const imagePreviews = previewImages.map((previewImage) => (
    <img className="preview-image d-flex justify-content-around" src={previewImage} alt="Preview" key={previewImage} />
  ));

  const handleClick = () => {
    inputRef.current.click();
  };

  const [valuesCL, setValuesCL] = useState({
    ten: '',
    trangThai: 0
  });

  const closeModal = () => {
    toast.success('Thêm thành công');
    setModalShowCA(false);
    setModalShowLSP(false);
    setModalShow(false);
    setModalShowNSX(false);
    getAllList();
    setValuesCL({
      ten: '',
      trangThai: 0
    });
  };

  const handleSubmitCA = (event) => {
    event.preventDefault();
    postCA(valuesCL);
  };

  useEffect(() => {
    detail(idCTSP !== null ? idCTSP : id);
    getAllAnh(idCTSP !== null ? idCTSP : id);
  }, [idCTSP]);

  const detail = async (idCTSP) => {
    const res = await detailCTSP(idCTSP);
    if (res) {
      setValues(res.data);
    }
  };

  const postCA = async (value) => {
    const res = await postCa(value);
    if (res) {
      closeModal();
    }
  };

  const handleSubmitCL = (event) => {
    event.preventDefault();
    post(valuesCL);
  };

  const post = async (value) => {
    const res = await postCreate(value);
    if (res) {
      closeModal();
    }
  };

  useEffect(() => {
    getAllList();
  }, []);

  const putctsp = async (idSP, value) => {
    const res = await putCTSP(idSP, value);
    if (res) {
      navigate('/san-pham/chi-tiet-san-pham');
    }
  };

  const putctspmodal = async (idCTSP, idSP, value) => {
    const res = await putCTSP(idCTSP, value);
    if (res) {
      toast.success('Thành công');
      getAllMSKC(idSP);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    listMSKC.forEach((d) => {
      // Tạo một bản sao của `values` để cập nhật
      const updatedValues = { ...values };

      // Xoá màu sắc và kích cỡ khỏi danh sách thuộc tính cần cập nhật
      delete updatedValues.mauSac;
      delete updatedValues.kichCo;

      // Lấy màu sắc và kích cỡ từ sản phẩm hiện tại và thêm vào `updatedValues`
      updatedValues.mauSac = d.mauSac;
      updatedValues.kichCo = d.kichCo;

      // Gọi hàm `putctsp` với giá trị đã được cập nhật
      putctsp(d.id, updatedValues);
    });
    toast.success('Thành công');
  };

  const handleSubmitUpdate = async (event) => {
    try {
      event.preventDefault();
      await putctspmodal(idCTSP, idSP, values);
      const updatedList = await getAllByIdSP(idSP, '');
      if (updatedList && updatedList.data) {
        setListMSKC(updatedList.data);
      }
    } catch (error) {
      toast.error('Lỗi');
    }
  };

  const getAllList = async () => {
    const resCL = await getAllListCL();
    const resLSP = await getAllListLSP();
    const resCA = await getAllListCO();
    const resNSX = await getAllListNSX();
    if (resCL || resLSP || resCA || resNSX) {
      setListCL(resCL.data);
      setListCA(resCA.data);
      setListLSP(resLSP.data);
      setListNSX(resNSX.data);
    }
  };

  const handleUpdate = (id) => {
    setShowUpdate(true);
    setIdCTSP(id);
  };

  const postctsp = async (id, value) => {
    const res = await postCTSP(value);
    if (res.data === 'da ton tai') {
      toast.success('Thêm số lượng thành công');
      getAllMSKC(id);
    } else {
      toast.success('Thêm thành công');
      getAllMSKC(id);
    }
  };

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    await postctsp(idSP, values);
  };

  const handleChangeId = (id) => {
    if (idCTSP === id) {
      // toast.warning('Bạn đang xem ảnh của sản phẩm này');
    } else {
      setIdCTSP(id);
    }
  };

  function confirmDeleteImage(imageId) {
    // Sử dụng hộp thoại xác nhận
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa hình ảnh này?');
    if (shouldDelete) {
      // Gọi hàm xóa hình ảnh khi người dùng xác nhận
      handleDeleteImage(imageId);
    }
  }

  function confirmDeleteItem(itemId) {
    handleDelete(itemId);
  }

  const [qrDataURL, setQRDataURL] = useState('');

  useEffect(() => {
    const generateQRDataURL = async () => {
      if (values && values.id) {
        try {
          const dataURL = await QrCode.toDataURL(values.id);
          setQRDataURL(dataURL);
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    };

    generateQRDataURL();
  }, [values]);

  return (
    <div>
      <MainCard>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-8">
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
                  sanPham: { ...values.sanPham, ten: e.target.value }
                })
              }
            />
          </div>
          <div className="col-md-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {qrDataURL && <img src={qrDataURL} style={{ width: '70px', height: '70px' }} alt="QR Code" />}
          </div>

          <div className="col-md-12">
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
                  sanPham: { ...values.sanPham, moTa: e.target.value }
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
                Kinh doanh
              </option>
              <option value="0" selected={values.sanPham.trangThai === 0}>
                Ngừng kinh doanh
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
                    setModalShow(true);
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
                    id: e.target.value
                  }
                });
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
                    setModalShowLSP(true);
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
                    id: e.target.value
                  }
                });
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
            <label className="form-label me-3" htmlFor="trang-thai6s">
              Cổ áo:{' '}
              <span
                role="button"
                tabIndex={0}
                className="fa-solid"
                onClick={() => setModalShowCA(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setModalShowCA(true);
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
                  coAo: {
                    id: e.target.value
                  }
                });
              }}
            >
              {listCA.map((c) => (
                <option key={c.id} value={c.id} selected={c.id === values.coAo.id}>
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
                    setModalShowNSX(true);
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
                    id: e.target.value
                  }
                });
              }}
            >
              {listNSX.map((c) => (
                <option key={c.id} value={c.id} selected={c.id === values.nhaSanXuat.id}>
                  {c.ten}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Update
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
          show={modalShowCA}
          onHide={() => setModalShowCA(false)}
          handleSubmit={handleSubmitCA}
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
      </MainCard>
      <MainCard className="my-3">
        <div className="row">
          <div className="col-10 d-flex align-items-center justify-content-start">
            <h2>Thuộc tính</h2>
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                setShow(true);
                setValues({ ...values, id: '' });
              }}
            >
              Thêm thuộc tính
            </button>
          </div>
          <div className="col-12">
            <Table hover className="my-4">
              <thead>
                <tr className="text-center">
                  <th>
                    <OverlayTrigger overlay={<Tooltip>Ấn vào đây thì sẽ bay acc fb :)</Tooltip>}>
                      <Button variant="" style={{ border: 'none' }}>
                        <strong>#</strong>
                      </Button>
                    </OverlayTrigger>
                  </th>
                  <th>
                    <OverlayTrigger overlay={<Tooltip>Thêm nhanh màu sắc ở đây</Tooltip>}>
                      <Button variant="" style={{ border: 'none' }} onClick={() => setModalShowMS(true)}>
                        <strong>Màu sắc</strong>
                      </Button>
                    </OverlayTrigger>
                  </th>
                  <th>
                    <OverlayTrigger overlay={<Tooltip>Thêm nhanh kích cỡ ở đây</Tooltip>}>
                      <Button variant="" style={{ border: 'none' }} onClick={() => setModalShowKC(true)}>
                        <strong>Kích cỡ</strong>
                      </Button>
                    </OverlayTrigger>
                  </th>
                  <th>
                    <OverlayTrigger overlay={<Tooltip>Ấn vào đây thì sẽ bay acc fb :)</Tooltip>}>
                      <Button variant="" style={{ border: 'none' }}>
                        <strong>Số lượng</strong>
                      </Button>
                    </OverlayTrigger>
                  </th>{' '}
                  <th>
                    <OverlayTrigger overlay={<Tooltip>Ấn vào đây thì sẽ bay acc fb :)</Tooltip>}>
                      <Button variant="" style={{ border: 'none' }}>
                        <strong>Trạng thái</strong>
                      </Button>
                    </OverlayTrigger>
                  </th>
                  <th>
                    <OverlayTrigger overlay={<Tooltip>Ấn vào đây thì sẽ bay acc fb :)</Tooltip>}>
                      <Button variant="" style={{ border: 'none' }}>
                        <strong>Action</strong>
                      </Button>
                    </OverlayTrigger>
                  </th>
                </tr>
              </thead>
              <tbody>
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
                        handleChangeId(d.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{i + 1}</td>
                      <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {d.mauSac && d.kichCo ? (
                          <div style={{ backgroundColor: d.mauSac.ten, width: 50, borderRadius: '10px' }}>&nbsp;</div>
                        ) : (
                          <p>Chưa có màu sắc nào</p>
                        )}
                      </td>
                      <td>{d.kichCo ? d.kichCo.ten : 'Chưa có kích cỡ nào'}</td>
                      <td>{d.soLuong || 0}</td>
                      <td>{d.trangThai === 1 ? 'Kinh doanh' : 'Ngừng kinh doanh'}</td>
                      <td>
                        <button onClick={() => handleUpdate(d.id)} className="fa-solid fa-pen"></button>
                        <button onClick={() => confirmDeleteItem(d.id)} className="fa-solid fa-trash mx-3"></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </MainCard>
      <MainCard className={`my-3 ${idCTSP !== null ? 'show' : ''}`} ref={mainCardRef}>
        <form onSubmit={handleAddAnh}>
          <div className="justify-content-center">
            {file.length === 0 ? (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleClick();
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
            <input type="file" id="fileInput" onChange={handleImageChange} ref={inputRef} multiple style={{ display: 'none' }} />
          </div>
          <div className="justify-content-center">{file ? file.name : 'Chọn ảnh'}</div>
          <div className="justify-content-center">
            <button type="submit" className="btn btn-primary">
              Tải ảnh
            </button>
          </div>
          <h1 className="justify-content-center">Danh sách ảnh</h1>
          <div className="justify-content-center">
            {imageList.length === 0 ? (
              <h1>Không có ảnh</h1>
            ) : (
              <>
                <br />
                <ul style={{ listStyle: 'none', padding: 0 }} className="ull">
                  {imageList.map((image) => (
                    <li
                      key={image.id}
                      style={{
                        position: 'relative',
                        marginBottom: '10px'
                      }}
                    >
                      <img style={{ width: '300px', height: '450px' }} src={`data:image/jpeg;base64,${image.tenBase64}`} alt={image.ma} />
                      <i
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          color: 'red',
                          border: 'none',
                          padding: '5px 10px',
                          cursor: 'pointer'
                        }}
                        className="fa-solid fa-trash"
                        role="button"
                        tabIndex={0}
                        onClick={() => confirmDeleteImage(image.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            confirmDeleteImage(image.id);
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
      </MainCard>
      <AddMSKCCTSP show={show} onHide={() => setShow(false)} values={values} setValues={setValues} handleSubmit={handleSubmitAdd} />
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
        handleSubmit={handleSubmit}
        values={valuesCL}
        setValues={setValuesCL}
      />
      <AddMauSac
        show={modalShowMS}
        onHide={() => setModalShowMS(false)}
        handleSubmit={handleAddMS}
        values={valuesCL}
        setValues={setValuesCL}
      />
      <ConfirmDelete show={isShow} handleClose={handleClose} dataDelete={idCTSP} getAll={getAllMSKC} id={idSP} />
    </div>
  );
}

export default UpdateSanPham;
