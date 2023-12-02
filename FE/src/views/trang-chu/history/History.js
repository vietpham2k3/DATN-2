/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { useEffect } from 'react'
import { count } from '../../../service/GioHangService'
import Header from '../trangchu/Header'
import Footer from '../trangchu/Footer'
import ContentHistory from './content/ContentHistory'
function History() {
  const [productCount, setProductCount] = useState(0)
  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'))
  const idGH = localStorage.getItem('idGH') || ''

  useEffect(() => {
    if (!dataLogin) {
      const storedProductList = JSON.parse(localStorage.getItem('product'))
      if (storedProductList) {
        const totalCount = storedProductList.reduce((count, product) => count + product.soLuong, 0)
        setProductCount(totalCount)
      }
    }

    // Kiểm tra nếu idGH không tồn tại thì không gọi countSP
    if (idGH) {
      countSP(idGH)
    }
  }, [dataLogin, idGH])

  const countSP = async (id) => {
    const res = await count(id)
    if (res) {
      setProductCount(res.data)
    }
  }

  return (
    <div>
      <Header />
      <div className="content-container">
        <ContentHistory
          setProductCount={setProductCount}
          productCount={productCount}
          countSP={countSP}
          dataLogin={dataLogin}
          idGH={idGH}
        />
      </div>
      <Footer />
    </div>
  )
}

export default History
