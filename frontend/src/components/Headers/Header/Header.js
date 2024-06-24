import styles from './Header.module.css'
import { Container, Row } from 'react-bootstrap'
import ThemeHundler from '../ThemeHandler/ThemeHandler'
import Logo from '../Logo/Logo'

export default function Header(props) { 
    return (
            <Container fluid className={`${styles.bg}`}>
                <Row>
                    <Logo />
                    <ThemeHundler />
                </Row>
            </Container>
    );
}
