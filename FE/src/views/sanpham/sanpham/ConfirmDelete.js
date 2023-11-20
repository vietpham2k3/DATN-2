/* eslint-disable react/prop-types */
import { Button, Modal } from 'react-bootstrap';
import { deleteMSKC } from 'services/SanPhamService';
import { toast } from 'react-toastify';

const ConfirmDelete = (props) => {
  const { handleClose, show, getAll, id, dataDelete } = props;

  const handleConfirm = async () => {
    let res = await deleteMSKC(dataDelete);
    try {
      if (res) {
        toast.success('Delete success!');
        handleClose();
        getAll(id);
      }
    } catch (error) {
      toast.error('Error!');
    }
  };

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
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">Bạn có chắc muốn ngừng kinh doanh thuộc tính này không?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={() => handleConfirm()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmDelete;
