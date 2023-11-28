/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React from 'react'
// import '../../scss/SearchResult.scss'
import { Table } from 'react-bootstrap'
import TableKCMS from './TableKCMS'
import { useState } from 'react'
import { useEffect } from 'react'
import { detailCTSP, getAllByIdSPTT } from '../../service/SanPhamService'
import { addSP } from '../../service/ServiceDonHang'
import { toast } from 'react-toastify'

function SearchResult(props) {
  const { result, id, getAllById, setInputValue } = props
  const [show, setShow] = useState(false)
  const [idSP, setidSP] = useState('')
  const [idCTSP, setidCTSP] = useState('')
  const [values, setValues] = useState([])
  const [dataDetail, setDataDetail] = useState({})
  const [inputDetail, setInputDetail] = useState(null)
  const [valuesAdd, setValuesAdd] = useState({
    chiTietSanPham: {
      id: '',
    },
    hoaDon: {
      id: id,
    },
    soLuong: '',
  })

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    return formatter.format(number)
  }

  const handleAddSoLuong = (id, idSP) => {
    setShow(true)
    setidSP(idSP)
    setidCTSP(id)
    setValuesAdd({ ...valuesAdd, chiTietSanPham: { id: id } })
  }

  const handleAdd = () => {
    // getAllById(id);
    if (parseInt(valuesAdd.soLuong) > parseInt(dataDetail.soLuong)) {
      toast.error('Đã vượt quá số lượng hiện có !')
      return
    } else if (parseInt(valuesAdd.soLuong) <= 0 || valuesAdd.soLuong === '') {
      toast.error('Vui lòng nhập số lượng')
      return
    }
    add(valuesAdd)
  }

  const add = async (value) => {
    const res = await addSP(value)
    try {
      if (res) {
        // handleSearchUsers();
        getAllById(id)
        toast.success('Thêm sản phẩm thành công')
        handleClose()
        setInputValue('')
      }
    } catch (error) {
      toast.error('Lỗi')
    }
  }

  const handleClose = () => {
    setShow(false)
    setInputDetail(null)
    setValuesAdd({
      chiTietSanPham: {
        id: '',
      },
      hoaDon: {
        id: id,
      },
      soLuong: '',
    })
  }

  const handleDetail = (id) => {
    setInputDetail(id)
    setidCTSP(id)
    setValuesAdd({ ...valuesAdd, chiTietSanPham: { id: id } })
  }

  useEffect(() => {
    getAllMSKC(idSP)
  }, [idSP])

  useEffect(() => {
    detail(idCTSP)
  }, [idCTSP])

  const detail = async (idCTSP) => {
    const res = await detailCTSP(idCTSP)
    if (res) {
      setDataDetail(res.data)
    }
  }

  const getAllMSKC = async (id) => {
    let res = await getAllByIdSPTT(id)
    if (res) {
      setValues(res.data)
      console.log(res.data)
    }
  }

  console.log(values)
  return (
    <div className="results-list">
      <Table hover>
        <tbody>
          {result.length > 0 ? (
            result.map((d, i) => (
              <tr
                key={i}
                onClick={() => handleAddSoLuong(d.id, d.sanPham.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <img
                    src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
                    className="product-image"
                    style={{ width: '70px', height: '100px' }}
                  />
                </td>
                <td>{d.sanPham.ma}</td>
                <td>{d.sanPham.ten}</td>
                <td>{d.soLuong || 0}</td>
                <td>{convertToCurrency(d.giaBan)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </Table>
      <TableKCMS
        show={show}
        handleClose={handleClose}
        setValuesAdd={setValuesAdd}
        values={values}
        handleAdd={handleAdd}
        valuesAdd={valuesAdd}
        handleDetail={handleDetail}
        dataDetail={dataDetail}
        inputDetail={inputDetail}
        idCTSP={idCTSP}
      ></TableKCMS>
    </div>
  )
}

export default SearchResult
