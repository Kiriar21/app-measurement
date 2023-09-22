import React, {useState} from 'react'
import {Form, Modal} from 'react-bootstrap'
import ButtonForm from '../../Buttons/ButtonForm/ButtonForm'
import ButtonModal from '../../Buttons/ButtonModal/ButtonModal'
import AlertSuccess from '../../Alerts/Alert/Alert'
import style from './ModalBasic.module.css'

export default function ModalBasic(props){

    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const handleClose = () => {
        setShowModal(false)
    }

    const handleShow = () => setShowModal(true)

    const check = async (e) => {
        e.preventDefault()
        try{    
            setShowModal(false)
            setShowAlert(true)
        }catch(e){

        }
    }

    return(
        <React.Fragment>
            <ButtonModal bgColor={props.bgColor !== undefined && props.bgColor === 'red' ? 'red' : ''} buttonTitle={props.btnModalTitle} onClick={handleShow} />
            <Modal className={`${style.modal}`} 
                    show={showModal} onHide={handleClose}
                    backdrop="static" keyboard={false} 
                    aria-labelledby="contained-modal-title-vcenter" 
                    centered animation={false}>
                
                    <Form action={props.formAction} onSubmit={check}>
                        <Modal.Header className={`${style.modalContent} d-flex justify-content-center`}>
                            <Modal.Title>{props.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={`${style.modalContent} text-center`}>
                            {props.modalBody}
                        </Modal.Body>
                        <Modal.Footer className={`${style.modalContent}`}>
                            <ButtonForm buttonTitle={props.modalBtnGreen} className='w-100'/>
                            <ButtonModal buttonTitle={props.modalBtnRed} bgColor='red' className='w-100' onClick={handleClose} />
                        </Modal.Footer>
                    </Form>
            
            </Modal>
            {showAlert && <AlertSuccess onClick={ e => setShowAlert(false)}  variant='success' alertContent={props.alertSuccessContent}/>}
        </React.Fragment>
    )
}