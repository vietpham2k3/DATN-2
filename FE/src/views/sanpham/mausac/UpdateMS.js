import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputColor from 'react-input-color';
import { putMS, detailMS } from 'service/ServiceMauSac';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const UpdateMauSac = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
      ma: '',
      ten: '',
      trangThai: 0
    });
  
    const [color, setColor] = useState({ r: 94, g: 114, b: 228, a: 1 }); // Giá trị màu mặc định
  
    const handleColorChange = (newColor) => {
      setColor(newColor); // Cập nhật giá trị màu từ bảng màu
      setValues({ ...values, ten: newColor.hex });
    };
  
    const { id } = useParams();
  
    useEffect(() => {
      detail(id);
    }, [id]);
  
    const detail = async (id) => {
      const res = await detailMS(id);
      if (res) {
        setValues(res.data);
      }
    };
  
    const put = async (id, value) => {
      const res = await putMS(id, value);
      if (res) {
        toast.success('Cập nhật thành công !');
        navigate('/quan-ly-san-pham/mau-sac');
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      put(id, values);
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cập nhật màu sắc</strong>
          </CCardHeader>
          <CCardBody>
          <div >
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <span className="form-label">Tên màu</span>
                <input
                  type="text"
                  className="form-control"
                  value={values.ma}
                  onChange={(e) => setValues({ ...values, ma: e.target.value })}
                />
              </div>
             

              <div className="col-6">
  <span className="form-label me-3" style={{ fontWeight: 'bold' }}>
    Trạng thái:
  </span>{' '}
  <div className="d-flex align-items-center">
    <div className="form-check form-check-inline me-3">
      <input
        className="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadio1"
        value="0"
        checked={values.trangThai === 0}
        onChange={() => setValues({ ...values, trangThai: 0 })}
      />
      <label className="form-check-label" htmlFor="inlineRadio1">Kích hoạt</label>
    </div>
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadio2"
        value="1"
        checked={values.trangThai === 1}
        onChange={() => setValues({ ...values, trangThai: 1 })}
      />
      <label className="form-check-label" htmlFor="inlineRadio2">Ngừng kích hoạt</label>
    </div>
  </div>
</div>


              <div className="col-md-6">
                <span className="form-label" style={{ fontWeight: 'bold' }}>
                  Mã Màu:{' '}
                </span>
                <br></br>
                <InputColor initialValue={values.ten} onChange={handleColorChange} placement="right" />
                <div
                  style={{
                    width: 300,
                    height: 300,
                    marginTop: 20,
                    backgroundColor: color.rgba
                  }}
                />
              </div>
              <div className="col-12">
                <Button type="submit" className="btn btn-primary">
                  Cập nhật
                </Button>
              </div>
            </form>
          </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UpdateMauSac
