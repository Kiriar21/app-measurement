import MainBackground from "../../components/Main/MainBackground/MainBackground"
import ButtonLink from '../../components/Buttons/ButtonLink/ButtonLink'

export default function NotFound(props){
    return(
        <MainBackground titlePage="Nie odnaleziono strony">
            <p>Niestety, nie udało się odnaleźć żadnego wyniku pod tym adresem wyszukiwania.</p>
            <ButtonLink pathLink="/" buttonTitle="Strona Główna" className="mt-2"/> 
        </MainBackground>
    )
}