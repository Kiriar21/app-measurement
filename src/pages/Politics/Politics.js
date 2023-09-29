import {useState} from 'react'
import {Tab, Nav, Col, Row} from 'react-bootstrap'
import MainBackground from "../../components/Main/MainBackground/MainBackground"
import Texts from '../../components/Footers/Politics/Texts'
import style from '../../components/Navigations/NavLinks/NavLink.module.css'

export default function Politics(props){
    const [active, setActive] = useState('politics')
    return(
        <MainBackground titlePage="Polityka Prywatności i Informacje Prawne">
            <Tab.Container id="left-tabs-example" defaultActiveKey="politics" >
                <Row >
                    <Col lg={3} >
                        <Nav variant="pills" className={`flex-column mb-4`}>
                            <Nav.Item >
                                <Nav.Link eventKey="politics"
                                    onClick={ e => setActive('politics')}
                                    className={ active === 'politics' ? `${style.infoLink} ${style.activeLink} shadow-none border-0` : `${style.linkM}`} style={{transition:'none'}}>Polityka Prywatności</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="information" onClick={ e => setActive('information')}
                                    className={ active === 'information' ? `${style.infoLink} ${style.activeLink} shadow-none border-0` : `${style.linkM}`} style={{transition:'none'}}>Informacje Prawne</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="politicsCompany" onClick={ e => setActive('politicsCompany')}
                                    className={ active === 'politicsCompany' ? `${style.infoLink} ${style.activeLink} shadow-none border-0` : `${style.linkM}` } style={{transition:'none'}}>Polityka Firmy</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col lg={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="politics">
                                <Texts title='Polityka Prywatności'>
                                    Tekst
                                </Texts>
                            </Tab.Pane>
                            <Tab.Pane eventKey="information">
                                <Texts title='Informacje Prawne'>
                                    Tekst
                                </Texts>
                            </Tab.Pane>
                            <Tab.Pane eventKey="politicsCompany">
                                <Texts title='Polityka Firmy'>
                                    Tekst
                                </Texts>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </MainBackground>
    )
}