import MainBackground from "../../components/Main/MainBackground/MainBackground"
import FormLogin from '../../components/Main/Forms/FormLogin/FormLogin'
import H3Module from "../../components/Main/Texts/H3Module/H3Module"
export default function Login(props){
    return(
        <MainBackground titlePage="Logowanie" widthSize='mid'>
            <H3Module title='Zaloguj się' />
            <FormLogin />
        </MainBackground>
    )
}