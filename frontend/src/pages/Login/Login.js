import MainBackground from "../../components/Main/MainBackground/MainBackground"
import FormLogin from '../../components/Main/Forms/FormLogin/FormLogin'
import H3Module from "../../components/Main/Texts/H3Module/H3Module"
import { useAuthState } from "../../context/index"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Login(props){
    const userDetails = useAuthState()
    const navigate = useNavigate()
    useEffect(() =>{
        if(userDetails.user){
            navigate(-1)
        }
    }, [navigate, userDetails.user])
    
    return(
        <MainBackground titlePage="Logowanie" widthSize='mid'>
            <H3Module title='Zaloguj się' />
            <FormLogin />
        </MainBackground>
    )
}