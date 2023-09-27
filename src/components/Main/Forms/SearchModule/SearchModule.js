import {Row, Form ,Col} from 'react-bootstrap'
import style from '../FormInput/FormInput.module.css'
import Button from '../../../Buttons/ButtonForm/ButtonForm'
import React from 'react'

export default function SearchModule(props) {
    return(
        <React.Fragment>
            <Form.Label htmlFor={props.controlId} className='d-flex justify-content-start'>
                {props.labelText}
            </Form.Label>
            <Row className='mb-3'>
                <Col md={4}>
                    <Form.Control type='search' 
                                onChange={props.onChange} 
                                className={`${style.bg} ${style.width} my-3`}
                                placeholder='Wyszukaj...'
                                autoComplete='false'
                                id={props.controlId}
                                />
                </Col>
                <Col md={2}>
                    <Button onClick={props.onClick} className={`${style.width} my-3`} buttonTitle='Wyszukaj' />
                </Col>
                <Col md={2}>
                    <Form.Control type='reset'
                                className={`${style.width} ${style.bg} ${style.bgRed} my-3`}
                                onClick={props.onClick}
                                value='Wyczyść'/>
                </Col>
            </Row>
        </React.Fragment>
    )
}