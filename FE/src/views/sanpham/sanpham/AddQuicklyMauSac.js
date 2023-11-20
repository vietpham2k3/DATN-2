/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputColor from 'react-input-color';
import '../../scss/AddQuickly.scss';
import { useState } from 'react';

function AddMauSac(props) {
  const [color, setColor] = useState({ r: 94, g: 114, b: 228, a: 1 }); // Giá trị màu mặc định
  const { onHide, handleSubmit, values, setValues } = props;

  const handleColorChange = (newColor) => {
    setColor(newColor); // Cập nhật giá trị màu từ bảng màu
    // setMa(newColor.hex); // Cập nhật giá trị 'ma' từ bảng màu
    setValues({ ...values, ten: newColor.hex });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thêm nhanh</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <span style={{ fontWeight: 'bold' }} className="form-label">
              Mã Màu:{' '}
            </span>
            <br></br>
            <InputColor initialValue={values && values.ten} onChange={handleColorChange} placement="right" />
            <div
              style={{
                width: 300,
                height: 300,
                marginTop: 20,
                backgroundColor: color && color.rgba
              }}
            />
          </div>
          <div className="col-6">
            <div className="form-inline">
              <label style={{ fontWeight: 'bold' }} className="form-label me-3">
                Trạng thái:
              </label>{' '}
              <br />
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="0"
                  checked={true}
                  onChange={() => setValues({ ...values, trangThai: 0 })}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Kích hoạt
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input pb-2"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="1"
                  onChange={() => setValues({ ...values, trangThai: 1 })}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Ngừng kích hoạt
                </label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <Button type="submit" className="btn btn-primary" onClick={onHide}>
              Thêm
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddMauSac;
