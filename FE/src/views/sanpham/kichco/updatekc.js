import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { putUpdateKC, detailKC } from 'service/KichCoService';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const UpdateKC = () => {
    const navigate = useNavigate();
  const [values, setValues] = useState({
    ma: '',
    ten: '',
    trangThai: 0
  });

  const { id } = useParams();

  useEffect(() => {
    detail(id);
  }, [id]);

  const detail = async (id) => {
    const res = await detailKC(id);
    if (res) {
      setValues(res.data);
    }
  };

  const put = async (id, value) => {
    const res = await putUpdateKC(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      navigate('/quan-ly-san-pham/kich-co');
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
            <strong>Cập nhật kích cỡ</strong>
          </CCardHeader>
          <CCardBody>
          <div >
          <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <span className="form-label" style={{fontWeight: 'bold'}}>Tên</span>
                <input
                  type="text"
                  className="form-control"
                  value={values.ten}
                  onChange={(e) => setValues({ ...values, ten: e.target.value })}
                />
              </div>
              <div className="col-6">
                <span style={{ fontWeight: 'bold' }} className="form-label">
                  Trạng thái:{' '}
                </span>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="0"
                    checked={values.trangThai === 0}
                    onChange={() => setValues({ ...values, trangThai: 0 })}
                  />
                  <span className="form-check-label">Kích hoạt</span>
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
                  <span className="form-check-label">Ngừng kích hoạt</span>
                </div>
              </div>
              <div className="col-12">
                <Button type="submit" className="btn btn-bg-info">
                  Update
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

export default UpdateKC
