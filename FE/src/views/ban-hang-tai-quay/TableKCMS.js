/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button, Modal } from 'react-bootstrap'
// import '../../scss/TableMSKC.scss'
import { TextField } from '@mui/material'

const TableKCMS = (props) => {
  const { handleClose, show, values, setValuesAdd, handleAdd, valuesAdd, handleDetail } = props
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chọn loại của sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: '100%' }}>
          <div className="body-add-new">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Thuộc tính
              </label>
              {values.map((d, i) => (
                <div className="form-check" key={i}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={d.id}
                    value={d.id}
                    // checked={d.id === dataDetail.id}
                    onChange={() => handleDetail(d.id, d.giaBan)}
                  />
                  <label className="form-check-label custom-label" htmlFor={d.id}>
                    <div style={{ backgroundColor: d.mauSac.ten, width: 50, borderRadius: '10px' }}>
                      &nbsp;
                    </div>
                    &nbsp;- {d.kichCo.ten} - {d.chatLieu.ten} - {d.loaiSanPham.ten} - {d.coAo.ten} -{' '}
                    {d.nhaSanXuat.ten}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <TextField
                id="standard-number"
                label="Số lượng"
                style={{ width: '100%' }}
                type="number"
                variant="standard"
                onChange={(e) =>
                  setValuesAdd({
                    ...valuesAdd,
                    hoaDonChiTiet: {
                      ...valuesAdd.hoaDonChiTiet,
                      soLuongHangDoi: parseInt(e.target.value),
                    },
                    doiHang: {
                      ...valuesAdd.doiHang,
                      soHangDoi: parseInt(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleAdd()}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TableKCMS
