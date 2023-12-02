/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import '../../../../scss/Card.scss'
import { useEffect } from 'react'
import { useState } from 'react'
import InputSpinner from 'react-bootstrap-input-spinner'
import { useNavigate } from 'react-router-dom'
import { deleteSPInGH, getAllGH, postGH, updateSLGH } from '../../../../service/GioHangService'
import { updateSL } from '../../../../service/SanPhamService'
import '../../../../scss/Detail.scss'
import { toast } from 'react-toastify'

function Cart(props) {
  // const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0)
  const [check, setCheck] = useState(false)
  const [idGHCT, setIdGHCT] = useState('')
  const [productList, setProductList] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [listSP, setListSP] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [temporaryProductAfter, setTemporaryProductAfter] = useState([])
  const navigate = useNavigate()
  // eslint-disable-next-line react/prop-types
  const { setProductCount, productCount, idGH, dataLogin, countSP } = props
  const [valuesUpdateGH, setValuesUpdateGH] = useState({
    chiTietSanPham: {
      id: '',
    },
    soLuong: 1,
  })
  const hoaDonChiTietList = selectedProducts.map((product) => {
    return {
      chiTietSanPham: {
        id: product.id,
        // Các trường khác của chi tiết sản phẩm nếu cần
      },
      soLuong: product.soLuong, // Thêm số lượng
      donGia: product.soLuong * product.donGia, // Thêm giá bán
    }
  })

  useEffect(() => {
    const storedProductList = JSON.parse(localStorage.getItem('product'))
    if (storedProductList) {
      setProductList(storedProductList)
      setTemporaryProductAfter(storedProductList)
    }
  }, [])

  useEffect(() => {
    if (idGH) {
      getAll(idGH)
    }
  }, [idGH])

  useEffect(() => {
    if (check) {
      update(idGHCT, valuesUpdateGH)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesUpdateGH])

  useEffect(() => {
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0
    selectedProducts.forEach((d) => {
      sum += d.soLuong * d.donGia
    })
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum)
  }, [selectedProducts, dataLogin])

  const handleTaoHoaDon = () => {
    if (selectedProducts.length === 0) {
      toast.error('Vui lòng chọn sản phẩm trước khi thanh toán')
      return
    }
    // eslint-disable-next-line react/prop-types
    if (dataLogin && dataLogin.role === 'KH') {
      taoHoaDon('', selectedProducts)
    } else {
      taoHoaDon('', hoaDonChiTietList)
      localStorage.setItem('productAfter', JSON.stringify(temporaryProductAfter))
    }
  }

  const taoHoaDon = async (nguoiTao, value) => {
    const res = await postGH(nguoiTao, value)
    if (res || value) {
      navigate(`/checkout/${res.data}`)
    }
  }

  const putSl = async (idCTSP, soLuong) => {
    try {
      await updateSL(idCTSP, soLuong)
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }

  const getAll = async (id) => {
    try {
      const res = await getAllGH(id)
      if (res) {
        setListSP(res.data)
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }

  const update = async (id, value) => {
    try {
      const res = await updateSLGH(id, value)
      if (res) {
        countSP(idGH)
        getAll(idGH)
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }

  const handleUpdate = (e, id, soLuong, tongSoLuong, idCTSP) => {
    if (dataLogin && dataLogin.role === 'KH') {
      setIdGHCT(id)
      setCheck(true)
      setValuesUpdateGH({
        ...valuesUpdateGH,
        chiTietSanPham: {
          id: idCTSP,
        },
        soLuong: e,
      })
      const updatedSelectedProducts = selectedProducts.map((product) => {
        if (product.chiTietSanPham.id === idCTSP) {
          return {
            ...product,
            soLuong: e,
          }
        }
        return product
      })

      setSelectedProducts(updatedSelectedProducts)
    } else {
      // Lấy giá trị số lượng mới
      const newQuantity = e

      // Lấy danh sách sản phẩm từ local
      const storedProductList = JSON.parse(localStorage.getItem('product'))

      // Tìm sản phẩm tương ứng
      const productIndex = storedProductList.findIndex((product) => product.id === id)

      // Lấy số lượng hiện tại
      const currentQuantity = storedProductList[productIndex].soLuong

      // Cập nhật số lượng sản phẩm
      storedProductList[productIndex].soLuong = newQuantity
      // Lưu danh sách sản phẩm vào local
      localStorage.setItem('product', JSON.stringify(storedProductList))

      // Cập nhật danh sách sản phẩm trong state
      setProductList(storedProductList)
      const totalCount = storedProductList.reduce((count, product) => count + product.soLuong, 0)

      // Cập nhật biến productCount
      setProductCount(totalCount)

      if (newQuantity > currentQuantity) {
        storedProductList[productIndex].tongSoLuong = tongSoLuong - (newQuantity - currentQuantity)
      } else {
        storedProductList[productIndex].tongSoLuong = tongSoLuong + (currentQuantity - newQuantity)
      }

      // Lưu lại danh sách sản phẩm đã được cập nhật
      localStorage.setItem('product', JSON.stringify(storedProductList))

      // Gọi hàm để cập nhật tổng số lượng trong local storage
      putSl(id, storedProductList[productIndex].tongSoLuong)

      const updatedSelectedProducts = selectedProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            soLuong: e,
          }
        }
        return product
      })

      setSelectedProducts(updatedSelectedProducts)
    }
  }

  const deleteProductInCart = async (id) => {
    try {
      const res = await deleteSPInGH(id)
      if (res) {
        toast.success('Xoá thành công')
        getAll(idGH)
        countSP(idGH)
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }

  const handleDelete = (id, soLuong, tongSoLuong) => {
    if (dataLogin && dataLogin.role === 'KH') {
      deleteProductInCart(id)
    } else {
      putSl(id, tongSoLuong + soLuong)
      const storedData = JSON.parse(localStorage.getItem('product'))
      const updatedData = storedData.filter((item) => item.id !== id)
      setProductCount(productCount - soLuong)
      localStorage.setItem('product', JSON.stringify(updatedData))
      const storedProductList = JSON.parse(localStorage.getItem('product'))
      if (storedProductList) {
        setProductList(storedProductList)
      }
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

  const handleCheckAll = () => {
    setSelectAll(!selectAll)

    // Tùy thuộc vào trạng thái selectAll, bạn có thể cập nhật danh sách sản phẩm đã chọn
    if (selectAll) {
      setSelectedProducts([])
      setTemporaryProductAfter([...productList])
    } else {
      if (dataLogin && dataLogin.role === 'KH') {
        setSelectedProducts([...listSP])
      } else {
        setSelectedProducts([...productList])
        setTemporaryProductAfter([])
      }
    }
  }

  const handleCheckboxChange = (product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id)

    if (isSelected) {
      // Nếu đã chọn, loại bỏ sản phẩm khỏi danh sách đã chọn
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id))
      setTemporaryProductAfter([...temporaryProductAfter, product])
    } else {
      // Nếu chưa chọn, thêm sản phẩm vào danh sách đã chọn
      setSelectedProducts([...selectedProducts, product])
      setTemporaryProductAfter(temporaryProductAfter.filter((p) => p.id !== product.id))
    }
  }

  return (
    <div>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-8 mb-4">
            <div>
              <div className="col-12 d-flex justify-content-start title-gio-hang">
                <h1 style={{ fontSize: '25px' }}>Giỏ hàng</h1>
              </div>
              <div
                className="col-12"
                // style={{ paddingLeft: '25px', paddingBottom: '10px', paddingRight: '25px' }}
              >
                <table className="my-2 table">
                  <tr>
                    <td className="pb-3">
                      <input
                        className={`form-check-input`}
                        style={{ border: '1px solid black' }}
                        type="checkbox"
                        value=""
                        id="checkAll"
                        checked={selectAll}
                        onChange={handleCheckAll}
                      />
                    </td>
                    <td className="pb-3">Sản phẩm</td>
                    <td className="pb-3">&nbsp;</td>
                    <td className="pb-3">Đơn giá</td>
                    <td className="pb-3">Số lượng</td>
                    <td className="pb-3">Thành tiền</td>
                    <td className="pb-3">Action</td>
                  </tr>
                  <tbody className="table-group-divider">
                    {dataLogin
                      ? listSP.map((product, index) => (
                          <tr key={index}>
                            <td className="pt-3">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={selectedProducts.some((p) => p.id === product.id)}
                                onChange={() => handleCheckboxChange(product)}
                              />
                            </td>
                            <td className="pt-3">
                              <img
                                src={`http://localhost:8080/api/chi-tiet-san-pham/${product.chiTietSanPham.id}`}
                                className="img-cart"
                                style={{ width: '70px', height: '100px', borderRadius: '15px' }}
                              />
                            </td>
                            <td className="pt-3">
                              {product.chiTietSanPham.sanPham.ten} <br />
                              {product.chiTietSanPham.kichCo.ten} -{' '}
                              {product.chiTietSanPham.mauSac.ma}
                            </td>
                            <td className="pt-3">{convertToCurrency(product.donGia)}</td>
                            <td className="pt-3">
                              <div
                                className="input-spinner"
                                style={{
                                  display: 'flex',
                                  width: 140,
                                  justifyContent: 'center',
                                }}
                              >
                                <InputSpinner
                                  max={product.chiTietSanPham.soLuong + product.soLuong}
                                  min={1}
                                  step={1}
                                  variant={'dark'}
                                  type="real"
                                  size="sm"
                                  arrows
                                  value={product.soLuong}
                                  onChange={(e) =>
                                    handleUpdate(
                                      e,
                                      product.id,
                                      product.soLuong,
                                      product.chiTietSanPham.soLuong,
                                      product.chiTietSanPham.id,
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td className="pt-3">
                              {convertToCurrency(product.donGia * product.soLuong)}
                            </td>
                            <td className="pt-3">
                              <i
                                style={{ color: 'orange', cursor: 'pointer' }}
                                className="fa-solid fa-trash-can fa-khenh"
                                onClick={() =>
                                  handleDelete(
                                    product.id,
                                    product.soLuong,
                                    product.chiTietSanPham.soLuong,
                                  )
                                }
                              ></i>
                            </td>
                          </tr>
                        ))
                      : productList.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={selectedProducts.some((p) => p.id === product.id)}
                                onChange={() => handleCheckboxChange(product)}
                              />
                            </td>
                            <td>
                              <img
                                src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                                className="img-cart"
                                style={{ width: '70px', height: '100px', borderRadius: '15px' }}
                              />
                            </td>
                            <td>
                              {product.sanPham.ten} <br />
                              {product.kichCo.ten} -{' '}
                              <span
                                className="color-circle"
                                style={{
                                  backgroundColor: product.mauSac.ten,
                                  display: 'inline-block',
                                  verticalAlign: 'middle',
                                  height: '2px',
                                  width: '10px',
                                }}
                              ></span>
                            </td>
                            <td>{convertToCurrency(product.donGia)}</td>
                            <td>
                              <div
                                className="input-spinner"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: 140,
                                  justifyContent: 'center',
                                }}
                              >
                                <InputSpinner
                                  max={product.tongSoLuong + product.soLuong}
                                  min={1}
                                  className="input-spinner"
                                  step={1}
                                  variant={'dark'}
                                  type="real"
                                  size="md"
                                  value={product.soLuong}
                                  onChange={(e) =>
                                    handleUpdate(
                                      e,
                                      product.id,
                                      product.soLuong,
                                      product.tongSoLuong,
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td>{convertToCurrency(product.donGia * product.soLuong)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleDelete(product.id, product.soLuong, product.tongSoLuong)
                                }
                                className="fa-solid fa-trash mx-3"
                              ></button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <div className="col-12 d-flex justify-content-start title-gio-hang mb-2">
                <h1 style={{ fontSize: '25px' }}>Tổng tiền</h1>
              </div>
              <br />
              <hr className="table-group-divider" style={{ borderColor: 'black' }} />
              <div className="col-12 tong-tien-cart">
                <div className="text-total">
                  <p>
                    Tổng tiền: <strong>{convertToCurrency(totalAmount)}</strong>
                  </p>
                </div>
                <div className="btn-tt">
                  <button type="button" className="btn btn-success" onClick={handleTaoHoaDon}>
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
