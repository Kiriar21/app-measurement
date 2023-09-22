import {Col, Row, Form} from 'react-bootstrap'
import style from './FormInput.module.css'

export default function FormInput(props){
    return(
        <Form.Group as={Row} controlId={props.controlId} className='d-flex justify-content-center my-3'>
            <Col md={6}>
                <Form.Label className='d-flex justify-content-start'>
                    {props.labelText}
                </Form.Label>
                <Form.Control type={props.typeInput} 
                            onChange={props.onChange} 
                            className={`${style.bg} my-3`}
                            placeholder={props.placeholder}
                            autoComplete='false'
                            defaultValue={ props.defaultValue ?? ''}
                            min={ props.min ?? '' }
                            />
            </Col>
        </Form.Group>
    )
}
