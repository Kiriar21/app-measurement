import React, {useState} from 'react'
import {Form, Modal} from 'react-bootstrap'
import ButtonForm from '../../Buttons/ButtonForm/ButtonForm'
import ButtonModal from '../../Buttons/ButtonModal/ButtonModal'
import style from './ModalBasic.module.css'

export default function ModalBasic(props){

    const [showModal, setShowModal] = useState(false)

    const handleClose = () => {
        setShowModal(false)
        if(props.onClose){
            props.onClose()
        }
    }

    const handleShow = () => setShowModal(true)

    const check = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:5001/api/event/${props.eventId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                setShowModal(false);
                await props.fetchEvents();
                console.log("WYWOLALEM SIE.")
            } else {
                console.error('Błąd podczas usuwania eventu');
                console.log(response)
            }
        } catch (e) {
            console.error("Error:", e);
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
                            {props.ownFunctions ? (
                                <>
                                <ButtonForm buttonTitle={props.modalBtnGreen} className='w-100' onClick={props.onClick}/>
                                {props.secondButton && <ButtonForm buttonTitle={props.secondButtonTitle} className='w-100' onClick={props.onClick2}/> } 
                                <ButtonModal buttonTitle={props.modalBtnRed} bgColor='red' className='w-100' onClick={handleClose} />
                                </>
                            ) : (
                                <>
                                <ButtonForm buttonTitle={props.modalBtnGreen} className='w-100' onClick={check}/>
                                <ButtonModal buttonTitle={props.modalBtnRed} bgColor='red' className='w-100' onClick={handleClose} />
                                </>
                            )}
                        </Modal.Footer>
                    </Form>
            </Modal>
        </React.Fragment>
    )
}