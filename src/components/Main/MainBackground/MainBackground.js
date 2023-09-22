import React from 'react'
import { Container } from 'react-bootstrap'
import style from './MainBackground.module.css'
import useWebTitle from '../../../hooks/useWebsiteTitle'

export default function MainBackground(props, {children}){
    useWebTitle(props.titlePage)
    return(
        <React.Fragment>
            <h2 className='text-uppercase text-center mb-4'>
                {props.titlePage}
            </h2>
            <Container fluid className={`${props.widthSize === 'mid' ? style.midModule : style.bigModule} ${style.bg} text-center py-5`}>
                    {props.children}{props.children.titlePage}
            </Container>
        </React.Fragment>
    )
}