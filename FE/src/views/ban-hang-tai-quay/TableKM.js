/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import { Button, Modal } from 'react-bootstrap'

const TableKM = (props) => {
  const {
    handleClose,
    show,
    dataKM,
    convertToCurrency,
    activeIndex,
    handleDivClick,
    handleAddKM,
    formatDate,
  } = props

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chọn voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataKM.map((d, i) => (
            <div key={i} className={`row container div-container`}>
              <div
                className={`col-12 card-voucher ${activeIndex === i ? 'active' : ''}`}
                onClick={() => handleDivClick(i)}
                style={{ cursor: 'pointer' }}
              >
                <h6 style={{ color: 'red' }}>
                  Giảm {convertToCurrency(d.mucGiam)} cho đơn tối thiểu {convertToCurrency(d.tien)}
                </h6>
                <p style={{ fontSize: '13px', color: 'gray' }}>
                  HSD: {formatDate(d.thoiGianKetThuc)}
                </p>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={() => handleAddKM()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TableKM
