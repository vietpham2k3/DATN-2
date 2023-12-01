/* eslint-disable no-dupe-keys */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { detailCTSP, getAllProduct } from 'service/SanPhamService'
// import { postGH } from 'services/GioHangService';
import { Card, Image } from 'react-bootstrap'
import '../../../scss/Detail.scss'
import '../../../scss/MauSac.scss'
import InputSpinner from 'react-bootstrap-input-spinner'
// import { getAllByIdSP } from '../../services/SanPhamService';
import {
  getAllKCByIdMSAndIdSP,
  getAllMSByIdSP,
  findAllAnhByIdMSAndIdSP,
} from 'service/ServiceDonHang'
import { Button } from 'rsuite'
import { toast } from 'react-toastify'
import { themGioHang } from 'service/GioHangService'
function Detail(props) {
  const { id, idSP, idMS } = useParams()
  const [product, setProduct] = useState(null)
  const [data, setData] = useState([])
  const [imageList, setImageList] = useState([])
  const [val, setVal] = useState(0)
  const [idCTSP, setIdCTSP] = useState(0)
  const [listKC, setListKC] = useState([])
  const [listMS, setListMS] = useState([])
  // const [detailProduct, setDetailProduct] = useState(null);
  // const [check, setCheck] = useState(false);
  // const [listSanPham, setListSanPham] = useState([]);
  const [selectedIdMSSP, setSelectedIdMSSP] = useState('')
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  // ms kc
  const [activeIdKCMaMau, setActiveIdKCMaMau] = useState('')
  // eslint-disable-next-line react/prop-types
  const { countSP, idGH } = props
  const [valuesHDCT, setValuesHDCT] = useState([])
  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'))
  const [valuesAddGH, setValuesAddGH] = useState({
    chiTietSanPham: {
      id: '',
    },
    soLuong: 1,
  })

  useEffect(() => {
    fetchProductDetail(idCTSP === 0 ? id : idCTSP)
    setValuesHDCT([
      {
        chiTietSanPham: {
          id: idCTSP === 0 ? id : idCTSP,
          // Các trường khác của chi tiết sản phẩm nếu cần
        },
        soLuong: quantity, // Thêm số lượng
        donGia: quantity * (product && product.giaBan), // Thêm giá bán
      },
    ])
  }, [idCTSP])

  // useEffect(() => {
  //   if (check) {
  //     fetchProductDetail(idCTSP);
  //   }
  // }, [check]);

  useEffect(() => {
    getAllCTSP()

    JSON.parse(localStorage.getItem('product'))
  }, [])

  useEffect(() => {
    // getAllMSKC(idSP);
    getAllMS(idSP)
    // console.log(idSP);
  }, [idSP])

  useEffect(() => {
    if (idGH) {
      countSP(idGH)
    }
  }, [idGH])

  useEffect(() => {
    getAllKC(idMS, idSP)
    getAllAnh(idMS, idSP)
    // console.log(idSP);
  }, [idMS, idSP])

  const handleClick = (index) => {
    setVal(index + 1)
  }

  // const handleNext = () => {
  //   let nextVal = val + 1
  //   if (nextVal >= imageList.length + 1) {
  //     nextVal = 0
  //   }
  //   setVal(nextVal)
  //   const thumbnailContainer = thumbnailContainerRef.current
  //   const thumbnailWidth = thumbnailContainer.offsetWidth / imageList.length
  //   const scrollLeft = thumbnailWidth * nextVal
  //   thumbnailContainer.scrollTo({
  //     left: scrollLeft,
  //     behavior: 'smooth',
  //   })
  //   console.log(idMStest)
  // }

  // const handlePrevious = () => {
  //   let prevVal = val - 1
  //   if (prevVal < 0) {
  //     prevVal = imageList.length
  //   }
  //   setVal(prevVal)
  //   const thumbnailContainer = thumbnailContainerRef.current
  //   const thumbnailWidth = thumbnailContainer.offsetWidth / imageList.length
  //   const scrollLeft = thumbnailWidth * prevVal
  //   thumbnailContainer.scrollTo({
  //     left: scrollLeft,
  //     behavior: 'smooth',
  //   })
  // }

  const handleClick2 = (idCTSP, idKCMS) => {
    setActiveIdKCMaMau(idKCMS)
    setIdCTSP(idCTSP)
    // setDetailProduct(product);

    setValuesAddGH({ ...valuesAddGH, chiTietSanPham: { id: idCTSP } })
  }

  const getAllKC = async (idMS, idSP) => {
    try {
      const res = await getAllKCByIdMSAndIdSP(idMS, idSP)
      if (res && res.data) {
        setListKC(res.data)
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }

  // const putSl = async (idCTSP, soLuong) => {
  //   try {
  //     await updateSL(idCTSP, soLuong);
  //   } catch (error) {
  //     // Xử lý lỗi nếu cần
  //   }
  // };

  const getAllMS = async (id) => {
    const res = await getAllMSByIdSP(id)
    if (res && res.data) {
      setListMS(res.data)
    }
  }

  const handleChangeId = (idCTSP, idSP, idMS, idMSSP) => {
    setSelectedIdMSSP(idMSSP)
    if (idSP === id) {
      toast.warning('Bạn đang xem ảnh của sản phẩm này')
    } else {
      navigate(`/chi-tiet-sp/${idCTSP}/${idSP}/${idMS}`)
      // localStorage.setItem("idMS",idMS);
      getAllAnh(idMS, idSP)
      setVal(0)
      // setDetailProduct(null);
      setActiveIdKCMaMau('')
      // console.log(id);
    }
  }

  const getAllCTSP = async () => {
    const res = await getAllProduct()
    if (res && res.data) {
      setData(res.data)
    }
  }

  const getAllAnh = async (idMS, idSP) => {
    const res = await findAllAnhByIdMSAndIdSP(idMS, idSP)
    if (res && res.data) {
      setImageList(res.data)
      setVal(0)
    }
  }

  const fetchProductDetail = async (id) => {
    try {
      const response = await detailCTSP(id)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching product detail:', error)
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

  if (!product) {
    return <div>Loading...</div>
  }

  const handleDetail = (idCTSP, idSP, idMS) => {
    navigate(`/chi-tiet-sp/${idCTSP}/${idSP}/${idMS}`)
    localStorage.setItem('idMS', idMS)
  }

  // const handleTaoHoaDon = () => {
  //   if (!dataLogin) {
  //     navigate('/login')
  //     return
  //   }
  //   taoHoaDon('', valuesHDCT)
  // }

  // const taoHoaDon = async (nguoiTao, value) => {
  //   const res = await postGH(nguoiTao, value)
  //   if (res) {
  //     navigate(`/checkoutquick/${res.data}`)
  //   }
  // }

  const addSPToGH = async (id, value) => {
    try {
      const res = await themGioHang(id, value)
      if (res) {
        toast.success('Thành công')
        localStorage.setItem('idGH', res.data.gioHang.id)
        countSP(idGH)
      }
    } catch (error) {
      toast.error('Vui lòng chọn sản phẩm')
    }
  }

  const handleAddToCartGH = () => {
    if (!dataLogin) {
      navigate('/login')
      return
    }
    addSPToGH(dataLogin.id, valuesAddGH)
  }

  return (
    <div className="container">
      <br></br>
      <div className="card">
        <div className="container-fliud">
          <br></br>

          <div className="wrapper row">
            <div style={{ paddingLeft: 80 }} className="details col-md-6">
              <h3 className="product-title">{product.sanPham.ten}</h3>
              <h3>
                <p
                  style={{ color: 'red', fontWeight: 'bold', fontSize: '30px', lineHeight: '30px' }}
                >
                  {' '}
                  {convertToCurrency(product.giaBan)}
                </p>
              </h3>
              <br></br>
              <div>
                <div style={{ display: 'flex' }}>
                  <p
                    style={{
                      fontSize: 17,
                      marginTop: 8,
                    }}
                  >
                    Màu sắc:
                  </p>
                  {listMS.map((d) => {
                    const colorData = d.split(',')
                    const id = colorData[0]
                    const color = colorData[1]
                    const idCTSP = colorData[2]
                    const idSP = colorData[3]

                    const idMSSP = `${id}-${idSP}`

                    return (
                      <div style={{ marginLeft: 15, height: 30 }} key={id}>
                        <Button
                          className="custom-button"
                          onClick={() => {
                            handleChangeId(idCTSP, idSP, id, idMSSP)
                          }}
                          style={{
                            border: idMSSP === selectedIdMSSP ? '2px solid red' : '',
                            background: idMSSP === selectedIdMSSP ? 'white' : '',
                            width: 85,
                            borderRadius: '3px',
                            cursor: 'pointer',
                            height: 32,
                          }}
                          tabIndex={0}
                        >
                          {color}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
              <br></br>
              <div>
                <div style={{ display: 'flex' }}>
                  <p
                    style={{
                      fontSize: 17,
                      marginTop: 8,
                    }}
                  >
                    Kích cỡ:
                  </p>
                  {listKC.map((d) => {
                    const sizeData = d.split(',')
                    const size = sizeData[0]
                    const idCTSP = sizeData[1]
                    const idMS = sizeData[2]
                    const soLuong = sizeData[4]
                    const idKC = sizeData[5]

                    const idKCMS = `${idKC}-${idMS}`

                    return (
                      <div style={{ marginLeft: 15, marginBottom: 15 }} key={d.id}>
                        <Button
                          className="custom-button"
                          appearance="ghost"
                          onClick={() => handleClick2(idCTSP, idKCMS)}
                          style={{
                            backgroundColor: idKCMS === activeIdKCMaMau ? 'aqua' : 'transparent',
                            color: idKCMS === activeIdKCMaMau ? 'black' : 'black',
                            border: idKCMS === activeIdKCMaMau ? '1px solid red' : '',
                          }}
                          disabled={soLuong === '0'}
                        >
                          {size}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
              <br></br>

              <div className="product-count">
                <p
                  style={{
                    paddingTop: 12,
                    paddingRight: 15,
                    fontSize: 17,
                  }}
                >
                  Số lượng:{' '}
                </p>
                <div style={{ width: 128 }}>
                  <InputSpinner
                    max={product.soLuong}
                    min={1}
                    step={1}
                    value={quantity}
                    onChange={(value) => {
                      setQuantity(value)
                      // Tạo một bản sao của mảng valuesHDCT
                      const updatedValuesHDCT = [...valuesHDCT]
                      // Cập nhật giá trị soLuong trong phần tử đầu tiên của mảng
                      updatedValuesHDCT[0].soLuong = value
                      setValuesHDCT(updatedValuesHDCT)

                      setValuesAddGH({ ...valuesAddGH, soLuong: value })
                    }}
                    variant={'dark'}
                    type="real"
                    size="sm"
                    arrows
                  />

                  {product.soLuong <= 10 ? (
                    <span style={{ color: 'red' }}>Còn lại: {product.soLuong}</span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="action">
                <button
                  className="add-to-cart2 btn btn-default"
                  type="button"
                  onClick={handleAddToCartGH}
                >
                  <i className="fa-solid fa-cart-plus"></i> {''}|{''} Thêm vào giỏ
                </button>
                {/* <button className="add-to-cart1 btn btn-default" type="button" onClick={handleTaoHoaDon}>
                  Mua Ngay
                </button> */}
              </div>
              <br></br>
            </div>

            <div
              className="col-md-6 row"
              style={{ backgroundColor: 'rgb(255, 255, 255)', marginTop: 10, marginBottom: 40 }}
            >
              <div className="col-8">
                <Image
                  src={
                    val === 0
                      ? `data:image/jpeg;base64,${imageList[0] && imageList[0].tenBase64}`
                      : `data:image/jpeg;base64,${imageList[val - 1].tenBase64}`
                  }
                  className="anh1"
                />
              </div>

              <div
                style={{ paddingLeft: 28, maxHeight: 450, overflowY: 'scroll' }}
                className="col-4"
              >
                {imageList.map((image, index) => (
                  <div style={{ paddingTop: 8 }} className="" key={image.id}>
                    <Image
                      className={index === 0 ? 'anh2 clicked' : 'anh2'}
                      src={`data:image/jpeg;base64,${image.tenBase64}`}
                      onClick={() => handleClick(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1
        style={{
          fontStyle: 'inherit',
          fontWeight: 'bold',
          paddingTop: 30,
          color: 'black',
          fontWeight: 'inherit',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Mô tả sản phẩm
      </h1>
      <hr></hr>
      <p style={{ fontWeight: 'inherit', paddingBottom: 10 }}>{product.sanPham.moTa}</p>

      <section className="product">
        <h1
          className="title"
          style={{ padding: 10, fontSize: 30, fontWeight: 'bold', color: 'black' }}
        >
          Sản phẩm khác tương tự
        </h1>
        <hr></hr>
        <div className="container">
          <div className="row">
            {data.slice(0, 8).map((product, index) => {
              return (
                <div
                  style={{ paddingTop: 20 }}
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item"
                  key={index}
                >
                  <div
                    className="product-card"
                    onClick={() => handleDetail(product.id, product.sanPham.id, product.mauSac.id)}
                    style={{ width: '260px', height: '400px', border: '1px solid gray' }}
                  >
                    <Card.Img
                      style={{ textAlign: 'center', width: '260px', height: '300px' }}
                      src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                    />
                    <Card.Body style={{ textAlign: 'center' }}>
                      <Card.Title>{product.sanPham.ten}</Card.Title>
                      <Card.Text>
                        <span>{convertToCurrency(product.giaBan)}</span>
                      </Card.Text>
                    </Card.Body>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Detail
