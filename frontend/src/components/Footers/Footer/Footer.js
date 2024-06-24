import {Container, Row } from 'react-bootstrap'
import style from './Footer.module.css'
import Information from '../Content/Information'
import Social from '../Content/Social'
import Contact from '../Content/Contact'
import Copyright from '../Content/Copyright'
import Politics from '../Content/Politics'

export default function Footer(props){
    return (
            <Container fluid className={`${style.bg} mt-5`}>
                <Row className='pt-4'>
                    <Information />
                    <Social />
                    <Contact />
                </Row>
                <Row>
                    <Politics />
                </Row>
                <Row>
                    <Copyright />
                </Row>
            </Container>
    )
}