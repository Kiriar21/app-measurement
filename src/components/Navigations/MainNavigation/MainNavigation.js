import NavbarMain from "../Navbars/NavbarMain"
import NavLinkModule from '../NavLinks/NavLink'
import ButtonLogin from "../../Buttons/ButtonLogin/ButtonLogin"

export default function MainNavigation(props) {
    return (
        <NavbarMain title="Menu Główne" bgColor="var(--Nav-color)">
                    <NavLinkModule eventKey='1' path=':id/statistic' nameLink='Statystyki' />
                    <NavLinkModule eventKey='2' path=':id/edit' nameLink='Edycja' />
                    <NavLinkModule eventKey='3' path=':id/list-competitors' nameLink='Zawodnicy' />
                    <NavLinkModule eventKey='4' path=':id/settings-event' nameLink='Ustawienia Zawodów' />
                    <NavLinkModule eventKey='5' path=':id/scores' nameLink='Wyniki' />
                    <NavLinkModule eventKey='6' path=':id/export-scores' nameLink='Export Wyników' />        
                <ButtonLogin eventKey='7' isDisabled={true} buttonTitle="Offline" />
        </NavbarMain>
    )
}
