/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../../../scss/AddQuickly.scss'
import { getAllListMS, getAllListKC } from '../../../service/SanPhamService'
import { useState } from 'react'
import { useEffect } from 'react'

function AddMSKCCTSP(props) {
  const { onHide, handleSubmit, values, setValues } = props
  const [listMS, setListMS] = useState([])
  const [listKC, setListLC] = useState([])

  useEffect(() => {
    getAllList()
  }, [])

  const getAllList = async () => {
    const resMS = await getAllListMS()
    const resKC = await getAllListKC()
    if (resMS || resKC) {
      setListMS(resMS.data)
      setListLC(resKC.data)
    }
  }

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thêm thuộc tính</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <div className="form-inline">
              <label style={{ fontWeight: 'bold' }} className="form-label me-3">
                Màu sắc:{' '}
              </label>
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
          </div>
          <div className="col-12">
            <div className="form-inline">
              <label style={{ fontWeight: 'bold' }} className="form-label me-3">
                Kích cỡ:{' '}
              </label>
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
          </div>
          <div className="col-12">
            <div className="form-inline">
              <label style={{ fontWeight: 'bold' }} className="form-label me-3">
                Số lượng:{' '}
              </label>
              <div className="form-check form-check-inline">
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
            </div>
          </div>
          <div className="col-12">
            <div className="form-inline">
              <label style={{ fontWeight: 'bold' }} className="form-label me-3">
                Trạng thái:{' '}
              </label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio1"
                  defaultValue={values.trangThai}
                  checked={values.trangThai === 1}
                  onChange={() => setValues({ ...values, trangThai: 1 })}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Đang bán
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  defaultValue={values.trangThai}
                  checked={values.trangThai === 0}
                  onChange={() => setValues({ ...values, trangThai: 0 })}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Ngừng bán
                </label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <Button type="submit" className="btn btn-primary" onClick={onHide}>
              Thêm thuộc tính
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddMSKCCTSP
