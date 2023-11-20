/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../scss/AddQuickly.scss';
import { getAllListMS, getAllListKC } from 'services/SanPhamService';
import { useState } from 'react';
import { useEffect } from 'react';

function UpdateMSKCCTSP(props) {
  const { onHide, handleSubmit, values, setValues } = props;
  const [listMS, setListMS] = useState([]);
  const [listKC, setListLC] = useState([]);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async () => {
    const resMS = await getAllListMS();
    const resKC = await getAllListKC();
    if (resMS || resKC) {
      setListMS(resMS.data);
      setListLC(resKC.data);
    }
  };

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
              {listMS.map((d, i) => (
                <div key={i} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="1"
                    id={d.id}
                    value={d.id}
                    checked={values && values.mauSac && d.id === values.mauSac.id}
                    onChange={() =>
                      setValues({
                        ...values,
                        mauSac: {
                          id: d.id
                        }
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor={d.id}>
                    <div style={{ backgroundColor: d.ten, width: 50, borderRadius: '10px' }}>&nbsp;</div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12">
            <div className="form-inline">
              <label style={{ fontWeight: 'bold' }} className="form-label me-3">
                Kích cỡ:{' '}
              </label>
              {listKC.map((d, i) => (
                <div key={i} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="2"
                    id={d.id}
                    checked={values && values.kichCo && d.id === values.kichCo.id}
                    value={d.id}
                    onChange={() =>
                      setValues({
                        ...values,
                        kichCo: {
                          id: d.id
                        }
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor={d.id}>
                    {d.ten}
                  </label>
                </div>
              ))}
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
                  value={values.soLuong}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      soLuong: e.target.value
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
                  Kinh doanh
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
                  Ngừng kinh doanh
                </label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <Button type="submit" className="btn btn-primary" onClick={onHide}>
              Cập nhật
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateMSKCCTSP;
