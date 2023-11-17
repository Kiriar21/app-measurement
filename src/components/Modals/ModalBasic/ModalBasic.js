import React, {useState} from 'react'
import {Form, Modal} from 'react-bootstrap'
import ButtonForm from '../../Buttons/ButtonForm/ButtonForm'
import ButtonModal from '../../Buttons/ButtonModal/ButtonModal'
import AlertSuccess from '../../Alerts/Alert/Alert'
import BigAlert from '../../Alerts/BigAlert'
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
            <ButtonModal bgColor={props.bgColor !== undefined && props.bgColor === 'red' ? 'red' : ''} className={props.className} buttonTitle={props.btnModalTitle} onClick={handleShow} />
            <Modal className={`${style.modal}`} 
                    show={showModal} onHide={handleClose}
                    backdrop="static" keyboard={false} 
                    aria-labelledby="contained-modal-title-vcenter" 
                    centered animation={false}>
                    <Form action={props.formAction}>
                        <Modal.Header className={`${style.modalContent} d-flex justify-content-center`}>
                            <Modal.Title>{props.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={`${style.modalContent} text-center`}>
                            {props.modalBody}
                        </Modal.Body>
                        <Modal.Footer className={`${style.modalContent}`}>
                            <ButtonForm buttonTitle={props.modalBtnGreen} className='w-100' onClick={check}/>
                            {props.secondButton && <ButtonForm buttonTitle={props.secondButtonTitle} className='w-100' onClick={check}/> } 
                            <ButtonModal buttonTitle={props.modalBtnRed} bgColor='red' className='w-100' onClick={handleClose} />
                        </Modal.Footer>
                    </Form>
            
            </Modal>
            {
                props.alertDisplay !== "false" ? (
                    showAlert && <AlertSuccess onClick={ e => setShowAlert(false)}  variant='success' alertContent={props.alertSuccessContent}/>
                ) : (
                    showAlert && <BigAlert alertContent={props.displayBigAlert}/>
                )
            }
            
        </React.Fragment>
    )
}