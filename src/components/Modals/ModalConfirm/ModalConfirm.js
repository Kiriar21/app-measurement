import React from 'react'
import {Form, Modal} from 'react-bootstrap'
import ButtonForm from '../../Buttons/ButtonForm/ButtonForm'
import ButtonModal from '../../Buttons/ButtonModal/ButtonModal'
import style from '../ModalBasic/ModalBasic.module.css'
export default function ModalBasic(props){
    const check = async (e) => {
        e.preventDefault()
        window.location.reload();    
    }

    return(
        <React.Fragment>
            <ButtonModal bgColor={props.bgColor !== undefined && props.bgColor === 'red' ? 'red' : ''} className={props.className} buttonTitle={props.btnModalTitle} />
            <Modal className={`${style.modal}`} 
                    backdrop="static" keyboard={false} 
                    aria-labelledby="contained-modal-title-vcenter" 
                    centered animation={false}>
                    <Form>
                        <Modal.Header className={`${style.modalContent} d-flex justify-content-center`}>
                            <Modal.Title>{props.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={`${style.modalContent} text-center`}>
                            {props.modalBody}
                        </Modal.Body>
                        <Modal.Footer className={`${style.modalContent}`}>
                            <ButtonForm buttonTitle={props.modalBtnGreen} className='w-100' onClick={check}/>
                        </Modal.Footer>
                    </Form>    
            </Modal>
        </React.Fragment>
    )
}