import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Form, Modal } from 'react-bootstrap';
import ButtonForm from '../../Buttons/ButtonForm/ButtonForm';
import ButtonModal from '../../Buttons/ButtonModal/ButtonModal';
import style from './ModalBasic.module.css';

const ModalBasic = forwardRef((props, ref) => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        if (props.onClose) {
            props.onClose();
        }
    };
    

    const handleShow = () => {
        setShowModal(true);
        if (props.onShow) {
            props.onShow();
        }
    }

    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow,
        showModal
    }));

    return (
        <React.Fragment>
            <ButtonModal
                bgColor={props.bgColor !== undefined && props.bgColor === 'red' ? 'red' : ''}
                className={props.className}
                buttonTitle={props.btnModalTitle}
                onClick={handleShow}
            />
            <Modal
                size={props.size ? props.size : 'lg'}
                className={`${style.modal}`}
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
            >
                <Form action={props.formAction}>
                    <Modal.Header className={`${style.modalContent} d-flex justify-content-center`}>
                        <Modal.Title>{props.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={`${style.modalContent} text-center`}>
                        {props.modalBody}
                    </Modal.Body>
                    <Modal.Footer className={`${style.modalContent}`}>
                        
                    <ButtonForm buttonTitle={props.modalBtnGreen} className='w-100' onClick={props.onClick} />
                    {props.secondButton && <ButtonForm buttonTitle={props.secondButtonTitle} className='w-100' onClick={props.onClick2} />}
                    <ButtonModal buttonTitle={props.modalBtnRed} bgColor='red' className='w-100' onClick={handleClose} />
            
                    </Modal.Footer>
                </Form>
            </Modal>
        </React.Fragment>
    );
});

export default ModalBasic;
