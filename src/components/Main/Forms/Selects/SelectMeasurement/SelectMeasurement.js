import {Col, Row, Form} from 'react-bootstrap'
import Option from './Option'
import style from '../../FormInput/FormInput.module.css'

export default function FormInput(props){
    return(
        <Form.Group as={Row} controlId={props.controlId} className='d-flex justify-content-center my-3'>
            <Col lg={props.lg ? props.lg : 6}>
                <Form.Label className={`d-flex ${props.jcc ? 'justify-content-center' : 'justify-content-start'} `}>
                    {props.labelText}
                </Form.Label>
                <Form.Select
                            onChange={props.onChange} 
                            className={`${style.bg} my-3`}
                            >
                        {props.opt.map( (element) => {
                            return (
                                <Option key={element.name} 
                                        value={element.name} 
                                        title={element.title} />
                            )
                        })}
                </Form.Select>
            </Col>
        </Form.Group>
    )
}
