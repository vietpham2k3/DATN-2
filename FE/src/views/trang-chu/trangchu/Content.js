import React from 'react'
// import { Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import '../../../scss/MauSac.scss'
// import '../../../scss/ChiTietSanPham.scss';
import { getAllBestseller, getAllSPNEW, getAllProduct } from 'service/SanPhamService'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Content() {
  const [data, setData] = useState([])
  const [productNew, setProductNew] = useState([])

  useEffect(() => {
    getAllCTSP()
    getAllSP()
  }, [])

  const getAllCTSP = async () => {
    let allProduct
    const res = await getAllBestseller()

    if (res && res.data && res.data.length > 0) {
      setData(res.data)
    } else {
      allProduct = await getAllProduct()
      setData(allProduct)
    }

    console.log(allProduct)
  }

  const getAllSP = async () => {
    const res = await getAllSPNEW()
    if (res && res.data) {
      setProductNew(res.data)
    }
  }

  const navigate = useNavigate()

  const handleDetail = (idCTSP, idSP, idMS) => {
    navigate(`/detail/${idCTSP}/${idSP}/${idMS}`)
    localStorage.setItem('idMS', idMS)
  }

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    return formatter.format(number)
  }

  return (
    <>
      <section className="product">
        <div className="container">
          <div style={{ display: 'flex', paddingLeft: 17, paddingTop: 30 }}>
            <h1 className="title">Sản Phẩm Mới Nhất</h1>
          </div>
          <div style={{ paddingLeft: 10, paddingRight: 10, color: 'red' }}>
            <hr></hr>
          </div>
          <div className="row">
            {productNew.slice(0, 8).map((product, i) => {
              return (
                <div
                  style={{ paddingTop: 35 }}
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item"
                  key={i}
                >
                  <Card
                    className="product-card"
                    onClick={() => handleDetail(product.id, product.sanPham.id, product.mauSac.id)}
                    style={{ width: '260px', height: '400px' }}
                  >
                    <Card.Img
                      style={{ textAlign: 'center', width: '260px', height: '300px' }}
                      src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                    />
                    <Card.Body>
                      <Card.Title>{product.sanPham.ten}</Card.Title>
                      <Card.Text>
                        <span style={{ color: 'red' }}>{convertToCurrency(product.giaBan)}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        <div className="container">
          <div style={{ display: 'flex', paddingLeft: 17, paddingTop: 30 }}>
            <h1 className="title">Sản Phẩm Bán Chạy</h1>
          </div>
          <div style={{ paddingLeft: 10, paddingRight: 10, color: 'red' }}>
            <hr></hr>
          </div>
          <div className="row">
            {Array.isArray(data) &&
              data.slice(0, 8).map((product, index) => {
                return (
                  <div
                    style={{ paddingTop: 35 }}
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item"
                    key={index}
                  >
                    <Card
                      className="product-card"
                      onClick={() =>
                        handleDetail(product.id, product.sanPham.id, product.mauSac.id)
                      }
                      style={{ width: '260px', height: '400px' }}
                    >
                      <Card.Img
                        style={{ textAlign: 'center', width: '260px', height: '300px' }}
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                      />
                      <Card.Body>
                        <Card.Title>{product.sanPham.ten}</Card.Title>
                        <Card.Text>
                          <span style={{ color: 'red' }}>{convertToCurrency(product.giaBan)}</span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Content
