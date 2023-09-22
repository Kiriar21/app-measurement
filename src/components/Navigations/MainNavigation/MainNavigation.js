import NavbarMain from "../Navbars/NavbarMain"
import NavLinkModule from '../NavLinks/NavLink'
import NavDropDownModule from "../NavDropDownModule/NavDropDownModule"
import ButtonLogin from "../../Buttons/ButtonLogin/ButtonLogin"

export default function MainNavigation(props) {
    return (
        <NavbarMain title="Menu Główne" bgColor="var(--Nav-color)">
                <NavLinkModule eventKey='1' path='' nameLink='Strona Główna' />
                <NavLinkModule eventKey='2' path='new-measurement' nameLink='Nowy Pomiar' />
                <NavDropDownModule title='Aktualny Pomiar'>
                    <NavLinkModule eventKey='3' path=':id/statistic' nameLink='Statystyki' />
                    <NavLinkModule eventKey='4' path=':id/edit' nameLink='Edycja' />
                    <NavLinkModule eventKey='5' path=':id/list-competitors' nameLink='Zawodnicy' />
                    <NavLinkModule eventKey='6' path=':id/settings-event' nameLink='Ustawienia Zawodów' />
                    <NavLinkModule eventKey='7' path=':id/settings-score' nameLink='Ustawienia Wyników' />
                    <NavLinkModule eventKey='8' path=':id/scores' nameLink='Wyniki' />
                    <NavLinkModule eventKey='9' path=':id/export-scores' nameLink='Export Wyników' />        
                </NavDropDownModule>
                <ButtonLogin eventKey='10' isDisabled={true} buttonTitle="Offline" />
        </NavbarMain>
    )
}
