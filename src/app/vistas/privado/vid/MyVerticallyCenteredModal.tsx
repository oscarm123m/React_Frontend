import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ServicioPrivado from '../../../servicios/ServicioPrivado';
import miApiBack from '../../../utilidades/dominios/miApiBack';
import { ARREGLO_HAMBURGUESA } from './hamburguesa-mock';

export const MyVerticallyCenteredModal=(props:any)=> {
    const miMotico=ARREGLO_HAMBURGUESA.find((moti)=>{
        return moti._id===String(props.obj._id);
    });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {miMotico?.tipo}-{miMotico?.nombre}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-center'>
          <img src={miMotico?.base64ImagenCamisa} alt="error" className='imagenModal imagen' />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

