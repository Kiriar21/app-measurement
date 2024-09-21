import {Col, Row, Form} from 'react-bootstrap'
import style from './FormInput.module.css'

export default function FormInput(props){
    return(
        <Form.Group as={Row} controlId={props.controlId} className='d-flex justify-content-center my-3'>
            <Col lg={props.lg ? props.lg : 6}>
                <Form.Label className='d-flex justify-content-start'>
                    {props.labelText}
                </Form.Label>
                {props.typeInput === 'file' 
                    ? <Form.Control type={props.typeInput} 
                                onChange={props.onChange} 
                                className={`${style.bg} my-3 ${props.className}`}
                                multiple={false}
                                name={props.name ? props.name : ''}
                                disabled={props.disabled}
                                accept={props.acceptFile || '.001'}
                                />
                    : <Form.Control type={props.typeInput} 
                                onChange={props.onChange} 
                                className={`${style.bg} my-3`}
                                placeholder={props.placeholder}
                                autoComplete='false'
                                disabled={props.disabled}
                                value={ props.value ?? ''}
                                min={ props.min ?? '' }
                                pattern = {props.pattern ? props.pattern : ''}
                                />
                }
            </Col>
        </Form.Group>
    )
}
