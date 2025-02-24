import NavbarMain from "../Navbars/NavbarMain"
import NavLinkModule from '../NavLinks/NavLink'
import ButtonLogin from "../../Buttons/ButtonLogin/ButtonLogin"
import { useParams } from "react-router-dom"
import {Offline, Online} from 'react-detect-offline'
// import ButtonForm from "../../Buttons/ButtonForm/ButtonForm"
// import { useAuthDispatch, logout, useAuthState } from "../../../context/index"

export default function MainNavigation(props) {
    const {id} = useParams();
    // const dispatch = useAuthDispatch()
    // const userDetails = useAuthState()
    // const handleLogout = () => {
    //     logout(dispatch);
    // }
    return (
        <NavbarMain title="Menu Główne" bgColor="var(--Nav-color)">
            <NavLinkModule eventKey='1' path={`${id}/statistic`} nameLink='Statystyki' />
            <NavLinkModule eventKey='2' path={`${id}/edit`} nameLink='Edycja' />
            <NavLinkModule eventKey='3' path={`${id}/list-competitors`} nameLink='Zawodnicy' />
            <NavLinkModule eventKey='4' path={`${id}/settings-event`} nameLink='Ustawienia Zawodów' />
            <NavLinkModule eventKey='5' path={`${id}/scores`} nameLink='Wyniki' />
            <NavLinkModule eventKey='6' path={`${id}/export-scores`} nameLink='Export Wyników' />        
            <Offline>
                <ButtonLogin 
                    isDisabled={true}
                    btnColor='red'
                    title='Offline'
                />
            </Offline>
            <Online>                    
                <ButtonLogin 
                    isDisabled={true}
                    btnColor='green'
                    title='Online'
                />                   
            </Online>
            {/* <Offline>
                <ButtonLogin 
                    eventKey='7' 
                    isDisabled={true} 
                />
            </Offline>
            <Online>                    
                <ButtonLogin 
                    eventKey='8' 
                    isDisabled={false} 
                    user={userDetails.user} 
                    onClick={handleLogout}
                />                   
            </Online> */}
        </NavbarMain>
    )
}
